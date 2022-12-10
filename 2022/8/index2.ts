import * as fs from "fs";

interface TreeInfo {
  w: number;
  h: number;
  value: number;
}

const getWidthHeight = (grid: number[][]): [number, number] => {
  return [grid[0].length, grid.length];
};

const processGrid = (rows: string[]): number[][] => {
  let result = [];

  rows.forEach((row) => {
    result.push(row.split(""));
  });

  return result;
};

const getKey = (h: number, w: number): string => {
  return `${h},${w}`;
};

const updateTree = (
  distance: number,
  totalPerTree: number[][],
  h: number,
  w: number
): void => {
  if (!totalPerTree[h][w]) {
    totalPerTree[h][w] = distance;
    return;
  }

  totalPerTree[h][w] *= distance;
};

const processFromLeft = (grid: number[][], totalPerTree: number[][]): void => {
  const [width, height] = getWidthHeight(grid);

  for (let h = 0; h < height; h++) {
    const sizeStack: TreeInfo[] = [];

    for (let w = width - 1; w >= 0; w--) {
      const value = grid[h][w];

      while (sizeStack.length > 0) {
        if (value < sizeStack.at(-1).value) {
          break;
        }

        const poppedValue = sizeStack.pop();
        updateTree(
          Math.abs(poppedValue.w - w),
          totalPerTree,
          poppedValue.h,
          poppedValue.w
        );
      }

      sizeStack.push({ h, w, value });
    }

    // Need to empty the stack, calculate distances and add to totalPerTree
    while (sizeStack.length > 0) {
      const poppedValue = sizeStack.pop();
      updateTree(
        Math.abs(poppedValue.w),
        totalPerTree,
        poppedValue.h,
        poppedValue.w
      );
    }
  }
};

const processFromRight = (grid: number[][], totalPerTree: number[][]): void => {
  const [width, height] = getWidthHeight(grid);

  for (let h = 0; h < height; h++) {
    const sizeStack: TreeInfo[] = [];

    for (let w = 0; w < width; w++) {
      const value = grid[h][w];

      while (sizeStack.length > 0) {
        if (value < sizeStack.at(-1).value) {
          break;
        }

        const poppedValue = sizeStack.pop();
        updateTree(
          Math.abs(poppedValue.w - w),
          totalPerTree,
          poppedValue.h,
          poppedValue.w
        );
      }

      sizeStack.push({ h, w, value });
    }

    // Need to empty the stack, calculate distances and add to totalPerTree
    while (sizeStack.length > 0) {
      const poppedValue = sizeStack.pop();
      updateTree(
        Math.abs(width - 1 - poppedValue.w),
        totalPerTree,
        poppedValue.h,
        poppedValue.w
      );
    }
  }
};

const processFromTop = (grid: number[][], totalPerTree: number[][]): void => {
  const [width, height] = getWidthHeight(grid);

  for (let w = 0; w < width; w++) {
    const sizeStack: TreeInfo[] = [];

    for (let h = height - 1; h >= 0; h--) {
      const value = grid[h][w];

      while (sizeStack.length > 0) {
        if (value < sizeStack.at(-1).value) {
          break;
        }

        const poppedValue = sizeStack.pop();
        updateTree(
          Math.abs(poppedValue.h - h),
          totalPerTree,
          poppedValue.h,
          poppedValue.w
        );
      }

      sizeStack.push({ h, w, value });
    }

    // Need to empty the stack, calculate distances and add to totalPerTree
    while (sizeStack.length > 0) {
      const poppedValue = sizeStack.pop();
      updateTree(
        Math.abs(poppedValue.h),
        totalPerTree,
        poppedValue.h,
        poppedValue.w
      );
    }
  }
};

const processFromBottom = (
  grid: number[][],
  totalPerTree: number[][]
): void => {
  const [width, height] = getWidthHeight(grid);

  for (let w = 0; w < width; w++) {
    const sizeStack: TreeInfo[] = [];

    for (let h = 0; h < height; h++) {
      const value = grid[h][w];

      while (sizeStack.length > 0) {
        if (value < sizeStack.at(-1).value) {
          break;
        }

        const poppedValue = sizeStack.pop();
        updateTree(
          Math.abs(poppedValue.h - h),
          totalPerTree,
          poppedValue.h,
          poppedValue.w
        );
      }

      sizeStack.push({ h, w, value });
    }

    // Need to empty the stack, calculate distances and add to totalPerTree
    while (sizeStack.length > 0) {
      const poppedValue = sizeStack.pop();
      updateTree(
        Math.abs(height - 1 - poppedValue.h),
        totalPerTree,
        poppedValue.h,
        poppedValue.w
      );
    }
  }
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const grid = processGrid(rows);
  const [width, height] = getWidthHeight(grid);

  // Create grid of totals per tree
  let totalPerTree = new Array(height);
  for (var i = 0; i < totalPerTree.length; i++) {
    totalPerTree[i] = new Array(width).fill(0);
  }

  processFromLeft(grid, totalPerTree);
  processFromRight(grid, totalPerTree);
  processFromTop(grid, totalPerTree);
  processFromBottom(grid, totalPerTree);

  console.log("answer is", Math.max.apply(null, totalPerTree.flat()));
};

firstPart();
