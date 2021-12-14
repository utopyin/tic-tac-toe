import { Position } from './Case';
import Grille from './Grille'
import Joueur from './Joueur'

class Jeu {
  players; count; index; grid;
  constructor() {
    this.players = [];
    this.players.push(new Joueur('Joueur 1', 0));
    this.players.push(new Joueur('Joueur 2', 1));
    this.count = 0;
    this.index = 0;
    this.grid = new Grille();
  }
  whoPlays() {
    return this.players[this.index]
  }
  nextPlayer() {
    this.index = (this.index + 1) % 2
  }
  round(){
    console.log(this.grid.toString())
    const activePlayer = this.whoPlays()
    let caseChosen: Position = Math.floor(Math.random() * 9) as Position
    while (caseChosen < 0 || caseChosen > 8 || !this.grid.isCaseEmpty(caseChosen)) {
        caseChosen = Math.floor(Math.random() * 9) as Position
    }
    this.grid.updateCase(caseChosen, activePlayer.symbole)
    this.count += 1
  }
  play() {
    while (true) {
      this.round()
      if (this.count >= 5) {
        if (this.grid.isGameOver()) {
          console.log(`Le joueur ${this.players[this.index].nom} a gagné !`)
          return true
        }
      }
      if (this.count >= 9) {
        console.log("Egalité")
        return false
      }
      this.nextPlayer()
    }
  }
}