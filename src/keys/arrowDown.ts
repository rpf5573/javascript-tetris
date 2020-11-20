import { tryMove } from '../utils';
import Matrix from '../matrix';
import { Tetris } from '../types';

export default class ArrowDown implements Tetris.KeyControl {
  constructor() {  }
  blockDown = () => {
    const gs = window.tetris.states;
    const nextBlock = gs.currentBlock.fall();
    const matrix = window.tetris.matrix;
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
      callback: this.blockDown
    });
  }
  keyUp = (e: KeyboardEvent) => {
    window.tetris.keyEventController.up({
      keyType: e.type as Tetris.KeyType,
      callback: null
    });
  }
}