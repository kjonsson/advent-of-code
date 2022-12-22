import * as fs from "fs";

const parseRowsToFilePathSizes = (
  rows: string[]
): { [key: string]: number } => {
  let previousCommand = null;
  let currentDirectory = [""];
  let filePathsToSize = {};

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const isCommand = row[0] === "$";

    if (isCommand) {
      const [_, command, value] = row.split(" ");

      if (command === "cd" && value === "..") {
        currentDirectory.pop();
      } else if (command === "cd") {
        currentDirectory.push(value);
      }

      previousCommand = command;
    }

    if (!isCommand) {
      if (row.slice(0, 3) === "dir") {
        continue;
      }

      let [sizeStr, fileName] = row.split(" ");
      let size = parseInt(sizeStr);

      let directoryPath = "";

      currentDirectory.forEach((directory) => {
        directoryPath += directory + "/";
        filePathsToSize[directoryPath] = filePathsToSize[directoryPath]
          ? filePathsToSize[directoryPath] + size
          : size;
      });
    }
  }

  return filePathsToSize;
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const filePathToSizes = parseRowsToFilePathSizes(rows);

  console.log(
    "answer is",
    Object.values(filePathToSizes)
      .filter((val) => val <= 100000)
      .reduce((prev, curr) => prev + curr, 0)
  );
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  const filePathToSizes = parseRowsToFilePathSizes(rows);

  const sizesSorted = Object.values(filePathToSizes).sort((a, b) => b - a);

  const fileSystemSize = 70000000;
  const spaceNeeded = 30000000;
  const spaceUsed = sizesSorted[0];

  const fileSizeToDelete = spaceNeeded - (fileSystemSize - spaceUsed);

  console.log(
    "answer is",
    Object.values(filePathToSizes)
      .filter((val) => val >= fileSizeToDelete)
      .sort((a, b) => a - b)[0]
  );
};

firstPart();
secondPart();
