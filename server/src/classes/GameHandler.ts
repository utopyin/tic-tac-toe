import Game from "./Game"
import { PlayerProps } from "./Player";

interface indexes {
  [key: string]: number
} 

export default class GameHandler {
  games: Game[]; players: indexes;
  constructor() {
    this.games = []
    this.players = {}
  }

  get(uuid: string): Game | null {
    return this.players[uuid] != undefined ? this.games[this.players[uuid]] : null;
  }


  
  create(host: PlayerProps, challenger: PlayerProps | null = null): void {
    if (this.players[host.uuid] != undefined) {
      host.ws.send(JSON.stringify({
        op: 'error',
        data: 'You can not join a game as you are already playing or hosting one.'
      }))
    }
    const newGame = new Game(host, challenger);
    const length = this.games.push(newGame);
    this.players[host.uuid] = length - 1
    if (challenger) this.players[challenger.uuid] = length - 1
  }

  join(hostUUID: string, challenger: PlayerProps) {
    const game = this.get(hostUUID);
    if (!game) {
      return challenger.ws.send(JSON.stringify({
        op: 'error',
        data: 'The game was not found.'
      }));
    }

    this.players[challenger.uuid] = this.players[hostUUID];
    game.join(challenger, (errorMessage) => {
      challenger.ws.send(JSON.stringify({
        op: 'error',
        data: errorMessage
      }))
    });
  }

  playerLeft(uuid:string) {
    const game =this.get(uuid)
    if (game){
      let needDestroy = game.playerLeft(uuid)
      if (needDestroy) {
        delete this.games[this.players[uuid]]
      }
      delete this.players[uuid]
    }
  }
}