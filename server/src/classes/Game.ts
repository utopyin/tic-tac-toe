import { moveData } from '../handlers/types';
import Grid from './Grid'
import Player, { PlayerProps } from './Player'

export default class Game {
  host; challenger; index; grid; turn;
  constructor(host: PlayerProps, challenger: PlayerProps | null = null) {
    this.host = new Player(host);
    this.challenger = challenger ? new Player(challenger) : null;
    this.index = 0;
    this.turn = 0;
    this.grid = new Grid();
  }

  join(challenger: PlayerProps, error: (message: string) => void) {
    if (this.challenger) return error('The game is full.');
    if (challenger.uuid == this.host.uuid) return error('You can not join a game you host.');
    this.challenger = new Player(challenger);
    challenger.ws.send(JSON.stringify({
      op: 'join',
      data: 'You just joined a game.'
    }))
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
    
    this.whoPlays()?.win(this.turn);
    this.whoWaits()?.lose(this.turn);
    return true
  }

  getPlayer(uuid: string) {
    return uuid == this.host.uuid ? this.host : uuid == this.challenger?.uuid ? this.challenger : null
  }
}