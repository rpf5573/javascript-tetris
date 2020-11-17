import { KeyType, KeyControl } from '../types';

export default class P implements KeyControl {
  constructor() {}
  keyDown = (e: KeyboardEvent) => {}
  keyUp = (e: KeyboardEvent) => {}
}