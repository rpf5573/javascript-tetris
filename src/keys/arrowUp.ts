import Matrix from '../matrix';
import { Tetris } from '../types';
import { tryMove } from '../utils';

export default class ArrowUp implements Tetris.KeyControl {
  constructor() {  }
  blockUp = () => {
    const gs = window.tetris.states
    const matrix = window.tetris.matrix;
    const nextBlock = gs.currentBlock.rotate();
    if (tryMove(gs.matrixState, nextBlock)) {
      const nextMatrixState = matrix.addBlock(gs.matrixState, nextBlock);
      matrix.render(nextMatrixState);
      gs.currentBlock = nextBlock;
    }
  }
  keyDown = (e: KeyboardEvent) => {
    window.tetris.keyEventController.down({
      keyType: e.type as Tetris.KeyType,
      callback: this.blockUp
    });
  }
  keyUp = (e: KeyboardEvent) => {
    window.tetris.keyEventController.up({
      keyType: e.type as Tetris.KeyType,
      callback: null
    });
  }
}