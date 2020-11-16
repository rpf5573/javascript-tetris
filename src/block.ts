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
  fall = (n = 1): Block => {
    return new Block({
      type: this.type,
      yx: [this.yx[0] + n, this.yx[1]],
      rotateIndex: this.rotateIndex,
      timeStamp: Date.now()
    });
  }
  right = () => {}
  left = () => {}
}

export default Block