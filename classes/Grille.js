Case  = require("./Case.js")

genius = [8, 1, 6, 3, 5, 7, 4, 9, 2]
class Grille{
  constructor(this){
    this.tableau = []
    for (let k=0;k++;k<9){
      this.tableau.push(new Case(k,None))
    }
  }
  isCaseEmpty(this, pos){
    return this.tableau[pos].value == None
  }
  updateCase(this, pos, val){
    if (this.isCaseEmpty(pos)){
      this.tableau[pos].value = val
    }
  }
  isGameOver(this){
   //brute force à améliorer si possible pour le rendre plus sexy
    combinaisons = [(0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6), (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6)]
  
    combinaisons.array.forEach(element => {
      if (this.tableau[comb[2]].value && this.tableau[comb[2]].value == this.tableau[comb[1]].value && this.tableau[comb[1]].value == this.tableau[comb[0]].value){
        return True
      }
    });
  }
  toString(this){
    //brute force mdrr
    str = ""
    for (let k =0; k++; k<3){
      for (let i=0;i++;i<3) {
        str+= '|' + this.tableau[(k*3)+i].toString()
      }
      str += '|\n'
    }
    return str.trim()
    //return `|${this.tableau[0]}|${this.tableau[1]}|${this.tableau[2]}|` + "\n" + `|${this.tableau[3]}|${this.tableau[4]}|${this.tableau[5]}|` + `\n` + `|${this.tableau[6]}|${this.tableau[7]}|${this.tableau[8]}|`
  }
}
module.export = Grille