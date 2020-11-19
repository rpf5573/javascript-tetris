import { KeyType, KeyControl } from '../types';
import Matrix from '../matrix';

export default class R implements KeyControl {
  constructor() {  }
  keyDown = (e: KeyboardEvent) => {}
  keyUp = (e: KeyboardEvent) => {}
}