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
    const nextMatrixState = this.matrix.addBlock(gs.matrixState, bottom);
    this.matrix.render(nextMatrixState);
    /**
     * drop은 바로 고정시켜버린다
     * 그래서 잠깐동안 lock을 시켜버리자
     */
    this.matrix.lock();
    gs.currentBlock = bottom;
    gs.matrixState = nextMatrixState;
    setTimeout(this.matrix.unlock, gs.speed);
  }
  keyUp = (e: KeyboardEvent) => {}
}