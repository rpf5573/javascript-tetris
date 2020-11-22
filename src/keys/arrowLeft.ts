import { tryMove } from '../utils';
import { Tetris } from '../types';

export default class ArrowLeft implements Tetris.KeyControl {
  type: Tetris.KeyType = 'arrowLeft';
  constructor() {  }
  blockLeft = () => {
    const gs = window.tetris.states;
    if (gs.currentBlock == null) {return}
    const matrix = window.tetris.matrix;
    const nextBlock = gs.currentBlock.left();
    // 갈수있으면 가고, 못가면 어쩔 수 없고
    if (tryMove(gs.matrixState, nextBlock)) {
      const nextMatrixState = matrix.addBlock(gs.matrixState, nextBlock);
      matrix.render(nextMatrixState);
      gs.currentBlock = nextBlock;
    }
  }
  keyDown = () => {
    window.tetris.keyEventController.down({
      keyType: this.type,
      callback: this.blockLeft
    });
  }
  keyUp = () => {
    window.tetris.keyEventController.up({
      keyType: this.type,
      callback: null
    });
  }
}