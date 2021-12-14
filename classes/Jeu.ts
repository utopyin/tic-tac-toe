
const grille = require("./Grille.ts")
const joueur = require("./Joueur.ts")

class Jeu {
    Joueurs:any[];
    count:number;
    index:number;
    grid:any;

    constructor(){
        this.Joueurs = []
        for (let k=0;k<2;k++) {
            this.Joueurs.push(joueur(input("Pseudo Joueur  " + k.toString() + ": "),k))}
        this.count= 0
        this.index = 0
        this.grid = new grille()
    }
    whoPlays(){
        return this.Joueurs[this.index]
    }
    nextPlayer(){
        this.index = (this.index+1)%2
    }
    round(){
        console.log(this.grid.toString())
        let activePlayer = this.whoPlays()
        let caseCosen= parseInt(input("Veuillez choisir la case où jouer"))
        while (caseCosen<0 || caseCosen>8 || !(this.grid.isCaseEmpty(caseCosen))){
            caseCosen= parseInt(input("Veuillez choisir la case où jouer"))
        }
        this.grid.updateCase(caseCosen,activePlayer.symbole)
        this.count += 1
    }
    game(){
        while (true){
            this.round()
            if (this.count>=5){
                let over = this.grid.isGameOver()
                if (over){
                    console.log("Le joueur " + this.index + " a gagné !")
                    return 1
                }
            }
            if (this.count>=9){
                console.log("Egalité")
                return 0
            }
            this.nextPlayer()

        }
    }
}

module.exports = Jeu
