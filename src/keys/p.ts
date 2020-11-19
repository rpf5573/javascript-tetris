import { KeyType, KeyControl } from '../types';
import Matrix from '../matrix';

export default class P implements KeyControl {
  constructor() { }
  keyDown = (e: KeyboardEvent) => {}
  keyUp = (e: KeyboardEvent) => {}
}