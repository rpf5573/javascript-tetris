import { KeyType, KeyControl } from '../types';
import { tryMove } from '../utils';
import Matrix from '../matrix';

export default class Space implements KeyControl {
  constructor() {  }
  keyDown = (e: KeyboardEvent) => {
    const gs = window.tetris.states;
    const stateManager = window.tetris.stateManager;
    const matrix = window.tetris.matrix;
    let bottom = gs.currentBlock;
    for(var n = 1; n < 20; n++) {
      bottom = gs.currentBlock.fall(n);
      if (tryMove(gs.matrixState, bottom) == false) {
        bottom = gs.currentBlock.fall(n-1);
        break
      }
    }
    stateManager.lock();
    gs.currentBlock = bottom;
    gs.matrixState = matrix.addBlock(gs.matrixState, gs.currentBlock);
    matrix.render(gs.matrixState);
    stateManager.nextAround();
    setTimeout(stateManager.unlock, gs.speed/2);
  }
  keyUp = (e: KeyboardEvent) => {}
}