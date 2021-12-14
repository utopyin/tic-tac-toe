
Grille = require("./Grille.js")
Joueur = require("./Joueur.js")

class Jeu {
    __init__(this){
        this.Joueurs = []
        for (let k=0;k<2;k++) {
            this.Joueurs.append(Joueur(input("Pseudo Joueur  " + str(k) + ": "),k))}
        this.count= 0
        this.index = 0
        this.grid = Grille()
    }
    whoPlays(this){
        return this.Joueurs[this.index]
    }
    nextPlayer(this){
        this.index = (this.index+1)%2
    }
    round(this){
        console.log(this.grid.toString())
        activePlayer = this.whoPlays()
        let caseCosen= int(input("Veuillez choisir la case où jouer"))
        while (caseCosen<0 || caseCosen>8 || not(this.grid.isCaseEmpty(caseCosen))){
            caseCosen= int(input("Veuillez choisir la case où jouer"))
        }
        this.grid.updateCase(caseCosen,activePlayer.symbole)
        this.count += 1
    }
    game(this){
        while (true){
            this.round()
            if (this.count>=5){
                over = this.grid.isGameOver()
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

module.export = Jeu
