function createElement (elementType, className) {
  let element = document.createElement(elementType);
  element.classList.add(className);
  return element;
}

class Cell {
  constructor (x, y, className, callbacks, board) {
    [this.x, this.y] = [x, y];

    this._callbacks = callbacks;

    this._board = board;

    let element = createElement('td', className);
    element.setAttribute(`${Cellboard.PREFIX}-coord`, `${x}:${y}`);

    element.addEventListener('click', this._onClick.bind(this));

    this.element = element;

    this._props = {};
  }

  _onClick () {
    if (this._callbacks.onClick) {
      this._callbacks.onClick.call(this, this.x, this.y, this, this._board);
    }
  }

  paint (color) {
    this.element.style.backgroundColor = color;
    return this;
  }

  unpaint () {
    this.element.style.backgroundColor = '';
    return this;
  }

  setProp (prop, value) {
    this._props[prop] = value;
    return this;
  }

  getProp (prop) {
    return this._props[prop];
    return this;
  }


}

class Cellboard {
  constructor (element, properties) {
    this._board = {
      containerElement: element,

      size: {
        width: properties.width,
        height: properties.height,
      },

      cells: []
    };

    this._callbacks = properties.callbacks || {};

    this._createBoard();
  }

  _createBoard () {
    // create main board table
    let board = createElement('table', `${Cellboard.PREFIX}-board`);
    // create and append a row for each height
    for (let i = 0; i < this._board.size.height; i++) {
      let row = createElement('tr', `${Cellboard.PREFIX}-row`);

      // create and append a cell for each width
      for (let j = 0; j < this._board.size.width; j++) {
        let cell = new Cell(j, i, `${Cellboard.PREFIX}-cell`, this._callbacks.cell, this);
        // add cell click callback
        row.appendChild(cell.element);
        this._board.cells.push(cell);
      }
      board.appendChild(row);
    }

    this._board.board = board;
    this._board.containerElement.appendChild(board);
  }

}

Cellboard.PREFIX = 'cellboard';

Cellboard.create = (element, properties) => new Cellboard(element, properties);

module.exports = Cellboard;
