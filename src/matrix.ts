import { blankMatrix } from './const';
import { MatrixState, Line } from './types';

class Matrix {
  matrixNode: HTMLDivElement
  constructor() {
    this.matrixNode = document.querySelector(".game-screen > .matrix");
    this.render(blankMatrix);
  }
  removeChildren = (parentNode: HTMLDivElement) => {
    let child: ChildNode = null;
    while(child = parentNode.lastChild) { parentNode.removeChild(child); }
  }
  autoDown = (matrixState: MatrixState) => {
    
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