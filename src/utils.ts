import Block from './block';
import { blockTypes, yxStartPosition, blockShapes } from './const';
import { MatrixState, Line, BlockType } from './types';

const getStartMatrix = () => {}
const getClearLines = (): number[] => {
  const gs = window.gameState;
  const clearLines: number[] = [];
  gs.matrixState.forEach((line, i) => {
    if (line.every(n => !!n)) { clearLines.push(i); }
  });
  return clearLines;
}
const isOver = (): boolean => {
  const gs = window.gameState;
  return gs.matrixState[0].some((blockState)=> { return !!blockState })
}
const isFocus = () => {}
const deepCopy = (matrixState: MatrixState): MatrixState => {
  const newMatrixState: MatrixState = [];
  matrixState.forEach((line: Line) => { newMatrixState.push([...line]); });
  return newMatrixState;
}
const getNextBlock = (): Block => {
  const typeArr = Object.keys(blockTypes);
  const randomIndex = Math.floor(Math.random() * typeArr.length);
  const randomType = typeArr[randomIndex] as BlockType;
  return new Block({
    type: randomType,
    shape: blockShapes[randomType],
    rotateIndex: 0,
    timeStamp: Date.now(),
    yx: yxStartPosition[randomType]
  });
}
const tryMove = (matrixState: MatrixState, nextBlock: Block): boolean => {
  const yx = nextBlock.yx;
  const shape = nextBlock.shape;
  const width = shape[0].length;
  return shape.every((line, i) => (
    line.every((blockState, j) => {
      if (yx[1] < 0) { return false; } // left
      if (yx[1] + width > 10) { return false; } // right
      if (yx[0] + i < 0) { return true; } // top 위로 넘어가는건 ㄱㅊ아
      if (yx[0] + i >= 20) { return false; } // bottom
      if (blockState === 1) {
        const y = yx[0] + i;
        const x = yx[1] + j;
        if (matrixState[y][x] == 1) { return false; }
      }
      return true;
    })
  ));
}

export {getStartMatrix, getClearLines, isOver, isFocus, deepCopy, getNextBlock, tryMove}