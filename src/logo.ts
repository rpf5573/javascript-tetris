class Logo {
  logo: HTMLDivElement;
  dragon: HTMLDivElement
  timer: NodeJS.Timeout
  constructor() {
    this.logo = document.querySelector(".game-screen > .matrix > .logo");
    this.dragon = this.logo.children[0] as HTMLDivElement;
  }
  show = () => {
    this.logo.classList.add('active');
  }
  run = () => {
    const count = 0;
    this.timer = setTimeout(() => {
      this.logo.className = "dragon r3";
    }, 150);
  }
  animate = () => {
    this.run();
  }
}

export default Logo;