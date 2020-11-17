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