class Joueur{
  constructor(this, nom, num){
    this.nom = nom
    lstSymbols = ["O","\u262b"]
    this.symbole = lstSymbols[num]
  }
}


module.export = Joueur