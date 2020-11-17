import { KeyType, KeyControl } from '../types';
import Matrix from '../matrix';

export default class R implements KeyControl {
  matrix: Matrix;
  constructor(matrix: Matrix) { this.matrix = matrix; }
  keyDown = (e: KeyboardEvent) => {}
  keyUp = (e: KeyboardEvent) => {}
}