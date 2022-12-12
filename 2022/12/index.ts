import * as fs from "fs";

interface LocationToVisit {
  x: number;
  y: number;
  key: string;
  stepsToVisit: number;
  previousValue?: string;
}

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
  if (!prevValue || prevValue === "S") {
    return true;
  }

  if (prevValue === "z" && nextValue === "E") {
    return true;
  }

  if (
    prevValue.toUpperCase() === prevValue ||
    nextValue.toUpperCase() === nextValue
  ) {
    return false;
  }

  if (nextValue.charCodeAt(0) - prevValue.charCodeAt(0) <= 1) {
    return true;
  }

  return false;
};

const execute = (rows: string[], startX: number, startY: number) => {
  const startLocation = makeLocation(startX, startY, 0);
  const height = rows.length;
  const width = rows[0].length;

  let stack: LocationToVisit[] = [startLocation];
  let visited = new Set<string>([]);

  let result = -1;

  while (stack.length > 0) {
    const locationToVisit = stack.pop();

    // Out of  bounds
    if (locationToVisit.x < 0 || locationToVisit.x >= width) {
      continue;
    }

    // Out of bounds
    if (locationToVisit.y < 0 || locationToVisit.y >= height) {
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

    if (value === "E") {
      result = locationToVisit.stepsToVisit;
      break;
    }

    stack.unshift(
      makeLocation(
        locationToVisit.x - 1,
        locationToVisit.y,
        locationToVisit.stepsToVisit + 1,
        value
      )
    );
    stack.unshift(
      makeLocation(
        locationToVisit.x + 1,
        locationToVisit.y,
        locationToVisit.stepsToVisit + 1,
        value
      )
    );
    stack.unshift(
      makeLocation(
        locationToVisit.x,
        locationToVisit.y - 1,
        locationToVisit.stepsToVisit + 1,
        value
      )
    );
    stack.unshift(
      makeLocation(
        locationToVisit.x,
        locationToVisit.y + 1,
        locationToVisit.stepsToVisit + 1,
        value
      )
    );
  }

  return result;
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const startLocations = rows
    .map((row, rowIdx) => {
      if (row.includes("S")) {
        return {
          x: row.indexOf("S"),
          y: rowIdx,
        };
      }

      return null;
    })
    .filter((val) => !!val);

  const result = startLocations.map((location) => {
    return execute(rows, location.x, location.y);
  });
  console.log(
    "part1 done",
    result.filter((x) => x > 0).sort((a, b) => a - b)[0]
  );
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const startLocations = rows
    .map((row, rowIdx) => {
      return row
        .split("")
        .map((val, valIdx) => {
          if (val === "a" || val === "S") {
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

  const result = startLocations.map((location) => {
    return execute(rows, location.x, location.y);
  });
  console.log(
    "part2 done",
    result.filter((x) => x > 0).sort((a, b) => a - b)[0]
  );
};

firstPart();
secondPart();
