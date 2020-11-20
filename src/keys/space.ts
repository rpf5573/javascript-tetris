import { Tetris } from '../types';
import { tryMove } from '../utils';

export default class Space implements Tetris.KeyControl {
  constructor() {  }
  drop = () => {
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
  keyDown = (e: KeyboardEvent) => {
    window.tetris.keyEventController.down({
      keyType: e.type as Tetris.KeyType,
      callback: this.drop
    });
  }
  keyUp = (e: KeyboardEvent) => {
    window.tetris.keyEventController.up({
      keyType: e.type as Tetris.KeyType,
      callback: null
    });
  }
}