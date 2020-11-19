import './style.scss';
import Keyboard from './keyboard';
import { width, height, blankMatrix, blockShapes, blockTypes } from './const';
import Matrix from './matrix';
import Block from './block';
import { getNextBlock, resize } from './utils';
import StateManager from './stateManager';

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
  stateManager: new StateManager()
}
window.tetris.stateManager.start();