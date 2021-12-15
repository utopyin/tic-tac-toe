import Game from "./Game"
import { PlayerProps } from "./Player";
import { v4 as  uuidV4 } from 'uuid'

interface Indexes {
  [key: string]: string
}

interface Rooms {
  [key: string]: Game
}

export default class GameHandler {
  players: Indexes; rooms: Rooms;
  constructor() {
    this.players = {}
    this.rooms = {}
  }
  
  create(host: PlayerProps): void {
    if (this.players[host.uuid] != undefined) {
      host.ws.send(JSON.stringify({
        op: 'error',
        data: 'You can not join a game as you are already playing or hosting one.'
      }))
    }
    const roomUuid = uuidV4()
    this.rooms[roomUuid] = new Game(host);
    this.players[host.uuid] = roomUuid
  }

  join(roomUUID: string, challenger: PlayerProps) {
    const game = this.getGame(roomUUID);
    if (!game) {
      return challenger.ws.send(JSON.stringify({
        op: 'error',
        data: 'The game was not found.'
      }));
    }

    game.join(challenger).then(() => {
      this.players[challenger.uuid] = roomUUID
    }).catch(message => {
      challenger.ws.send(JSON.stringify({
        op: 'error',
        data: message
      }))
    });
  }

  getRoom(uuid: string) {
    return this.players[uuid] != undefined ? this.players[uuid] : null
  }

  getGame(roomUUID: string) {
    return this.rooms[roomUUID] != undefined ? this.rooms[roomUUID] : null;
  }

  getGameByPlayer(uuid: string) {
    const roomUUID = this.getRoom(uuid);
    return roomUUID ? this.getGame(roomUUID) : null;
  }

  leave(uuid: string) {
    const roomUUID = this.getRoom(uuid);
    if (roomUUID) {
      const game = this.getGame(roomUUID);
      if (game) {
        let needDestroy = game.leave(uuid)
        if (needDestroy) {
          delete this.rooms[roomUUID]
        }
        delete this.players[uuid]
      }
    }
  }
}