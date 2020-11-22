class Point {
  title: string;
  point: number = 0;
  lr: string = 'Last Round';
  p: string = 'Point';
  titleEl: HTMLDivElement;
  numbersEl: HTMLDivElement;
  constructor() {
    this.title = this.lr;
    this.titleEl = document.querySelector(".game-screen > .status > .point > label");
    this.numbersEl = document.querySelector(".game-screen > .status > .point > .numbers");
  }
  changeTitle = (_title: string) => {
    this.title = _title;
    this.titleEl.innerText = this.title;
  }
  updatePoint = (_point: number) => {
    this.point += _point;
    this.render();
  }
  setPoint = (_point: number) => {
    this.point = _point;
    this.render();
  }
  render = () => {
    const pArr: number[] = (Array.from(String(this.point), Number)).reverse();
    const len = this.numbersEl.children.length;
    const startIndex = len - pArr.length;
    for(let i = startIndex; i < len; i++) {
      const el = this.numbersEl.children.item(i);
      el.className = `bg s_${pArr.pop()}`;
    }
  }
  reset = () => {
    this.point = 0;
    this.changeTitle(this.lr);
    this.render();
  }
}

export default Point