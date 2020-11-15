import './style.css';
import Keyboard from './keyboard';

/* 화면 크기가 바뀔때마다 게임판의 크기도 조정한다 */
const resize = () => {
  const containerEl: HTMLDivElement = document.querySelector("#page > .container");
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;
  const ratio = h/w;
  let css: any = {}
  /** 세로가 가로보다 더 짧으면 세로길이를 기준으로 scale을 정하고*/
  if (ratio < 1.5) {
    let scale = h/960;
    css = { transform: `scale(${scale})` }
  }
  /** 가로가 세로보다 짧으면 가로를 기준으로 scale을 정한다 */
  else {
    let scale = w/640;
    let filling = (h - (960*scale)) / scale / 3;
    css = {
      transform: `scale(${scale})`,
      paddingTop: Math.floor(filling),
      paddingBottom: Math.floor(filling),
      marginTop: Math.floor(-480 - (filling*(3/2)))
    }
  }
  console.dir(css);
  Object.keys(css).forEach((property: string) => {
    console.log(property);
    containerEl.style.setProperty(property, css[property])  
  });
}
resize();
window.addEventListener('resize', resize);

const keyboard = new Keyboard();
