import Block from './block';
import { blankMatrix, blockShapes } from './const';
import { MatrixState, Line } from './types';
import { deepCopy } from './utils';

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
      if (this.tryMove()) {
        const nextBlock = result as Block;
        gs.matrixState = this.addBlock(tempMatrixState, nextBlock);
        gs.currentBlock = nextBlock;
        this.render(gs.matrixState);
      } else {
        this.count += 1;
        if (this.count > 10) {
          clearTimeout(this.timer);
        }
      }
      this.autoDown();
    }, 1300);
  }
  tryMove = (matrixState: MatrixState, nextBlock: Block): boolean => { // 方块是否能移到到指定位置
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
  tryDown = (matrixState: MatrixState, block: Block): boolean | Block => {
    const yx = [block.yx[0], block.yx[1]]
    const shape = block.shape;
    // 중간에 함수를 탈출해야 하기 때문에 forEach가 아닌, for문을 사용했다
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] == 0) { continue } // 0이면 따질게 없잖아
        
        const dy = i+1;
        const dx = j;
        const ny = (yx[0]+dy);
        const nx = (yx[1]+dx);
        if (ny < 0 || ny >= 20 || nx < 0 || nx >= 10) { continue }
        if (matrixState[ny][nx] === 1) { return false }
      }
    }
    const newBlock = new Block({
      type: block.type,
      rotateIndex: block.rotateIndex,
      timeStamp: Date.now(),
      yx: [yx[0]+1, yx[1]]
    });
    return newBlock;
  }
  removeBlock = (matrixState: MatrixState, block: Block): MatrixState => {
    const {yx, shape} = block;
    const newMatrixState = deepCopy(matrixState);
    shape.forEach((line, dy) => {
      line.forEach((blockState, dx) => {
        const ny = yx[0]+dy;
        const nx = yx[1]+dx;
        if (ny < 0 || ny >= 20 || nx < 0 || nx >= 10) { return false }
        newMatrixState[ny][nx] = 0;
      });
    });
    return newMatrixState;
  }
  addBlock = (matrixState: MatrixState, block: Block): MatrixState => {
    const {yx, shape} = block;
    const newMatrixState = deepCopy(matrixState);
    shape.forEach((line, dy) => {
      line.forEach((blockState, dx) => {
        const ny = yx[0]+dy;
        const nx = yx[1]+dx;
        if (ny < 0 || ny >= 20 || nx < 0 || nx >= 10) { return }
        newMatrixState[ny][nx] = 1;
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