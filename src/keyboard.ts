import { EvalSourceMapDevToolPlugin } from 'webpack';
import Matrix from './matrix';
import {keyCodeWithType, keyCodes} from './const';
import { KeyType, KeyControl } from './types';
import ArrowUp from './keys/arrowUp';
import ArrowRight from './keys/arrowRight';
import ArrowDown from './keys/arrowDown';
import ArrowLeft from './keys/arrowLeft';
import Space from './keys/space';
import P from './keys/p';
import R from './keys/r';

class Keyboard implements KeyControl {
  arrowUp: ArrowUp;
  arrowRight: ArrowRight;
  arrowDown: ArrowDown;
  arrowLeft: ArrowLeft;
  space: Space;
  p: P;
  r: R;
  constructor(matrix: Matrix) {
    this.arrowUp = new ArrowUp(matrix);
    this.arrowRight = new ArrowRight(matrix);
    this.arrowDown = new ArrowDown(matrix);
    this.arrowLeft = new ArrowLeft(matrix);
    this.space = new Space(matrix);
    this.p = new P(matrix);
    this.r = new R(matrix);
    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);
  }
  keyDown = (e: KeyboardEvent) => {
    console.log("key down");
    const gs = window.gameState;
    // 잠겨있으면 이벤트를 받지 않는다.
    if (gs.lock === true) { return; }
    // metaKey는 윈도우 혹은 cmd를 의미한다
    if (e.metaKey === true || keyCodes.indexOf(e.keyCode) === -1) { return; }
    const type: KeyType = keyCodeWithType[e.keyCode];
    this[type].keyDown(e);
  }
  keyUp = (e: KeyboardEvent) => {
    const gs = window.gameState;
    // 잠겨있으면 이벤트를 받지 않는다.
    if (gs.lock === true) { return; }
    if (e.metaKey === true || keyCodes.indexOf(e.keyCode) === -1) { return; }
    const type: KeyType = keyCodeWithType[e.keyCode];
    this[type].keyUp(e);
  }
}


export default Keyboard