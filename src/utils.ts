import { MatrixState, Line } from './types';

const getStartMatrix = () => {}
const isClear = () => {}
const isOver = () => {}
const isFocus = () => {}
const deepCopy = (matrixState: MatrixState): MatrixState => {
  const newMatrixState: MatrixState = [];
  matrixState.forEach((line: Line) => { newMatrixState.push([...line]); });
  return newMatrixState;
}
const getNextBlock = () => {}

export {getStartMatrix, isClear, isOver, isFocus, deepCopy}