import { KeyType, KeyControl } from '../types';
import { tryMove } from '../utils';

export default class ArrowRight implements KeyControl {
  constructor() {}
  keyDown = (e: KeyboardEvent) => {
    const gs = window.gameState;
    const nextBlock = gs.currentBlock.right();
    if (tryMove(gs.matrixState, nextBlock)) {
      
    }
  }
  keyUp = (e: KeyboardEvent) => {}
}