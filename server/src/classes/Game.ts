import AI from '../AIs/AI';
import EasyAI from '../AIs/easy';
import HardAI from '../AIs/hard';
import MediumAI from '../AIs/medium';
import { moveData } from '../handlers/types';
import Grid from './Grid'
import Player, { PlayerProps } from './Player'

export default class Game {
  host; challenger; index; grid; turn; isOver; isRematch; rematcher; resets;
  constructor(host: PlayerProps, challenger: PlayerProps | null = null) {
    this.host = new Player(host);
    this.challenger = challenger ? new Player(challenger) : null;
    this.index = 0;
    this.turn = 0;
    this.resets = 0;
    this.grid = new Grid();
    this.isOver = false;
    this.isRematch = false;
    this.rematcher = '';
  }

  join(challenger: PlayerProps) {
    return new Promise<void>((resolve, reject) => {
      if (this.challenger) return reject('The game is full.');
      if (challenger.uuid == this.host.uuid) return reject('You can not join a game you host.');
      this.challenger = new Player(challenger);

      this.isOver = false;

      this.host.ws?.send(JSON.stringify({
        op: 'join',
        data: {
          opponent: {
            name: challenger.name
          }
        }
      }))

      challenger.ws?.send(JSON.stringify({
        op: 'join',
        data: {
          opponent: {
            name: this.host.name
          }
        }
      }))
      
      this.start();
      resolve()
    })
  }

  whoPlays() {
    return (this.index + this.resets) % 2 == 0 ? this.host : this.challenger;
  }

  whoWaits() {
    return (this.index + this.resets) % 2 == 0 ? this.challenger : this.host;
  }

  nextPlayer(): boolean {
    this.index = (this.index + 1) % 2
    this.turn++
    return true
  }

  draw() {
    this.isOver = true;
    this.host?.draw();
    this.challenger?.draw();
  }

  play(data: moveData) {
    const { uuid, position } = data
    const player = this.getPlayer(uuid);
    const type = this.host.uuid == player?.uuid ? 'host' : 'challenger';
    if (player) {
      if (this.isOver) return player.error("You can't play, the game is over !")
      if (!this.challenger) return player.error('The game has not started yet!')
      const activePlayer = this.whoPlays()
      if (activePlayer?.uuid == uuid) {
        this.grid.updateCase(position, uuid)
          .then(() => {
            this.host.update(position, type);
            this.challenger?.update(position, type);
            !this.isGameOver() && this.nextPlayer();
          })
          .catch(() => player.error('This case is not empty.'))
        return 
      }
      return player.error('Your opponent has not played yet!')
    }
  }

  isGameOver() {
    const { draw, isOver } = this.grid.isGameOver();
    if (this.turn < 4 || !isOver) return false
    if (draw) {
      this.draw();
      return true
    }
    this.isOver = true
    this.whoPlays()?.win(this.turn);
    this.whoWaits()?.lose(this.turn);
    return true
  }

  getPlayer(uuid: string) {
    return uuid == this.host.uuid ? this.host : uuid == this.challenger?.uuid ? this.challenger : null
  }

  leave(uuid: string) {
    if (!this.challenger) {
      this.host.leave(uuid);
      return true;
    }
    if (uuid == this.host.uuid) {
      this.host.leave(uuid);
      if (!this.isOver) {
        this.challenger.win(this.turn, true)
        this.isOver = true
      }
      this.host = this.challenger
      this.challenger = null
    } else if (uuid == this.challenger.uuid) {
      this.challenger.leave(uuid);
      if (!this.isOver) {
        this.host.win(this.turn, true)
        this.isOver = true
      }
      this.challenger = null
    }
    return false
  }

  reset(isRematch?: boolean) {
    this.index = 0;
    this.turn = 0;
    this.grid = new Grid();
    this.isOver = false;
    this.isRematch = false;
    this.rematcher = '';
    this.resets += 1;
    if (isRematch) {
      this.host.rematch();
      this.challenger?.rematch();
      this.start();
    }
  }

  rematch(uuid: string) {
    if (this instanceof GameIA) {
      this.reset(true);
      if (
        this.whoPlays() instanceof EasyAI ||
        this.whoPlays() instanceof MediumAI ||
        this.whoPlays() instanceof HardAI
      ) this.playIA();
      return
    }
    if (this.isRematch && this.rematcher != uuid) return this.reset(true);
    this.rematcher = uuid;
    this.isRematch = true;
  }
  
  start() {
    this.whoPlays()?.start(true);
    this.whoWaits()?.start(false);
  }
}

export class GameIA extends Game {
  challenger: EasyAI | MediumAI | HardAI;
  constructor(host: PlayerProps, IA: EasyAI | MediumAI | HardAI) {
    super(host)
    this.challenger = IA
    this.host.ws?.send(JSON.stringify({
      op: 'join',
      data: {
        opponent: {
          name: IA.name
        }
      }
    }))
    this.host.ws?.send(JSON.stringify({
      op: 'start',
      data: {
        isStarting: true
      }
    }))
  }

  playIA() {
    const posIA = this.challenger.play(this.grid,this.turn)
      console.log("Case choisie par l'IA : "+ posIA)
      this.grid.updateCase(posIA, this.challenger.uuid)
        .then(() => {
          this.host.update(posIA, 'challenger');
          !this.isGameOver() && this.nextPlayer();
        })
        .catch((e) => console.log("ErrorIA : " + e))
  }

  play(data: moveData) {
    const { uuid, position } = data
    const player = this.getPlayer(uuid);
    const type = this.host.uuid == player?.uuid ? 'host' : 'challenger';
    if (player) {
      if (this.isOver) return player.error("You can't play, the game is over !")
      const activePlayer = this.whoPlays()
      if (activePlayer?.uuid == uuid) {
        this.grid.updateCase(position, uuid)
          .then(() => {
            this.host.update(position, type);
            !this.isGameOver() && this.nextPlayer() && this.playIA();
          })
          .catch(() => player.error('This case is not empty.'))
        return 
      }
      return player.error('Your opponent has not played yet!')
    }
  }
}