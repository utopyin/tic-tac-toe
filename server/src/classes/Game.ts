import { moveData } from '../handlers/types';
import Grid from './Grid'
import Player, { PlayerProps } from './Player'

export default class Game {
  host; challenger; index; grid; turn;isOver:boolean;
  constructor(host: PlayerProps, challenger: PlayerProps | null = null) {
    this.host = new Player(host);
    this.challenger = challenger ? new Player(challenger) : null;
    this.index = 0;
    this.turn = 0;
    this.grid = new Grid();
    this.isOver = false
  }

  join(challenger: PlayerProps) {
    return new Promise<void>((resolve, reject) => {
      if (this.challenger) return reject('The game is full.');
      if (challenger.uuid == this.host.uuid) return reject('You can not join a game you host.');
      this.challenger = new Player(challenger);

      this.host.ws.send(JSON.stringify({
        op: 'join',
        data: challenger.name
      }))
      challenger.ws.send(JSON.stringify({
        op: 'join',
        data: this.host.name
      }))

      resolve()
    })
    
  }

  whoPlays() {
    return this.index == 0 ? this.host : this.challenger;
  }

  whoWaits() {
    return this.index == 0 ? this.challenger : this.host;
  }

  nextPlayer() {
    this.index = (this.index + 1) % 2
    this.turn++
  }

  play(data: moveData) {
    const { uuid, position } = data
    const player = this.getPlayer(uuid);
    if (player) {
      if (this.isOver) return player.error("You can't play, the game is over !")
      if (!this.challenger) return player.error('The game has not started yet!')

      const activePlayer = this.whoPlays()
      if (activePlayer?.uuid == uuid) {
        this.grid.updateCase(position, uuid)
          .then(() => {
            this.host.update(position);
            this.challenger?.update(position);
            !this.isGameOver() && this.nextPlayer();
          })
          .catch(() => player.error('This case is not empty.'))
        return 
      }
      return player.error('Your opponent has not played yet!')
    }
  }

  isGameOver() {
    if (this.turn < 4 || !this.grid.isGameOver()) return false
    
    this.isOver = true
    this.whoPlays()?.win(this.turn);
    this.whoWaits()?.lose(this.turn);
    return true
  }

  getPlayer(uuid: string) {
    return uuid == this.host.uuid ? this.host : uuid == this.challenger?.uuid ? this.challenger : null
  }

  leave(uuid: string) {
    if (!this.challenger) return true; // if the game isn't full yet, return true => destroy the game and the player index in handler
    if (uuid == this.host.uuid) { // if player == host
      this.challenger.win(this.turn, true) // challenger wins by forfeit
      this.isOver = true // game's over
      this.host = this.challenger // host becomes challenger
    } else if (uuid == this.challenger.uuid) {
      this.host.win(this.turn, true)  // host wins by forfeit
      this.isOver = true // game's over
      this.challenger = null // challenger left
    }
    return false // the game isn't destroyed
  }
  
}