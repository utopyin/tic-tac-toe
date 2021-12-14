
from .Grille import Grille
from .Joueur import Joueur

class Jeu:
    def __init__(this) -> None:
        this.Joueurs = []
        this.Joueurs.append(Joueur(input("Pseudo Joueur n°1 : "), 0))
        this.Joueurs.append(Joueur(input("Pseudo Joueur n°2 : "), 1))
        this.count = 0
        this.index = 0
        this.grid = Grille()

    def whoPlays(this):
        return this.Joueurs[this.index]

    def nextPlayer(this):
        this.index = (this.index + 1) % 2

    def round(this):
        print(this.grid)
        activePlayer = this.whoPlays()
        caseChosen= int(input("Veuillez choisir la case où jouer : "))
        while caseChosen<0 or caseChosen>8 or not(this.grid.isCaseEmpty(caseChosen)):
            caseChosen = int(input("Veuillez choisir la case où jouer : "))
        this.grid.updateCase(caseChosen, activePlayer.symbole)
        this.count += 1

    def game(this):
        while True:
            this.round()
            if this.count>=5:
                over = this.grid.isGameOver()
                if over:
                    print("Le joueur " + str(this.Joueurs[this.index].nom) + " a gagné !")
                    return 1
            if this.count>=9:
                print("Egalité")
                return 0
            this.nextPlayer()

