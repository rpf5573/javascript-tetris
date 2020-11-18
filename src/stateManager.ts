import {getNextBlock, deepCopy} from './utils';
import {blankMatrix} from './const';
import Matrix from './matrix';

class StateManager {
  matrix: Matrix;
  constructor(matrix: Matrix) { this.matrix = matrix }
  lock = () => {
    const gs = window.gameState;
    gs.lock = true;
  }
  unlock = () => {
    const gs = window.gameState;
    gs.lock = false;
  }
  start = () => {
    window.gameState = {
      currentBlock: getNextBlock(),
      matrixState: blankMatrix,
      speed: 600,
      point: 0,
      lock: false
    }
    this.matrix.autoDown();
  }
  reset = () => {
    this.lock();
    const gs = window.gameState;
    const animateLine = (index: number) => {
      const len = 10
      if (index < 20) {
        const i = 20 - (index + 1)
        gs.matrixState[i] = Array(len).fill(1);
        this.matrix.render();
      } else if (index < 40) {
        const i = index - 20;
        gs.matrixState[i] = Array(len).fill(0);
        this.matrix.render();
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
    const gs = window.gameState;
    clearTimeout(this.matrix.timer);
    gs.matrixState = deepCopy(blankMatrix);
    this.matrix.render();
  }
}

export default StateManager