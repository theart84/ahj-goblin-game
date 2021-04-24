import GameBoard from './GameBoard';
import Character from './Character';
import Modal from './Modal';

export default class Game {
  constructor(container, boardSize) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Передайте HTML элемент!');
    }
    if (!Number.isInteger(boardSize)) {
      throw new Error('Необходимо передать число!');
    }
    this.board = new GameBoard(container, boardSize);
    this.modal = new Modal(container);
    this.npc = new Character('goblin', 4);
    this.successfulHit = null;
    this.missHit = null;
  }

  init() {
    this.board.drawUI();
    this.board.addCellClickListener(this.onClickMouse.bind(this));
    this.board.renderNPC(this.npc.position);
    this.start();
  }

  onClickMouse(index) {
    if (++this.successfulHit === 10) {
      this.modal.showModal('Поздравляем, Вы победили!');
      this.successfulHit = 0;
      this.board.resetScore();
      return;
    }
    if (this.npc.position !== index) {
      if (++this.missHit === 5) {
        this.modal.showModal('Печаль, беда, Вы проиграли ;-(');
        this.missHit = 0;
        this.board.resetScore();
        return;
      }
      this.board.miss();
      return;
    }
    this.board.changeCursor();
    this.board.removeNPC(index);
    this.board.successfulHit();
  }

  generateRandomPosition() {
    const positionIndex = Math.floor(Math.random() * this.board.cells.length);
    if (positionIndex === this.npc.position) {
      this.generateRandomPosition();
      return;
    }
    this.board.removeNPC(this.npc.position);
    this.npc.position = positionIndex;
    this.board.renderNPC(this.npc.position);
    this.board.setCursor();
  }

  start() {
    setInterval(() => {
      this.generateRandomPosition();
    }, 1000);
  }
}
