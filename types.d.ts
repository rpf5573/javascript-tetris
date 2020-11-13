import {Block} from './block';
type Shape = Array<Array<number>>
type Dyx = Array<Array<number>>
type BlockShape = { I: Shape, L: Shape, J: Shape, Z: Shape, S: Shape, O: Shape, T: Shape }
type YXRotateOrigin = { I: Dyx, L: Dyx, J: Dyx, Z: Dyx, S: Dyx, O: Dyx, T: Dyx }
type FillLine = number[]
type BlankLine = number[]
type Matrix = BlankLine[]
type BlockType = 'I' | 'L' | 'J' | 'Z' | 'S' | 'O' | 'T'
type YX = [number, number]
interface BlockOption {
  type: BlockType;
  rotateIndex: number;
  timeStamp: Date;
  shape: BlockShape;
  yx: YX;
}
type GameStates = {
  currentBlock: Block | null,
  matrix: Matrix,
  speed: number,
  point: number,
  lock: boolean
}