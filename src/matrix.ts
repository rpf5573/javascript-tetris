import Block from './block';
import { blankLine, blankMatrix } from './const';
import { MatrixState, Line } from './types';
import { deepCopy, getNextBlock, tryMove, getClearLines, isOver } from './utils';

class Matrix {
  matrixNode: HTMLDivElement;
  count: number = 0;
  timer: NodeJS.Timeout;
  constructor() {
    this.matrixNode = document.querySelector(".game-screen > .matrix");
    const gs = window.gameState;
    this.render(this.addBlock(gs.matrixState, gs.currentBlock));
    this.autoDown();
  }
  removeChildren = (parentNode: HTMLDivElement) => {
    let child: ChildNode = null;
    while(child = parentNode.lastChild) { parentNode.removeChild(child); }
  }
  autoDown = () => {
    console.log("autoDown is called");
    const gs = window.gameState;
    const fall = () => {
      if (gs.lock == true) {
        this.timer = setTimeout(fall, gs.speed);
        return
      }
      let currentBlock = gs.currentBlock;
      const nextBlock = currentBlock.fall();
      if (tryMove(gs.matrixState, nextBlock)) {
        this.render(this.addBlock(gs.matrixState, nextBlock)); // 핵심은 여기서 update 된 matrix를 gameState.matrixState 에 넣지 않는다는거~
        gs.currentBlock = nextBlock;
        this.timer = setTimeout(fall, gs.speed);
      } else {
        // 다음 블럭이 못가면, 현재 블럭을 matrixState에 고정(?) 시킨다
        gs.matrixState = this.addBlock(gs.matrixState, currentBlock);
        this.nextAround();
      }
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(fall, gs.speed);
  }
  nextAround = () => {
    const gs = window.gameState;
    clearTimeout(this.timer);
    const lines = getClearLines();
    if (lines.length > 0) {
      this.clearLines(lines);
      return
    }
    if (isOver()) {
      this.reset();
      return
    }
    setTimeout(() => {
      gs.currentBlock = getNextBlock();
      this.render(this.addBlock(gs.matrixState, gs.currentBlock));
      this.autoDown();
    }, 100);
  }
  addBlock = (matrixState: MatrixState, block: Block): MatrixState => {
    const {yx, shape} = block;
    const newMatrixState = deepCopy(matrixState);
    shape.forEach((line, i) => {
      line.forEach((blockState, j) => {
        const y = yx[0]+i;
        const x = yx[1]+j;
        if (y < 0 || y >= 20 || x < 0 || x >= 10) { return }
        if (blockState == 1) {
          if (newMatrixState[y][x] == 0) { newMatrixState[y][x] = 1; }
        }
      });
    });
    return newMatrixState;
  }
  lock = () => {
    const gs = window.gameState;
    gs.lock = true;
  }
  unlock = () => {
    const gs = window.gameState;
    gs.lock = false;
  }
  clearLines = (lines: number[]) => {
    this.lock(); // 잠그고
    this.animateLines(lines, () => {
      let newMatrix = deepCopy(window.gameState.matrixState);
      lines.forEach(n => {
        newMatrix.splice(n, 1);
        newMatrix.unshift(blankLine);
      });
      window.gameState.matrixState = newMatrix;
      this.render();
      this.unlock(); // 풀어준다
      this.nextAround();
    });
  }
  animateLines = (lines: number[], callback:()=>void) => {
    this.render(this.setLine(lines, 2));
    setTimeout(() => {
      this.render(this.setLine(lines, 0));
      setTimeout(() => {
        this.render(this.setLine(lines, 2));
        setTimeout(() => {
          this.render(this.setLine(lines, 0));
          callback();
        }, 150);
      }, 150);
    }, 150);
  }
  setLine = (lines: number[], blockState: number) => {
    const gs = window.gameState;
    const matrix = deepCopy(gs.matrixState);
    lines.forEach(i => {
      const newLine = Array(10).fill(blockState);
      matrix[i] = newLine;
    });
    return matrix;
  }
  reset = () => {
    this.lock();
    const gs = window.gameState;
    for(let i = gs.matrixState.length-1; i > -1; i--) {
      const up = (t: number) => {
        setTimeout(() => {
          gs.matrixState[t] = Array(gs.matrixState[t].length).fill(1);
          this.render();
          if (t == 0) {
            
          }
        }, t*200);
      }
      okok(i);
    }
  }
  render = (matrixState?: MatrixState) => {
    if (matrixState == undefined) { matrixState = window.gameState.matrixState; }
    this.removeChildren(this.matrixNode); // 비우고 시작하자
    matrixState.forEach((line: Line) => {
      const lineNode = document.createElement("div");
      lineNode.className = 'line';
      line.forEach(blockState => {
        const blockNode = document.createElement("div");
        blockNode.className = 'b';
        if (blockState === 1) { blockNode.classList.add("active"); }
        else if (blockState === 2) { blockNode.classList.add("blink"); }
        lineNode.appendChild(blockNode);
      });
      this.matrixNode.appendChild(lineNode);
    });
  }
}

export default Matrix