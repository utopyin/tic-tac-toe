
from .Grille import Grille
from .Joueur import Joueur

class Jeu:
    def __init__(this) -> None:
        this.Joueurs = []
        for k in range(2) :
            this.Joueurs.append(Joueur(input("Pseudo Joueur  " + str(k) + ": "),k))
        this.count= 0
        this.index = 0
        this.grid = Grille()

    def whoPlays(this):
        return this.players[this.index]

    def nexPlayer(this):
        this.index = (this.index+1)%2

    def round(this):
        print(this.grid)
        activePlayer = this.whoplays()
        caseCosen= int(input("Veuillez choisir la case où jouer"))
        while caseCosen<0 or caseCosen>8 or not(this.grid.isCaseEmpty(caseCosen)):
            caseCosen= int(input("Veuillez choisir la case où jouer"))
        this.grid.updateCase(caseCosen,activePlayer.symbole)
        this.count += 1

    def game(this):
        while True:
            this.round()
            if this.count>=5:
                over = this.grid.isGameOver()
                if over:
                    print
                    return 
            if this.count>=9:
                print("Egalité")
                return 0
            this.nextplayer()

