import * as fs from "fs";

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");

  let result = null;
  let lettersInWindow = {};

  fileData.split("").forEach((valComingIntoWindow, idx) => {
    const valGoingOutOfWindow = fileData[idx - 4];

    if (result) {
      return;
    }

    if (valGoingOutOfWindow) {
      lettersInWindow[valGoingOutOfWindow] =
        lettersInWindow[valGoingOutOfWindow] - 1;

      if (lettersInWindow[valGoingOutOfWindow] === 0) {
        delete lettersInWindow[valGoingOutOfWindow];
      }
    }

    lettersInWindow[valComingIntoWindow] = lettersInWindow[valComingIntoWindow]
      ? lettersInWindow[valComingIntoWindow] + 1
      : 1;

    const hasFourKeys = Object.values(lettersInWindow).length === 4;
    const allAreOnes = Object.values(lettersInWindow).every((val) => val === 1);

    if (hasFourKeys && allAreOnes) {
      result = idx;
    }
  });

  console.log("answer is", result + 1);
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");

  let result = null;
  let lettersInWindow = {};

  const UNIQUE_COUNT = 14;

  fileData.split("").forEach((valComingIntoWindow, idx) => {
    const valGoingOutOfWindow = fileData[idx - UNIQUE_COUNT];

    if (result) {
      return;
    }

    if (valGoingOutOfWindow) {
      lettersInWindow[valGoingOutOfWindow] =
        lettersInWindow[valGoingOutOfWindow] - 1;

      if (lettersInWindow[valGoingOutOfWindow] === 0) {
        delete lettersInWindow[valGoingOutOfWindow];
      }
    }

    lettersInWindow[valComingIntoWindow] = lettersInWindow[valComingIntoWindow]
      ? lettersInWindow[valComingIntoWindow] + 1
      : 1;

    const hasUniqueCountKeys =
      Object.values(lettersInWindow).length === UNIQUE_COUNT;
    const allAreOnes = Object.values(lettersInWindow).every((val) => val === 1);

    if (hasUniqueCountKeys && allAreOnes) {
      result = idx;
    }
  });

  console.log("answer is", result + 1);
};

firstPart();
secondPart();
