import { KeyType, KeyControl } from '../types';
import { tryMove } from '../utils';
import Matrix from '../matrix';

export default class ArrowLeft implements KeyControl {
  timer: NodeJS.Timeout;
  active: boolean;
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
    if (this.active === true) { return }
    else { this.active = false }
    clearTimeout(this.timer); // 혹시모르니까 지워주고
    this.blockLeft();
    let begin = 100;
    let interval = 50;
    const loop = () => {
      this.timer = setTimeout(() => {
        begin = null;
        this.blockLeft();
        loop();
      }, begin|interval);
    }
  }
  keyUp = (e: KeyboardEvent) => {}
}