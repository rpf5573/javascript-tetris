import Matrix from '../matrix';
import { Tetris } from '../types';

export default class P implements Tetris.KeyControl {
  type: Tetris.KeyType = 'p';
  constructor() { }
  pause = () => {
  }
  keyDown = () => {
    window.tetris.keyEventController.down({
      keyType: this.type,
      callback: this.pause,
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