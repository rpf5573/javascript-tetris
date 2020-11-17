import Matrix from '../matrix';
import { tryMove } from '../utils';
import { KeyType, KeyControl } from '../types';

export default class ArrowUp implements KeyControl {
  matrix: Matrix;
  constructor(matrix: Matrix) { this.matrix = matrix; }
  keyDown = (e: KeyboardEvent) => {
    const gs = window.gameState
    const nextBlock = gs.currentBlock.rotate();
    if (tryMove(gs.matrixState, nextBlock)) {
      const nextMatrixState = this.matrix.addBlock(gs.matrixState, nextBlock);
      this.matrix.render(nextMatrixState);
      gs.currentBlock = nextBlock;
    }
  }
  keyUp = (e: KeyboardEvent) => {}
}