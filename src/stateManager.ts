import {getNextBlock, deepCopy, getClearLines, isOver} from './utils';
import {blankMatrix} from './const';

class StateManager {
  constructor() {}
  ready = () => {
    const gs = window.tetris.states;
    const matrix = window.tetris.matrix;
    matrix.render(blankMatrix);
    window.tetris.logo.show();
    window.tetris.logo.animate();
  }
  lock = () => {
    const gs = window.tetris.states;
    gs.lock = true;
  }
  unlock = () => {
    const gs = window.tetris.states;
    gs.lock = false;
  }
  start = () => {
    const tetris = window.tetris;
    tetris.logo.hide();
    tetris.point.changeTitle(tetris.point.p); // 포인트 title변경하고
    setTimeout(() => {
      const gs = window.tetris.states;
      gs.currentBlock = gs.nextBlock;
      gs.nextBlock = getNextBlock(); // deep copy를 안했는데 이게 문제가 될까?
      tetris.next.render(gs.nextBlock);
      const matrix = window.tetris.matrix;
      matrix.render(matrix.addBlock(gs.matrixState, gs.currentBlock));
      matrix.autoDown();
    }, 300);
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
      matrix.clearLines(lines, (point:number) => {
        window.tetris.point.plusPoint(point); // clear한다음에 점수도 주자
      });
      return
    }
    if (isOver()) {
      this.reset();
      return
    }
    setTimeout(() => {
      gs.currentBlock = gs.nextBlock;
      gs.nextBlock = getNextBlock(); // deep copy를 안했는데 이게 문제가 될까?
      window.tetris.next.render(gs.nextBlock);
      matrix.render(matrix.addBlock(gs.matrixState, gs.currentBlock));
      matrix.autoDown();
    }, 100);
  }
}

export default StateManager