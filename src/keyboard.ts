import {keyCodeWithType, keyCodes} from './const'
import { keyType } from './types'
class Keyboard {
  constructor() {
    document.addEventListener("keydown", this.keyDown);
  }
  keyDown = (e: KeyboardEvent) => {
    // metaKey는 윈도우 혹은 cmd를 의미한다
    if (e.metaKey === true || keyCodeWithType.indexOf(e.keyCode) === -1) {
      return;
    }
    const type: string = keyCodeWithType[e.keyCode];
    this[type as key];
  }
  keyUp = (e: KeyboardEvent) => {}
  up = () => {}
  down = () => {}
  right = () => {}
  left = () => {}
  space = () => {}
  p = () => {}
  r = () => {}
}

export default Keyboard