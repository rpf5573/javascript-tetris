import { KeyType, KeyControl } from '../types';
import { tryMove } from '../utils';
import Matrix from '../matrix';

export default class ArrowRight implements KeyControl {
  constructor() {}
  keyDown = (e: KeyboardEvent) => {
    const gs = window.tetris.states;
    const matrix = window.tetris.matrix;
    const nextBlock = gs.currentBlock.right();
    // 갈수있으면 가고, 못가면 어쩔 수 없고
    if (tryMove(gs.matrixState, nextBlock)) {
      const nextMatrixState = matrix.addBlock(gs.matrixState, nextBlock);
      matrix.render(nextMatrixState);
      gs.currentBlock = nextBlock;
    }
  }
  keyUp = (e: KeyboardEvent) => {}
}