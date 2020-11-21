import { Tetris } from '../types';

export default class R implements Tetris.KeyControl {
  type: Tetris.KeyType = 'r';
  constructor() {  }
  reset = () => { }
  keyDown = () => {
    window.tetris.keyEventController.down({
      keyType: this.type,
      callback: this.reset,
      once: true
    });
  }
  keyUp = () => {
    window.tetris.keyEventController.up({
      keyType: this.type,
      callback: null
    });
  }
}