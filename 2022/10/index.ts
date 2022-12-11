import { dir } from "console";
import * as fs from "fs";

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  let cycle = 0;
  let value = 1;
  let result = 0;

  const shouldStoreValue = (cycle: number) => {
    return (cycle - 20) % 40 === 0;
  };

  rows.forEach((row) => {
    const [command, commandValue] = row.split(" ");

    if (command === "noop") {
      cycle += 1;
      if (shouldStoreValue(cycle)) {
        result += cycle * value;
      }
      return;
    }

    if (command === "addx") {
      // First does nothing
      cycle += 1;
      if (shouldStoreValue(cycle)) {
        result += cycle * value;
      }

      // Now we add
      cycle += 1;
      if (shouldStoreValue(cycle)) {
        result += cycle * value;
      }
      value += parseInt(commandValue);
      return;
    }
  });

  console.log("answer is", result);
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.split("\n");

  let cycle = 0;
  let result = [];
  let pixels = [0, 1, 2];

  const shouldStoreValue = (cycle: number) => {
    return cycle % 40 === 0;
  };

  const updateResult = (): void => {
    if (shouldStoreValue(cycle)) {
      console.log(result.join(""));
      result = [];
    }
    if (pixels.includes(cycle % 40)) {
      result.push("#");
    } else {
      result.push(".");
    }
    cycle += 1;
  };

  rows.forEach((row) => {
    const [command, commandValue] = row.split(" ");

    if (command === "noop") {
      updateResult();
    }

    if (command === "addx") {
      // First does nothing
      updateResult();

      // Now we add
      updateResult();
      pixels = pixels.map((p) => p + parseInt(commandValue));
      return;
    }
  });

  updateResult();

  console.log("answer is", pixels);
};

firstPart();
secondPart();
