import Matrix from '../matrix';
import { Tetris } from '../types';

export default class P implements Tetris.KeyControl {
  constructor() { }
  pause = () => {
  }
  keyDown = (e: KeyboardEvent) => {
    window.tetris.keyEventController.down({
      keyType: e.type as Tetris.KeyType,
      callback: this.pause
    });
  }
  keyUp = (e: KeyboardEvent) => {
    window.tetris.keyEventController.up({
      keyType: e.type as Tetris.KeyType,
      callback: null
    });
  }
}