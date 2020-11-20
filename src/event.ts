import { KeyCallback, KeyTimer } from "./types";

class KeyEventListener {
  events: KeyTimer = {}
  constructor() {  }
  down = (e: KeyCallback) => {
    const keys = Object.keys(this.events);
    keys.forEach((keyType:KeyType) => {
      if (keyType == e.keyType) {
        this.events
      }
    });
  }
  up = (e: KeyCallback) => {

  }
}

export default KeyEventListener;