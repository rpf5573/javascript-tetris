import './style.scss';
import Keyboard from './keyboard';
import { width, height, blankMatrix, blockShapes, blockTypes } from './const';
import Matrix from './matrix';
import Block from './block';
import { getNextBlock } from './utils';

/* 화면 크기가 바뀔때마다 게임판의 크기도 조정한다 */
const resize = () => {
  const containerEl: HTMLDivElement = document.querySelector("#page > .container");
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;
  const ratio = h/w;
  let css: any = {}
  /** 세로가 가로보다 더 짧으면 세로길이를 기준으로 scale을 정하고*/
  if (ratio < 1.25) {
    let scale = h/height;
    css = { transform: `scale(${scale})` }
  }
  /** 가로가 세로보다 짧으면 가로를 기준으로 scale을 정한다 */
  else {
    let scale = w/width;
    let filling = (h - (height*scale)) / scale / 3;
    css = {
      transform: `scale(${scale})`,
      paddingTop: Math.floor(filling),
      paddingBottom: Math.floor(filling),
      marginTop: Math.floor(-480 - (filling*(3/2)))
    }
  }
  Object.keys(css).forEach((property: string) => {
    containerEl.style.setProperty(property, css[property])  
  });
}
resize();
window.addEventListener('resize', resize);

/** gameState를 초기화한다 */
window.gameState = {
  currentBlock: getNextBlock(),
  matrixState: blankMatrix,
  speed: 0,
  point: 0,
  lock: false
}
const keyboard = new Keyboard();
const matrix = new Matrix();
matrix.autoDown();