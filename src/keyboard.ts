import {keyCodeWithTypes, keyCodes} from './const'
import 
class Keyboard {
  constructor() {
    document.addEventListener("keydown", this.keyDown);
  }
  keyDown = (e: KeyboardEvent) => {
    // metaKey는 윈도우 혹은 cmd를 의미한다
    if (e.metaKey === true || keyboardIndexs.indexOf(e.keyCode) === -1) {
      return;
    }
    const type: string = keyCodeWithTypes[e.keyCode];
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