import GameBoard from './GameBoard';
import Modal from './Modal';

export default class Game {
  constructor(container, boardSize) {
    this.board = new GameBoard(container, boardSize);
    this.currentPosition = null;
  }

  init() {
    this.board.drawUI();
    this.board.addCellClickListener(this.onClickMouse.bind(this));
    this.start();
  }

  onClickMouse(index) {
    if (this.currentPosition !== index) {
      this.board.miss();
      return;
    }
    this.board.changeCursor();
    this.board.removeNPC(index);
    this.board.successfulHit();
  }

  generateRandomPosition() {
    const positionIndex = Math.floor(Math.random() * this.board.cells.length);
    if (positionIndex === this.currentPosition) {
      this.generateRandomPosition();
      return;
    }
    this.board.removeNPC(this.currentPosition);
    this.currentPosition = positionIndex;
    this.board.showNPC(positionIndex);
    this.board.setCursor();
  }

  start() {
    setInterval(() => {
      this.generateRandomPosition();
    }, 1000);
  }
}
