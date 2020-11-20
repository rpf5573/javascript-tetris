import { tryMove } from '../utils';
import { Tetris } from '../types';

export default class ArrowLeft implements Tetris.KeyControl {
  constructor() {  }
  blockLeft = () => {
    const gs = window.tetris.states;
    const matrix = window.tetris.matrix;
    const nextBlock = gs.currentBlock.left();
    // 갈수있으면 가고, 못가면 어쩔 수 없고
    if (tryMove(gs.matrixState, nextBlock)) {
      const nextMatrixState = matrix.addBlock(gs.matrixState, nextBlock);
      matrix.render(nextMatrixState);
      gs.currentBlock = nextBlock;
    }
  }
  keyDown = (e: KeyboardEvent) => {
    window.tetris.keyEventController.down({
      keyType: e.type as Tetris.KeyType,
      callback: this.blockLeft
    });
  }
  keyUp = (e: KeyboardEvent) => {
    window.tetris.keyEventController.up({
      keyType: e.type as Tetris.KeyType,
      callback: null
    });
  }
}