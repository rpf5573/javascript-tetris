import Block from './block';
import { blankMatrix, blockShapes } from './const';
import { MatrixState, Line } from './types';
import { deepCopy, getNextBlock } from './utils';

class Matrix {
  matrixNode: HTMLDivElement;
  count: number = 0;
  timer: NodeJS.Timeout;
  constructor() {
    this.matrixNode = document.querySelector(".game-screen > .matrix");
    this.render(window.gameState.matrixState);
  }
  removeChildren = (parentNode: HTMLDivElement) => {
    let child: ChildNode = null;
    while(child = parentNode.lastChild) { parentNode.removeChild(child); }
  }
  autoDown = () => {
    let gs = window.gameState;
    let currentBlock = gs.currentBlock;
    const fall = () => {
      gs = window.gameState;
      currentBlock = gs.currentBlock;
      const nextBlock = currentBlock.fall();
      if (this.tryMove(gs.matrixState, nextBlock)) {
        this.render(this.addBlock(gs.matrixState, nextBlock)); // 핵심은 여기서 update 된 matrix를 gameState.matrixState 에 넣지 않는다는거~
        gs.currentBlock = nextBlock;
        this.timer = setTimeout(fall, 1000);
      } else {
        // 다음 블럭이 못가면, 현재 블럭을 matrixState에 고정(?) 시킨다
        gs.matrixState = this.addBlock(gs.matrixState, currentBlock);
        this.nextAround();
      }
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(fall, 1000);
  }
  nextAround = () => {
    const gs = window.gameState;
    const matrix = gs.matrixState;
    clearTimeout(this.timer);
    gs.lock = true;
    setTimeout(() => {
      gs.lock = false;
      gs.currentBlock = getNextBlock();
      this.autoDown();
    }, 100);
  }
  tryMove = (matrixState: MatrixState, nextBlock: Block): boolean => {
    const yx = nextBlock.yx;
    const shape = nextBlock.shape;
    const width = shape[0].length;
    return shape.every((line, i) => (
      line.every((blockState, j) => {
        if (yx[1] < 0) { return false; } // left
        if (yx[1] + width > 10) { return false; } // right
        if (yx[0] + i < 0) { return true; } // top 위로 넘어가는건 ㄱㅊ아
        if (yx[0] + i >= 20) { return false; } // bottom
        if (blockState === 1) {
          const y = yx[0] + i;
          const x = yx[1] + j;
          if (matrixState[y][x] == 1) { return false; }
          return true;
        }
        return true;
      })
    ));
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
  render = (matrixState: MatrixState) => {
    this.removeChildren(this.matrixNode); // 비우고 시작하자
    matrixState.forEach((line: Line) => {
      const lineNode = document.createElement("div");
      lineNode.className = 'line';
      line.forEach(blockState => {
        const blockNode = document.createElement("div");
        blockNode.className = 'b';
        if (blockState === 1) { blockNode.classList.add("active") }
        lineNode.appendChild(blockNode);
      });
      this.matrixNode.appendChild(lineNode);
    });
  }
}

export default Matrix