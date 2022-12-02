import * as fs from "fs";

const getSumPerPosition = (rows: string[]): number[] => {
  return rows.reduce((prev: number[], curr) => {
    const numbers = curr.split("").map((val) => parseInt(val));

    if (prev.length === 0) {
      return numbers;
    }

    numbers.forEach((val, idx) => {
      prev[idx] += val;
    });

    return prev;
  }, []);
};

const firstPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const rows = fileData.trim().split("\n");

  let sumPerPosition = getSumPerPosition(rows);

  let mostCommon = parseInt(
    sumPerPosition.map((sum) => (sum > rows.length / 2 ? "1" : "0")).join(""),
    2
  );

  let leastCommon = parseInt(
    sumPerPosition.map((sum) => (sum < rows.length / 2 ? "1" : "0")).join(""),
    2
  );

  console.log("answer is", mostCommon * leastCommon);
};

const secondPart = () => {
  const fileData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  let rows = fileData.trim().split("\n");
  const numberLength = rows[0].length;

  let rowsWithGreater = rows.slice();
  let idx = 0;
  while (rowsWithGreater.length > 1 && idx < numberLength) {
    let sumPerPosition = getSumPerPosition(rowsWithGreater);
    let numberToLookFor =
      sumPerPosition[idx] >= rowsWithGreater.length / 2 ? "1" : "0";

    rowsWithGreater = rowsWithGreater.filter(
      (row) => row[idx] === numberToLookFor
    );

    idx++;
  }

  let rowsWithLesser = rows.slice();
  idx = 0;
  while (rowsWithLesser.length > 1 && idx < numberLength) {
    let sumPerPosition = getSumPerPosition(rowsWithLesser);
    let numberToLookFor =
      sumPerPosition[idx] >= rowsWithLesser.length / 2 ? "0" : "1";

    rowsWithLesser = rowsWithLesser.filter(
      (row) => row[idx] === numberToLookFor
    );

    idx++;
  }

  console.log(
    "answer is",
    parseInt(rowsWithGreater[0], 2) * parseInt(rowsWithLesser[0], 2)
  );
};

firstPart();
secondPart();
