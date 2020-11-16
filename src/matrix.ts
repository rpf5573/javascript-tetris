import { blankMatrix } from './const';

class Matrix {
  matrix: HTMLDivElement
  constructor() {
    this.matrix = document.querySelector(".game-screen > .matrix");
  }
  removeChildren = (parentNode: HTMLDivElement) => {
    let child: ChildNode = null;
    while(child = parentNode.lastChild) { parentNode.removeChild(child); }
  }
  render = () => {
    this.removeChildren(this.matrix);
    blankMatrix.forEach(blankLine => {
      const line = document.createElement("div");
      line.className = "line";
      blankLine.forEach(el => {
        const blockNode = document.createElement("div");
        blockNode.className = "b";
        line.appendChild(blockNode);
      });
      this.matrix.appendChild(line);
    });
  }
}

export default Matrix