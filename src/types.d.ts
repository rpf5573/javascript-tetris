import Block from './block';

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
  rotateIndex: number;
  timeStamp: number;
  yx: YX;
}
export type GameState = {
  currentBlock: Block | null,
  matrixState: MatrixState,
  speed: number,
  point: number,
  lock: boolean
}
declare global {
  interface Window {
    gameState: GameState;
  }
}

export type KeyType = 'up' | 'right' | 'down' | 'left' | 'space' | 'r' | 'p'