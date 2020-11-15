import {keyCodeWithType, keyCodes} from './const'
import { KeyType } from './types'
class Keyboard {
  constructor() {
    document.addEventListener("keydown", this.keyDown);
  }
  keyDown = (e: KeyboardEvent) => {
    // metaKey는 윈도우 혹은 cmd를 의미한다
    if (e.metaKey === true || keyCodes.indexOf(e.keyCode) === -1) {
      return;
    }
    const type: KeyType = keyCodeWithType[e.keyCode];
    this[type]();
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