import { tryMove } from '../utils';
import Matrix from '../matrix';
import { Tetris } from '../types';

export default class ArrowRight implements Tetris.KeyControl {
  constructor() {}
  type: Tetris.KeyType = 'arrowRight';
  blockRight = () => {
    const gs = window.tetris.states;
    if (gs.lock === true) {return}
    if (gs.currentBlock == null) {return}
    const matrix = window.tetris.matrix;
    const nextBlock = gs.currentBlock.right();
    // 갈수있으면 가고, 못가면 어쩔 수 없고
    if (tryMove(gs.matrixState, nextBlock)) {
      const nextMatrixState = matrix.addBlock(gs.matrixState, nextBlock);
      matrix.render(nextMatrixState);
      gs.currentBlock = nextBlock;
    }
  }
  startLineUp = () => {
    const tetris = window.tetris;
    
  }
  keyDown = () => {
    const tetris = window.tetris;
    window.tetris.keyEventController.down({
      keyType: this.type,
      callback: (tetris.states.currentBlock != null ) ? this.blockRight : this.startLineUp,
    });
  }
  keyUp = () => {
    window.tetris.keyEventController.up({
      keyType: this.type,
      callback: null
    });
  }
}