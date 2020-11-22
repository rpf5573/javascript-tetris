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
    this.render(this.point);
  }
  setPoint = (_point: number) => {
    this.point = _point;
    this.render(this.point);
  }
  render = (point: number) => {
    let pArr: number[] = (Array.from(String(point), Number)).reverse();
    if (point == 0) { pArr = [0]; }
    const len = this.numbersEl.children.length;
    const startIndex = len - pArr.length;
    for(let i = 0; i < len; i++) {
      const el = this.numbersEl.children.item(i);
      if (i >= startIndex) {
        el.className = `bg s_${pArr.pop()}`;
      } else {
        el.className = `bg s_n`;
      }
    }
  }
  reset = (title: string) => {
    this.point = 0;
    this.changeTitle(title);
    this.render(0);
  }
}

export default Point