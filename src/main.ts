import './style.scss';
import Keyboard from './keyboard';
import { blankMatrix } from './const';
import Matrix from './matrix';
import { getNextBlock, resize } from './utils';
import StateManager from './stateManager';
import KeyEventController from './keyEventController';

resize();
window.addEventListener('resize', resize);
window.tetris = {
  states: {
    currentBlock: getNextBlock(),
    matrixState: blankMatrix,
    speed: 600,
    point: 0,
    lock: false
  },
  matrix: new Matrix(),
  keyboard: new Keyboard(),
  stateManager: new StateManager(),
  keyEventController: new KeyEventController()
}
window.tetris.stateManager.start();