const cases  = require("./Case.ts")

const genius = [8, 1, 6, 3, 5, 7, 4, 9, 2]
class Grille{
  tableau : any[]
  constructor(){
    this.tableau = []
    for (let k=0;k++;k<9){
      this.tableau.push(new cases(k,null))
    }
  }
  isCaseEmpty(pos:number):boolean{
    return this.tableau[pos].value == null
  }
  updateCase(pos:number, val:string):void{
    if (this.isCaseEmpty(pos)){
      this.tableau[pos].value = val
    }
  }
  isGameOver(){
    const combinaisons = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  
    combinaisons.forEach(comb => {
      if (this.tableau[comb[2]].value == this.tableau[comb[1]].value && this.tableau[comb[1]].value == this.tableau[comb[0]].value){
        return true
      }
    });
  }
  toString(){
    let str = ""
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
module.exports = Grille