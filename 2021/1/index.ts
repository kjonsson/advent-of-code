import * as fs from "fs";

const firstPart = () => {
  const fileData = fs.readFileSync("./input.txt", "utf-8");
  const numbers = fileData
    .trim()
    .split("\n")
    .map((val) => parseInt(val));

  let prevNumber = numbers[0];
  let result = 0;

  numbers.forEach((number) => {
    if (number > prevNumber) {
      result++;
    }

    prevNumber = number;
  });

  console.log("answer is", result);
};

const secondPart = () => {
  const fileData = fs.readFileSync("./input.txt", "utf-8");
  const numbers = fileData
    .trim()
    .split("\n")
    .map((val) => parseInt(val));

  let result = 0;
  let prevSum = numbers[0] + numbers[1] + numbers[2];
  for (let i = 3; i < numbers.length; i++) {
    const curr = prevSum - numbers[i - 3] + numbers[i];

    if (curr > prevSum) {
      result++;
    }

    prevSum = curr;
  }

  console.log("answer is", result);
};

firstPart();
secondPart();
