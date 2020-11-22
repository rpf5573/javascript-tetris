import Matrix from '../matrix';
import { Tetris } from '../types';
import { tryMove } from '../utils';

export default class ArrowUp implements Tetris.KeyControl {
  type: Tetris.KeyType = 'arrowUp';
  constructor() {  }
  blockUp = () => {
    const gs = window.tetris.states
    if (gs.currentBlock == null) {return}
    const matrix = window.tetris.matrix;
    const nextBlock = gs.currentBlock.rotate();
    if (tryMove(gs.matrixState, nextBlock)) {
      const nextMatrixState = matrix.addBlock(gs.matrixState, nextBlock);
      matrix.render(nextMatrixState);
      gs.currentBlock = nextBlock;
    }
  }
  keyDown = () => {
    window.tetris.keyEventController.down({
      keyType: this.type,
      callback: this.blockUp,
      once: true
    });
  }
  keyUp = () => {
    window.tetris.keyEventController.up({
      keyType: this.type,
      callback: null
    });
  }
}