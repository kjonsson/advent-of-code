import { dir } from "console";
import * as fs from "fs";

type Direction = "R" | "L" | "U" | "D";

interface Instruction {
  direction: Direction;
  quantity: number;
}

interface Position {
  x: number;
  y: number;
}

const parseInstruction = (row: string): Instruction => {
  const [direction, quantity] = row.split(" ");

  return { direction: direction as Direction, quantity: parseInt(quantity) };
};

const createKey = (x: number, y: number): string => {
  return `${x},${y}`;
};

const followNext = ({
  nextNode,
  currentNode,
}: {
  nextNode: Position;
  currentNode: Position;
}): { nextNode: Position; currentNode: Position } => {
  const newNext = { ...nextNode };
  const newCurrent = { ...currentNode };

  const maxDistanceToNode = Math.max(
    Math.abs(nextNode.x - currentNode.x),
    Math.abs(nextNode.y - currentNode.y)
  );

  // within distance, do nothing
  if (maxDistanceToNode <= 1) {
    return { nextNode: newNext, currentNode: newCurrent };
  }

  // Same line ... just move closer
  if (nextNode.x === currentNode.x) {
    newCurrent.y += nextNode.y > currentNode.y ? 1 : -1;
    return { nextNode: newNext, currentNode: newCurrent };
  }

  // Same line ... just move closer
  if (nextNode.y === currentNode.y) {
    newCurrent.x += nextNode.x > currentNode.x ? 1 : -1;
    return { nextNode: newNext, currentNode: newCurrent };
  }

  // Need to move diagonally towards nextnode
  newCurrent.x += nextNode.x > currentNode.x ? 1 : -1;
  newCurrent.y += nextNode.y > currentNode.y ? 1 : -1;

  return { nextNode: newNext, currentNode: newCurrent };
};

const moveHead = ({
  headPos,
  instruction,
}: {
  headPos: Position;
  instruction: Instruction;
}): { headPos: Position } => {
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

  return { headPos };
};

const calculateVisitedPositions = (numberOfKnots: number, rows: string[]) => {
  let positions: Position[] = new Array(numberOfKnots);
  for (let i = 0; i < numberOfKnots; i++) {
    positions[i] = { x: 0, y: 0 };
  }

  let positionsFound = new Set();

  rows.forEach((row, rowIdx) => {
    const instruction = parseInstruction(row);

    for (let i = 0; i < instruction.quantity; i++) {
      positions[0] = moveHead({
        headPos: positions[0],
        instruction,
      }).headPos;

      for (let i = 1; i < positions.length; i++) {
        const { currentNode, nextNode } = followNext({
          nextNode: positions[i - 1],
          currentNode: positions[i],
        });

        positions[i] = currentNode;
      }

      positionsFound.add(createKey(positions.at(-1).x, positions.at(-1).y));
    }
  });

  console.log(positionsFound.size);
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const NUMBER_OF_KNOTS = 2;
  calculateVisitedPositions(NUMBER_OF_KNOTS, rows);
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const NUMBER_OF_KNOTS = 10;
  calculateVisitedPositions(NUMBER_OF_KNOTS, rows);
};

firstPart();
secondPart();
