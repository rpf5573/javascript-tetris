import { blockShapes } from './const';
import {BlockOption, BlockType, Shape, YX} from './types';
class Block implements BlockOption {
  type: BlockType;
  shape: Shape;
  rotateIndex: number;
  timeStamp: number;
  yx: YX;
  constructor(options: BlockOption) {
    this.type = options.type;
    this.shape = blockShapes[this.type]
    this.rotateIndex = options.rotateIndex;
    this.timeStamp = options.timeStamp;
    this.yx = options.yx;
  }
  rotate = () => {
    const shape = this.shape;
  }
  fall = (n = 1) => {}
  right = () => {}
  left = () => {}
}

export default Block