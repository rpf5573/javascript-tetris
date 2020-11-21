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
    const pArr: number[] = (Array.from(String(this.point), Number)).reverse();
    console.log(pArr);
    const len = this.numbersEl.children.length;
    const startIndex = len - pArr.length;
    for(let i = startIndex; i < len; i++) {
      console.log(i);
      const el = this.numbersEl.children.item(i);
      el.className = `bg s_${pArr.pop()}`;
    }
  }
}

export default Point