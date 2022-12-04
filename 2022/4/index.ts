import * as fs from "fs";

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");

  const rows = fileData.trim().split("\n");

  let result = 0;

  rows.forEach((row) => {
    const [firstRange, secondRange] = row.split(",");

    const [firstStart, firstEnd] = firstRange
      .split("-")
      .map((val) => parseInt(val));

    const [secondStart, secondEnd] = secondRange
      .split("-")
      .map((val) => parseInt(val));

    if (firstStart >= secondStart && firstEnd <= secondEnd) {
      result++;
    } else if (secondStart >= firstStart && secondEnd <= firstEnd) {
      result++;
    }
  });

  console.log("answer is", result);
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");

  const rows = fileData.trim().split("\n");

  let result = 0;

  rows.forEach((row) => {
    const [firstRange, secondRange] = row.split(",");

    const [firstStart, firstEnd] = firstRange
      .split("-")
      .map((val) => parseInt(val));

    const [secondStart, secondEnd] = secondRange
      .split("-")
      .map((val) => parseInt(val));

    if (firstStart >= secondStart && firstStart <= secondEnd) {
      result++;
    } else if (firstEnd >= secondStart && firstEnd <= secondEnd) {
      result++;
    } else if (firstStart <= secondStart && firstEnd >= secondStart) result++;
  });

  console.log("answer is", result);
};

firstPart();
secondPart();
