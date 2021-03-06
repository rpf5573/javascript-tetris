import { LAST_ROUND } from './const';
import Numbers from './numbers';

class Point extends Numbers {
  title: string;
  titleEl: HTMLDivElement;
  constructor() {
    super('point');
    this.title = LAST_ROUND;
    this.titleEl = document.querySelector(".game-screen > .status > .point > label");
  }
  changeTitle = (_title: string) => {
    this.title = _title;
    this.titleEl.innerText = this.title;
  }
  updatePoint = (_point: number) => {
    const gs = window.tetris.states;
    gs.point += _point;
    this.render(gs.point);
  }
  setPoint = (_point: number) => {
    const gs = window.tetris.states;
    gs.point = _point;
    this.render(gs.point);
  }
  reset = (title: string) => {
    this.changeTitle(title);
    this.render(0);
  }
}

export default Point