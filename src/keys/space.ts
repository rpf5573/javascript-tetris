import { KeyType, KeyControl } from '../types';
import { tryMove } from '../utils';
import Matrix from '../matrix';

export default class Space implements KeyControl {
  matrix: Matrix;
  constructor(matrix: Matrix) { this.matrix = matrix; }
  keyDown = (e: KeyboardEvent) => {
    const gs = window.gameState;
    let bottom = gs.currentBlock;
    for(var n = 1; n < 20; n++) {
      bottom = gs.currentBlock.fall(n);
      if (tryMove(gs.matrixState, bottom) == false) {
        bottom = gs.currentBlock.fall(n-1);
        break
      }
    }
    this.matrix.lock();
    gs.currentBlock = bottom;
    gs.matrixState = this.matrix.addBlock(gs.matrixState, gs.currentBlock);
    this.matrix.render(gs.matrixState);
    this.matrix.nextAround();
    setTimeout(this.matrix.unlock, gs.speed/2);
  }
  keyUp = (e: KeyboardEvent) => {}
}