import { EvalSourceMapDevToolPlugin } from 'webpack';
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
  arrowUp = new ArrowUp();
  arrowRight = new ArrowRight();
  arrowDown = new ArrowDown();
  arrowLeft = new ArrowLeft();
  space = new Space();
  p = new P();
  r = new R();
  constructor() {
    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);
  }
  keyDown = (e: KeyboardEvent) => {
    // metaKey는 윈도우 혹은 cmd를 의미한다
    if (e.metaKey === true || keyCodes.indexOf(e.keyCode) === -1) { return; }
    const type: KeyType = keyCodeWithType[e.keyCode];
    this[type].keyDown(e);
  }
  keyUp = (e: KeyboardEvent) => {
    if (e.metaKey === true || keyCodes.indexOf(e.keyCode) === -1) { return; }
    const type: KeyType = keyCodeWithType[e.keyCode];
    this[type].keyUp(e);
  }
}


export default Keyboard