import { dir } from "console";
import * as fs from "fs";

interface Monkey {
  items: number[];
  transform: Function;
  throwToIfTrue: number;
  throwToIfFalse: number;
  divisibleBy: number;
}

const parseInput = (rows: string[]): Monkey[] => {
  let idx = 0;
  let result: Monkey[] = [];

  while (idx < rows.length) {
    const items = rows[idx + 1]
      .split(":")[1]
      .trim()
      .split(",")
      .map((x) => parseInt(x));
    const operation = new Function(
      "old",
      "return " + rows[idx + 2].split("=")[1].trim()
    );
    const divisibleBy = parseInt(rows[idx + 3].split(" ").at(-1));
    const throwToIfTrue = parseInt(rows[idx + 4].split(" ").at(-1));
    const throwToIfFalse = parseInt(rows[idx + 5].split(" ").at(-1));

    result.push({
      items,
      transform: operation,
      throwToIfTrue,
      throwToIfFalse,
      divisibleBy,
    });
    idx += 7;
  }

  return result;
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const monkeys = parseInput(rows);
  const NUMBER_OF_ROUNDS = 20;

  const monkeyToNumberOfChecks: { [x: number]: number } = {};

  for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
    monkeys.forEach((monkey, monkeyIdx) => {
      const items = [...monkey.items];
      monkey.items = [];

      items.forEach((item) => {
        monkeyToNumberOfChecks[monkeyIdx] = monkeyToNumberOfChecks[monkeyIdx]
          ? monkeyToNumberOfChecks[monkeyIdx] + 1
          : 1;

        let worryLevel = monkey.transform(item);
        worryLevel = Math.floor(worryLevel / 3);
        const isDivisible = worryLevel % monkey.divisibleBy === 0;

        if (isDivisible) {
          monkeys[monkey.throwToIfTrue].items.push(worryLevel);
        } else {
          monkeys[monkey.throwToIfFalse].items.push(worryLevel);
        }
      });
    });
  }

  console.log(
    "answer is",
    Object.values(monkeyToNumberOfChecks)
      .sort((a, b) => b - a)
      .slice(0, 2)
      .reduce((prev, curr) => prev * curr)
  );
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const monkeys = parseInput(rows);
  const NUMBER_OF_ROUNDS = 10000;

  const monkeyToNumberOfChecks: { [x: number]: number } = {};

  const commonDivisorOfAllMonkeys = monkeys.reduce(
    (prev, curr) => prev * curr.divisibleBy,
    1
  );

  for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
    monkeys.forEach((monkey, monkeyIdx) => {
      const items = [...monkey.items];
      monkey.items = [];

      items.forEach((item) => {
        monkeyToNumberOfChecks[monkeyIdx] = monkeyToNumberOfChecks[monkeyIdx]
          ? monkeyToNumberOfChecks[monkeyIdx] + 1
          : 1;

        let worryLevel = monkey.transform(item);
        const isDivisible = worryLevel % monkey.divisibleBy === 0;

        // The number can overflow if we keep transforming/multiplying them.
        // All we are trying to do is check for divisbility so dividing by
        // common divisor will help.
        worryLevel = worryLevel % commonDivisorOfAllMonkeys;

        if (isDivisible) {
          monkeys[monkey.throwToIfTrue].items.push(worryLevel);
        } else {
          monkeys[monkey.throwToIfFalse].items.push(worryLevel);
        }
      });
    });
  }

  console.log(monkeyToNumberOfChecks);

  console.log(
    "answer is",
    Object.values(monkeyToNumberOfChecks)
      .sort((a, b) => b - a)
      .slice(0, 2)
      .reduce((prev, curr) => prev * curr)
  );
};

firstPart();
secondPart();
