import {getNextBlock, deepCopy, getClearLines, isOver} from './utils';
import {blankMatrix} from './const';

class StateManager {
  constructor() {}
  ready = (callback?:() => void) => {
    this.lock();
    const tetris = window.tetris;
    const matrix = tetris.matrix;
    clearTimeout(matrix.timer);
    matrix.render(deepCopy(blankMatrix));
    if (tetris.states.nextBlock == null) { tetris.states.nextBlock = getNextBlock(); }
    tetris.next.reset(); // next를 지우고

    const lastPoint = Number(localStorage.getItem('last-point'));
    if ( lastPoint > 0 ) {
      tetris.point.changeTitle(tetris.point.lr);
      tetris.point.setPoint(lastPoint);
    } else {
      tetris.point.reset();
    }
    tetris.logo.show(); // logo 보이기 + animation까지
    tetris.logo.animate();
    setTimeout(() => {
      this.unlock();
    }, 500);
    if (callback) {callback()}
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
  matrixCleanUp = (callback: () => void) => {
  }
  reset = () => {
    this.lock();
    const tetris = window.tetris;
    tetris.states.currentBlock = null;
    tetris.states.nextBlock = null;
    tetris.matrix.reset(() => {
      this.ready(this.unlock);
    });
  }
  gameOver = () => {
    this.lock();
    const tetris = window.tetris;
    const point = tetris.point.point;
    if (point > 0) { localStorage.setItem('last-point', `${tetris.point.point}`); }
    tetris.matrix.reset(() => {
      setTimeout(() => {
        this.ready(this.unlock);
      }, 500);
    });
  }
  nextAround = () => {
    const tetris = window.tetris;
    const gs = tetris.states;
    const matrix = tetris.matrix;
    clearTimeout(matrix.timer);
    const lines = getClearLines();
    if (lines.length > 0) {
      matrix.clearLines(lines, (point:number) => {
        tetris.point.updatePoint(point); // clear한다음에 점수도 주자
      });
      return
    }
    if (isOver()) {
      this.gameOver();
      return
    }
    setTimeout(() => {
      gs.currentBlock = gs.nextBlock;
      gs.nextBlock = getNextBlock(); // deep copy를 안했는데 이게 문제가 될까?
      tetris.next.render(gs.nextBlock);
      matrix.render(matrix.addBlock(gs.matrixState, gs.currentBlock));
      matrix.autoDown();
    }, 100);
  }
}

export default StateManager