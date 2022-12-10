import { dir } from "console";
import * as fs from "fs";

const getWidthHeight = (rows: number[][]): [number, number] => {
  return [rows[0].length, rows.length];
};

const processGrid = (rows: string[]): number[][] => {
  let result = [];

  rows.forEach((row) => {
    result.push(row.split(""));
  });

  return result;
};

const processFromLeft = (grid: number[][]): Set<string> => {
  let result = new Set<string>();
  const [width, height] = getWidthHeight(grid);

  for (let h = 0; h < height; h++) {
    let currentMaxHeight = 0;

    for (let w = 0; w < width; w++) {
      const number = grid[h][w];

      if (w === 0) {
        result.add(`${h},${w}`);
      } else if (number > currentMaxHeight) {
        result.add(`${h},${w}`);
      }

      currentMaxHeight = Math.max(currentMaxHeight, number);
    }
  }

  return result;
};

const processFromRight = (grid: number[][]): Set<string> => {
  let result = new Set<string>();
  const [width, height] = getWidthHeight(grid);

  for (let h = height - 1; h >= 0; h--) {
    let currentMaxHeight = 0;

    for (let w = width - 1; w >= 0; w--) {
      const number = grid[h][w];

      if (w === width - 1) {
        result.add(`${h},${w}`);
      } else if (number > currentMaxHeight) {
        result.add(`${h},${w}`);
      }

      currentMaxHeight = Math.max(currentMaxHeight, number);
    }
  }

  return result;
};

const processFromTop = (grid: number[][]): Set<string> => {
  let result = new Set<string>();
  const [width, height] = getWidthHeight(grid);

  for (let w = 0; w < width; w++) {
    let currentMaxHeight = 0;

    for (let h = 0; h < height; h++) {
      const number = grid[h][w];

      if (h === 0) {
        result.add(`${h},${w}`);
      } else if (number > currentMaxHeight) {
        result.add(`${h},${w}`);
      }

      currentMaxHeight = Math.max(currentMaxHeight, number);
    }
  }

  return result;
};

const processFromBottom = (grid: number[][]): Set<string> => {
  let result = new Set<string>();
  const [width, height] = getWidthHeight(grid);

  for (let w = width - 1; w >= 0; w--) {
    let currentMaxHeight = 0;

    for (let h = height - 1; h >= 0; h--) {
      const number = grid[h][w];

      if (h === height - 1) {
        result.add(`${h},${w}`);
      } else if (number > currentMaxHeight) {
        result.add(`${h},${w}`);
      }

      currentMaxHeight = Math.max(currentMaxHeight, number);
    }
  }

  return result;
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const grid = processGrid(rows);

  const visibleFromLeft = processFromLeft(grid);
  const visibleFromRight = processFromRight(grid);
  const visibleFromTop = processFromTop(grid);
  const visibleFromBottom = processFromBottom(grid);

  const visibleTrees = new Set([
    ...visibleFromLeft,
    ...visibleFromRight,
    ...visibleFromTop,
    ...visibleFromBottom,
  ]);

  console.log("answer is", visibleTrees.size);
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");
};

firstPart();
secondPart();
