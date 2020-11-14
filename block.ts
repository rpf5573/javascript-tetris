import {BlockOption, BlockType, BlockShape, YX} from './types';
class Block implements BlockOption {
  type: BlockType;
  rotateIndex: number;
  timeStamp: Date;
  shape: BlockShape;
  yx: YX;
  constructor(options: BlockOption) {
    this.type = options.type;
    this.rotateIndex = options.rotateIndex;
    this.timeStamp = options.timeStamp;
    this.shape = options.shape;
    this.yx = options.yx;
  }
  rotate = () => {
    const shape = this.shape;
  }
  fall = (n = 1) => {}
  right = () => {}
  left = () => {}
}

export {Block}