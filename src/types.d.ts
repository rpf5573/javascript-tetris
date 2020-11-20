import Block from './block';
import Keyboard from './keyboard';
import KeyEventController from './keyEventController';
import Matrix from './matrix';
import StateManager from './stateManager';


export namespace Tetris {
  export type Shape = Array<Array<number>>
  export type Dyx = Array<Array<number>>
  export type BlockShapes = { I: Shape, L: Shape, J: Shape, Z: Shape, S: Shape, O: Shape, T: Shape }
  export type YXRotateOrigin = { I: Dyx, L: Dyx, J: Dyx, Z: Dyx, S: Dyx, O: Dyx, T: Dyx }
  export type FillLine = number[]
  export type Line = number[]
  export type MatrixState = Line[]
  export type BlockType = 'I' | 'L' | 'J' | 'Z' | 'S' | 'O' | 'T'
  export type YX = [number, number]
  export interface BlockOption {
    type: BlockType;
    shape: Shape,
    rotateIndex: number;
    timeStamp: number;
    yx: YX;
  }
  export type Store = {
    states: {
      currentBlock: Block | null,
      matrixState: MatrixState,
      speed: number,
      point: number,
      lock: boolean
    },
    matrix: Matrix,
    keyboard: Keyboard,
    stateManager: StateManager,
    keyEventController: KeyEventController 
  }
  export interface KeyControl {
    keyDown: (e: KeyboardEvent) => void
    keyUp: (e: KeyboardEvent) => void
  }
  export type KeyCallback = {
    keyType: KeyType,
    callback?: () => void
  }
  export interface KeyTimer {
    [keyType: string]: NodeJS.Timeout,
  }
  export type KeyType = 'arrowUp' | 'arrowRight' | 'arrowDown' | 'arrowLeft' | 'space' | 'r' | 'p'
}

declare global {
  interface Window {
    tetris: Tetris.Store
  }
}