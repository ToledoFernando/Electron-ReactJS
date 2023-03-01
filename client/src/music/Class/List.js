class Nodo {
  constructor(value) {
    this.prevoius = null;
    this.value = value;
    this.next = null;
  }
}

export class List {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    value.id = this.length + 1;
    const nodo = new Nodo(value);
    if (!this.head) {
      this.head = nodo;
      return this.length++;
    }
    this._push(this.head, nodo);
  }

  _push(current, value) {
    if (!current.next) {
      current.next = value;
      value.prevoius = current;
      return this.length++;
    }
    this._push(current.next, value);
  }
}
