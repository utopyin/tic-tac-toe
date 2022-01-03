import Case, { Position, Symbol } from './Case';

export default class Grid {
  tableau;
  constructor(tableau : Case[] | null = null) {
    if (!tableau) {
      this.tableau = []
      for (let k = 0; k < 9; k++) {
        this.tableau.push(new Case(k))
      }
    } else {
      this.tableau = tableau
    }
  }

  isCaseEmpty(pos: Position) {
    return this.tableau[pos].value == null
  }

  duplicate():Grid {
    let tableau = [] as Case[]
    this.tableau.forEach( caseActu => {
      tableau.push(new Case(caseActu.position, caseActu.value))
    })
    return new Grid(tableau)
  }

  casesVides():Position[] {
    let vides:Position[] = []
    for (let k =0; k<9;k++) {
      if (this.tableau[k].value == undefined) vides.push(k as Position)
    }
    return vides 
  }

  updateCase(pos: Position, uuid: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isCaseEmpty(pos)) {
        this.tableau[pos].value = uuid
        resolve()
      }
      reject()
    })
  }

  isGameOver() {
   //brute force à améliorer si possible pour le rendre plus sexy
    const combinaisons: Position[][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  
    for (let k = 0; k < combinaisons.length; k++) {
      if (
        this.tableau[combinaisons[k][2]].value &&
        this.tableau[combinaisons[k][2]].value == this.tableau[combinaisons[k][1]].value &&
        this.tableau[combinaisons[k][1]].value == this.tableau[combinaisons[k][0]].value
      ) {
        return { isOver: true, draw: false }
      }
    }
    return { draw: this.casesVides().length == 0, isOver: this.casesVides().length == 0 }
  }
  
  toString() {
    let str = ""
    for (let k = 0; k++; k < 3) {
      for (let i = 0; i++; i < 3) {
        str += '|' + this.tableau[(k * 3) + i].toString()
      }
      str += '|\n'
    }
    return str.trim()
    
    //return `|${this.tableau[0]}|${this.tableau[1]}|${this.tableau[2]}|` + "\n" + `|${this.tableau[3]}|${this.tableau[4]}|${this.tableau[5]}|` + `\n` + `|${this.tableau[6]}|${this.tableau[7]}|${this.tableau[8]}|`
  }
}