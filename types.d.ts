import {Block} from './block';
export type Shape = Array<Array<number>>
export type Dyx = Array<Array<number>>
export type BlockShape = { I: Shape, L: Shape, J: Shape, Z: Shape, S: Shape, O: Shape, T: Shape }
export type YXRotateOrigin = { I: Dyx, L: Dyx, J: Dyx, Z: Dyx, S: Dyx, O: Dyx, T: Dyx }
export type FillLine = number[]
export type BlankLine = number[]
export type Matrix = BlankLine[]
export type BlockType = 'I' | 'L' | 'J' | 'Z' | 'S' | 'O' | 'T'
export type YX = [number, number]
export interface BlockOption {
  type: BlockType;
  rotateIndex: number;
  timeStamp: Date;
  shape: BlockShape;
  yx: YX;
}
export type GameStates = {
  currentBlock: Block | null,
  matrix: Matrix,
  speed: number,
  point: number,
  lock: boolean
}