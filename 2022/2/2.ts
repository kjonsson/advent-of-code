import * as fs from "fs";

enum Shape {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

const letterToShape = {
  A: Shape.ROCK,
  B: Shape.PAPER,
  C: Shape.SCISSORS,
  X: Shape.ROCK,
  Y: Shape.PAPER,
  Z: Shape.SCISSORS,
};

const shapeDefeatedBy = {
  [Shape.ROCK]: Shape.SCISSORS,
  [Shape.PAPER]: Shape.ROCK,
  [Shape.SCISSORS]: Shape.PAPER,
};

const shapeDefeats = {
  [Shape.ROCK]: Shape.PAPER,
  [Shape.PAPER]: Shape.SCISSORS,
  [Shape.SCISSORS]: Shape.ROCK,
};

const calculateScore = (you: Shape, opponent: Shape): number => {
  let score = 0;

  if (shapeDefeatedBy[you] === opponent) {
    score += 6;
  } else if (shapeDefeats[you] === opponent) {
    score = 0;
  } else {
    score = 3;
  }

  if (you === Shape.ROCK) {
    score += 1;
  } else if (you === Shape.PAPER) {
    score += 2;
  } else {
    score += 3;
  }

  return score;
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");

  const rows = fileData.trim().split("\n");

  let result = 0;
  rows.forEach((row) => {
    const [opponent, you] = row.split(" ");
    const youShape = letterToShape[you];
    const opponentShape = letterToShape[opponent];

    result += calculateScore(youShape, opponentShape);
  });

  console.log("answer is", result);
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");

  const rows = fileData.trim().split("\n");

  let result = 0;
  rows.forEach((row) => {
    const [opponent, resultSymbol] = row.split(" ");
    const opponentShape = letterToShape[opponent];
    let youShape = null;
    if (resultSymbol === "X") {
      // YOU LOSE
      youShape = shapeDefeatedBy[opponentShape];
    } else if (resultSymbol === "Y") {
      // YOU DRAW
      youShape = opponentShape;
    } else {
      // YOU WIN
      youShape = shapeDefeats[opponentShape];
    }

    result += calculateScore(youShape, opponentShape);
  });

  console.log("answer is", result);
};

firstPart();
secondPart();
