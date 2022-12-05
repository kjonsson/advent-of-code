import * as fs from "fs";

const extractStacks = (rows: string[]): string[][] => {
  let result: string[][] = [];
  rows.forEach((row) => {
    if (!row.includes("[")) {
      return;
    }

    row.split("").forEach((item, idx) => {
      const letterPosition = idx - 1;
      const remainder = letterPosition % 4;
      const position = letterPosition / 4;

      if (remainder !== 0) {
        return;
      }

      if (!item.match(/[a-zA-Z]/)) {
        return;
      }

      if (!result[position]) {
        result[position] = [];
      }

      result[position].push(item);
    });
  });

  return result;
};

const extractMessage = (
  instruction: string
): { quantity: number; from: number; to: number } => {
  const [quantity, from, to] = instruction
    .split(" ")
    .filter((val) => !isNaN(val as any));

  return {
    quantity: parseInt(quantity),
    from: parseInt(from),
    to: parseInt(to),
  };
};

const moveStacksV1 = (
  instructionLines: string[],
  stacks: string[][]
): string[][] => {
  const instructions = instructionLines.map((instructionLine) =>
    extractMessage(instructionLine)
  );

  instructions.forEach((instruction) => {
    for (let i = 0; i < instruction.quantity; i++) {
      const item = stacks[instruction.from - 1].shift();
      stacks[instruction.to - 1].unshift(item);
    }
  });

  return stacks;
};

const moveStacksV2 = (
  instructionLines: string[],
  stacks: string[][]
): string[][] => {
  const instructions = instructionLines.map((instructionLine) =>
    extractMessage(instructionLine)
  );

  instructions.forEach((instruction) => {
    const items = stacks[instruction.from - 1].splice(0, instruction.quantity);
    stacks[instruction.to - 1].unshift(...items);
  });

  return stacks;
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");

  const rows = fileData.split("\n");
  let result = 0;

  let stacks = extractStacks(rows);

  const instructions = rows.filter((row) => row.includes("move"));

  const updatedStacks = moveStacksV1(instructions, stacks);

  console.log("answer is", updatedStacks.map((arr) => arr[0]).join(""));
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");

  const rows = fileData.split("\n");
  let result = 0;

  let stacks = extractStacks(rows);

  const instructions = rows.filter((row) => row.includes("move"));

  const updatedStacks = moveStacksV2(instructions, stacks);

  console.log("answer is", updatedStacks.map((arr) => arr[0]).join(""));
};

firstPart();
secondPart();
