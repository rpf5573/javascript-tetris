import { KeyType, KeyControl } from '../types';
import { tryMove } from '../utils';
import Matrix from '../matrix';

export default class ArrowDown implements KeyControl {
  timer: NodeJS.Timeout;
  active: boolean;
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
    console.log("keyDown");
    if (this.active === true) { return }
    else { this.active = true; }
    clearTimeout(this.timer); // 혹시모르니까 지워주고
    this.blockDown(); // 일단 한번은 움직여주자
    let begin = 100;
    const interval = 50;
    const loop = () => {
      this.timer = setTimeout(() => {
        begin = null;
        this.blockDown();
        loop();
      }, begin|interval);
    }
    loop();
  }
  keyUp = (e: KeyboardEvent) => {
    console.log("keyUp");
    clearTimeout(this.timer);
    this.timer = null;
    this.active = false;
  }
}