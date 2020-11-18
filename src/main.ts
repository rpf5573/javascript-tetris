import './style.scss';
import Keyboard from './keyboard';
import { width, height, blankMatrix, blockShapes, blockTypes } from './const';
import Matrix from './matrix';
import Block from './block';
import { getNextBlock, resize } from './utils';
import StateManager from './stateManager';

resize();
window.addEventListener('resize', resize);

const matrix = new Matrix();
const keyboard = new Keyboard(matrix);
StateManager.start(matrix);