import {getNextBlock, deepCopy, getClearLines, isOver} from './utils';
import {blankMatrix} from './const';

class StateManager {
  constructor() {}
  lock = () => {
    const gs = window.tetris.states;
    gs.lock = true;
  }
  unlock = () => {
    const gs = window.tetris.states;
    gs.lock = false;
  }
  start = () => {
    const gs = window.tetris.states;
    const matrix = window.tetris.matrix;
    matrix.render(matrix.addBlock(gs.matrixState, gs.currentBlock));
    matrix.autoDown();
  }
  reset = () => {
    this.lock();
    const gs = window.tetris.states;
    const matrix = window.tetris.matrix;
    const animateLine = (index: number) => {
      const len = 10
      if (index < 20) {
        const i = 20 - (index + 1)
        gs.matrixState[i] = Array(len).fill(1);
        matrix.render();
      } else if (index < 40) {
        const i = index - 20;
        gs.matrixState[i] = Array(len).fill(0);
        matrix.render();
      } 
      // 마지막에 index가 40이라면, 즉 다 끝났다면!
      else {
        this.unlock();
        this.overEnd();
      }
    }
    for (let i = 0; i <= 40; i++) {
      setTimeout(animateLine.bind(null, i), 50 * (i+1));
    }
  }
  overEnd = () => {
    const gs = window.tetris.states;
    const matrix = window.tetris.matrix;
    clearTimeout(matrix.timer);
    gs.matrixState = deepCopy(blankMatrix);
    matrix.render();
  }
  nextAround = () => {
    const gs = window.tetris.states;
    const matrix = window.tetris.matrix;
    clearTimeout(matrix.timer);
    const lines = getClearLines();
    if (lines.length > 0) {
      matrix.clearLines(lines);
      return
    }
    if (isOver()) {
      this.reset();
      return
    }
    setTimeout(() => {
      gs.currentBlock = getNextBlock();
      matrix.render(matrix.addBlock(gs.matrixState, gs.currentBlock));
      matrix.autoDown();
    }, 100);
  }
}

export default StateManager