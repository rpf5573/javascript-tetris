import { KeyType, KeyControl } from '../types';
import { tryMove } from '../utils';
import Matrix from '../matrix';

export default class ArrowLeft implements KeyControl {
  matrix: Matrix;
  constructor(matrix: Matrix) { this.matrix = matrix; }
  keyDown = (e: KeyboardEvent) => {
    const gs = window.tetris.states;
    const nextBlock = gs.currentBlock.left();
    // 갈수있으면 가고, 못가면 어쩔 수 없고
    if (tryMove(gs.matrixState, nextBlock)) {
      const nextMatrixState = this.matrix.addBlock(gs.matrixState, nextBlock);
      this.matrix.render(nextMatrixState);
      gs.currentBlock = nextBlock;
    }
  }
  keyUp = (e: KeyboardEvent) => {}
}