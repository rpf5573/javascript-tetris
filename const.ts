const blockShape: BlockShape = {
  I: [
    [1, 1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
};

const yxRotateOrigin: YXRotateOrigin = {
  I: [
    [-1, 1],
    [1, -1]
  ],
  L: [
    [0, 0]
  ],
  J: [
    [0, 0]
  ],
  Z: [
    [0, 0]
  ],
  S: [
    [0, 0]
  ],
  O: [
    [0, 0]
  ],
  T: [
    [0, 0],
    [1, 0],
    [-1, 1],
    [0, -1]
  ],
};

const blockTypes: string[] = Object.keys(blockShape);
const speeds: number[] = [800, 650, 500, 370, 250, 160];
const delays: number[] = [50, 60, 70, 80, 90, 100];
const fillLine: FillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const blankLine: BlankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const blankMatrix: Matrix = (() => {
  const matrix: Matrix = [];
  for (let i = 0; i < 20; i++) { matrix.push([...blankLine]); }
  return matrix;
})();
const clearPoints: number[] = [100, 300, 700, 1500];
const StorageKey: string = 'REACT_TETRIS';
const maxPoint: number = 999999;
const eachLines: number = 20;

export {
  blockShape, yxRotateOrigin, blockTypes, speeds,
  delays, fillLine, blankLine, blankMatrix, clearPoints,
  StorageKey, maxPoint, eachLines
}