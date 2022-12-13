import * as fs from "fs";

interface LocationToVisit {
  x: number;
  y: number;
  key: string;
  stepsToVisit: number;
  previousValue?: string;
}

const getStartLocations = (allowCharacterA: boolean, rows: string[]) => {
  return rows
    .map((row, rowIdx) => {
      return row
        .split("")
        .map((val, valIdx) => {
          if ((allowCharacterA && val === "a") || val === "S") {
            return {
              x: valIdx,
              y: rowIdx,
            };
          }

          return null;
        })
        .filter((val) => !!val);
    })
    .filter((val) => !!val)
    .flat();
};

const makeKey = (x: number, y: number) => `${x},${y}`;

const makeLocation = (
  x: number,
  y: number,
  steps: number,
  previousValue?: string
): LocationToVisit => {
  return {
    x,
    y,
    key: makeKey(x, y),
    stepsToVisit: steps,
    previousValue,
  };
};

const canMoveTo = (prevValue: string, nextValue: string): boolean => {
  // Initial step
  if (!prevValue || prevValue === "S") {
    return true;
  }

  // Final step
  if (prevValue === "z" && nextValue === "E") {
    return true;
  }

  // Caps not allowed
  if (
    prevValue.toUpperCase() === prevValue ||
    nextValue.toUpperCase() === nextValue
  ) {
    return false;
  }

  // Must be one larger at most
  return nextValue.charCodeAt(0) - prevValue.charCodeAt(0) <= 1;
};

const findShortestPath = (
  rows: string[],
  startX: number,
  startY: number
): number => {
  const startLocation = makeLocation(startX, startY, 0);
  const height = rows.length;
  const width = rows[0].length;

  let stack: LocationToVisit[] = [startLocation];
  let visited = new Set<string>([]);

  let result = -1;

  while (stack.length > 0) {
    const locationToVisit = stack.pop();

    // Out of  bounds
    if (
      locationToVisit.x < 0 ||
      locationToVisit.x >= width ||
      locationToVisit.y < 0 ||
      locationToVisit.y >= height
    ) {
      continue;
    }

    // Already visited
    if (visited.has(locationToVisit.key)) {
      continue;
    }

    const value = rows[locationToVisit.y][locationToVisit.x];

    // Illegal next move
    if (!canMoveTo(locationToVisit.previousValue, value)) {
      continue;
    }
    visited.add(makeKey(locationToVisit.x, locationToVisit.y));

    // Final step
    if (value === "E") {
      result = locationToVisit.stepsToVisit;
      break;
    }

    // Visit left, right, up, down
    const nextPositions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    nextPositions.forEach(([xAdd, yAdd]) => {
      stack.unshift(
        makeLocation(
          locationToVisit.x + xAdd,
          locationToVisit.y + yAdd,
          locationToVisit.stepsToVisit + 1,
          value
        )
      );
    });
  }

  return result;
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const startLocations = getStartLocations(false, rows);

  const result = startLocations.map((location) => {
    return findShortestPath(rows, location.x, location.y);
  });

  console.log(
    "part1 done, shortest path is",
    result.filter((x) => x > 0).sort((a, b) => a - b)[0]
  );
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const startLocations = getStartLocations(true, rows);

  const result = startLocations.map((location) => {
    return findShortestPath(rows, location.x, location.y);
  });

  console.log(
    "part2 done, shortest path is",
    result.filter((x) => x > 0).sort((a, b) => a - b)[0]
  );
};

firstPart();
secondPart();
