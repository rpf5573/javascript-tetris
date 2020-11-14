import { GameStates } from "./types";
import Block from './block';
import { blankMatrix } from "./const";

const gameStates: GameStates = {
  currentBlock: null,
  matrix: blankMatrix,
  point: 0,
  speed: 0,
  lock: false
}

export { gameStates }