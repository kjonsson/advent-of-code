import { dir } from "console";
import * as fs from "fs";

type Direction = "R" | "L" | "U" | "D";

interface Instruction {
  direction: Direction;
  quantity: number;
}

const parseInstruction = (row: string): Instruction => {
  const [direction, quantity] = row.split(" ");

  return { direction: direction as Direction, quantity: parseInt(quantity) };
};

const createKey = (x: number, y: number): string => {
  return `${x},${y}`;
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  let x = 0;
  let y = 0;
  let headPos = { x: 0, y: 0 };
  let tailPos = { x: 0, y: 0 };

  let positionsFound = new Set();

  rows.forEach((row, rowIdx) => {
    const instruction = parseInstruction(row);

    for (let i = 0; i < instruction.quantity; i++) {
      const prevHeadPos = { ...headPos };

      // Move head
      if (instruction.direction === "U") {
        headPos.y += 1;
      } else if (instruction.direction === "D") {
        headPos.y -= 1;
      } else if (instruction.direction === "L") {
        headPos.x -= 1;
      } else if (instruction.direction === "R") {
        headPos.x += 1;
      }

      // Move tail
      if (
        prevHeadPos.y === tailPos.y &&
        (instruction.direction === "U" || instruction.direction === "D")
      ) {
        tailPos = tailPos;
      } else if (
        prevHeadPos.x === tailPos.x &&
        (instruction.direction === "L" || instruction.direction === "R")
      ) {
        tailPos = tailPos;
      } else if (
        Math.abs(headPos.x - tailPos.x) <= 1 &&
        Math.abs(headPos.y - tailPos.y) <= 1
      ) {
        tailPos = tailPos;
      } else {
        tailPos = { ...prevHeadPos };
      }

      positionsFound.add(createKey(tailPos.x, tailPos.y));
    }
  });

  console.log(positionsFound.size);
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");
};

firstPart();
secondPart();
