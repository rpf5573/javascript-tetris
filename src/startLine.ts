class StartLine {
  title: string;
  titleEl: HTMLDivElement;
  numbersEl: HTMLDivElement;
  constructor() {
    this.numbersEl = document.querySelector(".game-screen > .status > .start-lines > .numbers");
  }
  updateCount = (_count: number) => {
    window.tetris.states.startLines = _count;
  }
  render = (count: number) => {
    let cArr: number[] = (Array.from(String(count), Number)).reverse();
    if (count == 0) { cArr = [0]; }
    const len = this.numbersEl.children.length;
    const startIndex = len - cArr.length;
    for(let i = 0; i < len; i++) {
      const el = this.numbersEl.children.item(i);
      if (i >= startIndex) {
        el.className = `bg s_${cArr.pop()}`;
      } else {
        el.className = `bg s_n`;
      }
    }
  }
  reset = (title: string) => {
    this.updateCount(0);
    this.render(0);
  }
}

export default StartLine