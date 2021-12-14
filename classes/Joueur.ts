class Joueur{
  nom:string;
  symbole:string;
  constructor(nom:string, num:number){
    this.nom = nom
    const lstSymbols = ["O","\u262b"]
    this.symbole = lstSymbols[num]
  }
}


module.exports = Joueur