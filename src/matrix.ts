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
    const gs = window.gameState;
    gs.matrixState = this.addBlock(gs.matrixState, gs.currentBlock);
    this.render(gs.matrixState);
  }
  removeChildren = (parentNode: HTMLDivElement) => {
    let child: ChildNode = null;
    while(child = parentNode.lastChild) { parentNode.removeChild(child); }
  }
  autoDown = () => {
    this.timer = setTimeout(() => {
      const gs = window.gameState;
      const currentBlock = gs.currentBlock;
      const tempMatrixState = this.removeBlock(gs.matrixState, currentBlock);
      const nextBlock = new Block({
        rotateIndex: currentBlock.rotateIndex,
        type: currentBlock.type,
        timeStamp: Date.now(),
        yx: [currentBlock.yx[0]+1, currentBlock.yx[1]]
      });
      if (this.tryMove(tempMatrixState, nextBlock)) {
        gs.matrixState = this.addBlock(tempMatrixState, nextBlock);
        gs.currentBlock = nextBlock;
        this.render(gs.matrixState);
      } else {
        gs.currentBlock = getNextBlock();
      }
      this.autoDown();
    }, 300);
  }
  tryMove = (matrixState: MatrixState, nextBlock: Block): boolean => {
    const yx = nextBlock.yx;
    const shape = nextBlock.shape;
    const width = shape[0].length;
    return shape.every((line, i) => (
      line.every((blockState, j) => {
        if (yx[1] < 0) { return false; } // left
        if (yx[1] + width > 10) { return false; } // right
        if (yx[0] + i < 0) { return true; } // top
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
  removeBlock = (matrixState: MatrixState, block: Block): MatrixState => {
    const {yx, shape} = block;
    const newMatrixState = deepCopy(matrixState);
    shape.forEach((line, i) => {
      line.forEach((blockState, j) => {
        const ny = yx[0]+i;
        const nx = yx[1]+j;
        if (ny < 0 || ny >= 20 || nx < 0 || nx >= 10) { return false }
        if (newMatrixState[ny][nx] == 1) { newMatrixState[ny][nx] = 0; }
      });
    });
    return newMatrixState;
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