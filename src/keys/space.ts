import { Tetris } from '../types';
import { tryMove } from '../utils';

export default class Space implements Tetris.KeyControl {
  type: Tetris.KeyType = 'space';
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
  keyDown = () => {
    const tetris = window.tetris;
    if (tetris.states.currentBlock != null) {
      tetris.keyEventController.down({
        keyType: this.type,
        callback: this.drop,
        once: true
      });
    } else {
      tetris.stateManager.start();
    }
  }
  keyUp = () => {
    const tetris = window.tetris;
    if (tetris.states.currentBlock != null) {
      window.tetris.keyEventController.up({
        keyType: this.type,
        callback: null
      });
    }
  }
}