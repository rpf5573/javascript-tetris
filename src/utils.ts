import Block from './block';
import { blockTypes, yxStartPosition } from './const';
import { MatrixState, Line, BlockType } from './types';

const getStartMatrix = () => {}
const isClear = () => {}
const isOver = () => {}
const isFocus = () => {}
const deepCopy = (matrixState: MatrixState): MatrixState => {
  const newMatrixState: MatrixState = [];
  matrixState.forEach((line: Line) => { newMatrixState.push([...line]); });
  return newMatrixState;
}
const getNextBlock = (): Block => {
  const typeArr = Object.keys(blockTypes);
  const randomType = typeArr[Math.floor(Math.random() * typeArr.length)] as BlockType;
  return new Block({
    type: randomType,
    rotateIndex: 0,
    timeStamp: Date.now(),
    yx: yxStartPosition[randomType]
  });
}

export {getStartMatrix, isClear, isOver, isFocus, deepCopy, getNextBlock}