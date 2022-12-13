import * as fs from "fs";

type IntegerOrArray = IntegerOrArray[] | number;

interface Pair {
  first: IntegerOrArray;
  second: IntegerOrArray;
}

// -1 fail 0 skip 1 pass
const isInOrder = (first: IntegerOrArray, second: IntegerOrArray): number => {
  if (typeof first === "number" && typeof second === "number") {
    return second - first;
  }

  if (!(first instanceof Array)) {
    first = [first];
  }

  if (!(second instanceof Array)) {
    second = [second];
  }

  const minLength = Math.min(first.length, second.length);
  for (let i = 0; i < minLength; i++) {
    const order = isInOrder(first[i], second[i]);

    if (order < 0) {
      return -1;
    } else if (order > 0) {
      return 1;
    }
  }

  return second.length - first.length;
};

const parseInput1 = (rows: string[]): Pair[] => {
  let idx = 0;
  let result = [];

  while (idx < rows.length) {
    result.push({
      first: JSON.parse(rows[idx]),
      second: JSON.parse(rows[idx + 1]),
    });
    idx += 3;
  }

  return result;
};

const parseInput2 = (rows: string[]): IntegerOrArray[] => {
  return rows.map((row) => JSON.parse(row));
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const pairs = parseInput1(rows);

  let sum = 0;
  pairs.forEach((pair, idx) => {
    const result = isInOrder(pair.first, pair.second);

    if (result > 0) {
      sum += idx + 1;
    }
  });

  console.log("answer is", sum);
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  let rows = fileData.split("\n");
  rows = rows.filter((row) => row !== "");
  rows.push("[[2]]");
  rows.push("[[6]]");

  const pairs = parseInput2(rows);
  const sorted = pairs.sort(isInOrder).reverse();

  let result = 1;
  sorted.forEach((val, idx) => {
    if (JSON.stringify(val) === JSON.stringify([[2]])) {
      result *= idx + 1;
    }

    if (JSON.stringify(val) === JSON.stringify([[6]])) {
      result *= idx + 1;
    }
  });

  console.log(result);
};

firstPart();
secondPart();
