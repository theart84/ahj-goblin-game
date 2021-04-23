export default class Character {
  constructor(name, boarSize) {
    this.name = name;
    this._position = Math.floor(Math.random() * boarSize ** 2);
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
  }
}
