import { KeyType, KeyControl } from '../types';

export default class R implements KeyControl {
  constructor() {}
  keyDown = (e: KeyboardEvent) => {}
  keyUp = (e: KeyboardEvent) => {}
}