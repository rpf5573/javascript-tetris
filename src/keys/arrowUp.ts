import Matrix from '../matrix';
import { tryMove } from '../utils';
import { KeyType, KeyControl } from '../types';

export default class ArrowUp implements KeyControl {
  constructor() {  }
  keyDown = (e: KeyboardEvent) => {
    const gs = window.tetris.states
    const matrix = window.tetris.matrix;
    const nextBlock = gs.currentBlock.rotate();
    if (tryMove(gs.matrixState, nextBlock)) {
      const nextMatrixState = matrix.addBlock(gs.matrixState, nextBlock);
      matrix.render(nextMatrixState);
      gs.currentBlock = nextBlock;
    }
  }
  keyUp = (e: KeyboardEvent) => {}
}