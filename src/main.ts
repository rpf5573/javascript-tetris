import './style.css';
import Block from './block';

const resize = () => {
  const containerEl: HTMLDivElement = document.querySelector("#page > .container");
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;
  const ratio = h/w;
  let css: any = {}
  /** 세로가 가로보다 더 짧으면 세로길이를 기준으로 scale을 정하고*/
  if (ratio < 1.5) {
    css = { scale : h/960 }
  }
  /** 가로가 세로보다 짧으면 가로를 기준으로 scale을 정한다 */
  else {
    let scale = w/640;
    let filling = (h - (960*css.scale)) / css.scale / 3;
    css = {
      scale,
      paddingTop: Math.floor(filling),
      paddingBottom: Math.floor(filling),
      marginTop: Math.floor(-480 - (filling*(3/2)))
    }
  }
  Object.keys(css).forEach((property: string) => { 
    containerEl.style.setProperty(property, css[property])  
  });
  console.log("resizing...");
}
document.addEventListener('resize', resize);