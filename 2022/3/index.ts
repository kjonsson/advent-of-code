import * as fs from "fs";

const getPointsForCHar = (char: string): number => {
  char = char[0];

  const isUpperCase = char === char.toUpperCase();

  let result = char.toLowerCase().charCodeAt(0) - 96;

  if (isUpperCase) {
    result += 26;
  }

  return result;
};

const splitString = (s: string): string[] => {
  return [s.slice(0, s.length / 2), s.slice(s.length / 2)];
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");

  const rows = fileData.trim().split("\n");
  let result = 0;

  rows.forEach((row) => {
    const [firstHalf, secondHalf] = splitString(row);

    const lettersInBoth = firstHalf
      .split("")
      .filter((f) => secondHalf.includes(f));

    const letter = lettersInBoth[0];

    result += getPointsForCHar(letter);
  });

  console.log("answer is", result);
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");

  const rows = fileData.trim().split("\n");
  let result = 0;

  let rowIdx = 0;

  while (rowIdx < rows.length) {
    let first = rows[rowIdx];
    let second = rows[rowIdx + 1];
    let third = rows[rowIdx + 2];

    const lettersInBoth = first
      .split("")
      .filter((f) => second.split("").includes(f))
      .filter((f) => third.split("").includes(f));

    const letter = lettersInBoth[0];

    result += getPointsForCHar(letter);
    rowIdx += 3;
  }

  console.log("answer is", result);
};

firstPart();
secondPart();
