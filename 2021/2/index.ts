import * as fs from "fs";

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.trim().split("\n");

  let horizontal = 0;
  let depth = 0;

  rows.forEach((row) => {
    let [direction, quantityString] = row.split(" ");
    let quantity = parseInt(quantityString);

    if (direction === "up") {
      depth -= quantity;
    } else if (direction === "down") {
      depth += quantity;
    } else if (direction === "forward") {
      horizontal += quantity;
    }
  });

  const result = horizontal * depth;

  console.log("answer is", result);
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.trim().split("\n");

  let aim = 0;
  let horizontal = 0;
  let depth = 0;

  rows.forEach((row) => {
    let [direction, quantityString] = row.split(" ");
    let quantity = parseInt(quantityString);

    if (direction === "up") {
      aim -= quantity;
    } else if (direction === "down") {
      aim += quantity;
    } else if (direction === "forward") {
      horizontal += quantity;
      depth += aim * quantity;
    }
  });

  const result = horizontal * depth;

  console.log("answer is", result);
};

firstPart();
secondPart();
