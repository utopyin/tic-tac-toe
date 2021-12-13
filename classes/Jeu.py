from typing import List


class Jeu:
    def __init__(this, players:List, grid) -> None:
        this.players = players
        this.count= 0
        this.index = 0
        this.grid = grid

    def whoplays(this):
        return this.players[this.index]

    def nextplayer(this) :
        this.index = (this.index+1)%2

    def round(this) :
        print(this.grid)
        activeplayer = this.whoplays()
        casechosen= int(input("Veuillez choisir la case où jouer"))
        while casechosen<0 or casechosen>8 or not(this.grid.isCaseEmpty(casechosen)) :
            casechosen= int(input("Veuillez choisir la case où jouer"))
        this.grid.updateCase(casechosen,activeplayer.symbole)
        this.count += 1

    def game(this) :
        while True :
            this.round()
            if this.count>=5 :
                over = this.grid.isGameOver()
                if over :
                    print
                    return 
            if this.count>=9:
                print("Egalité")
                return 0
            this.nextplayer()

