export default class Case {
  position; value;
  constructor(pos: number, value: Symbole = null) {
      this.position = pos
      this.value = value
  }

  toString() {
      return this.value || " "
  }
}

export type Position = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type Symbole = null | "O" | "\u262b"