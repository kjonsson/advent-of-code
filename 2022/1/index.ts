import * as fs from "fs";

const firstPart = () => {
  const fileData = fs.readFileSync("./input.txt", "utf-8");

  const rows = fileData.trim().split("\n");

  let result = 0;
  let currentTotal = 0;

  rows.forEach((row) => {
    const number = parseInt(row);

    if (!number) {
      currentTotal = 0;
      return;
    }

    currentTotal += number;
    result = Math.max(result, currentTotal);
  });

  console.log("answer is", result);
};

const secondPart = () => {
  const fileData = fs.readFileSync("./input.txt", "utf-8");

  const rows = fileData.trim().split("\n");

  let result = 0;
  let elvesTotals: number[] = [];
  let currentTotal = 0;

  rows.forEach((row) => {
    const number = parseInt(row);

    if (!number) {
      if (currentTotal > 0) {
        elvesTotals.push(currentTotal);
      }

      currentTotal = 0;
      return;
    }

    currentTotal += number;
  });

  elvesTotals.sort((a, b) => b - a);

  console.log(
    "answer is",
    elvesTotals.slice(0, 3),
    elvesTotals.slice(0, 3).reduce((prev, curr) => prev + curr, 0)
  );
};

// firstPart();
secondPart();
