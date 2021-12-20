import Game, { GameIA } from "./Game"
import { PlayerProps, Options } from "./Player";
import WSS from '../server'
import { v4 as uuidV4 } from 'uuid';

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
  
  create(host: PlayerProps, options : Options | null = null): void {
    if (this.players[host.uuid] != undefined) {
      host.ws.send(JSON.stringify({
        op: 'error',
        data: {
          title: "You can't host a game",
          message: 'You can not host a game as you are already playing or hosting one.'
        }
      }))
    }
    const roomUuid = uuidV4();
    this.rooms[roomUuid] = options?.ai ? new Game(host) : new GameIA(host, );
    this.players[host.uuid] = roomUuid;
    
    host.ws.send(JSON.stringify({
      op: 'host'
    }));
    
    this.sendRooms();
  }

  join(roomUUID: string, challenger: PlayerProps) {
    const game = this.getGame(roomUUID);
    if (!game) {
      return challenger.ws.send(JSON.stringify({
        op: 'error',
        data: {
          title: "You can't join this game",
          message: 'The game was not found.'
        }
      }));
    }

    game.join(challenger).then(() => {
      this.players[challenger.uuid] = roomUUID
    }).catch(message => {
      challenger.ws.send(JSON.stringify({
        op: 'error',
        data: {
          title: "You can't join this room",
          message
        }
      }))
    });

    this.sendRooms()
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
      }
    }
    delete this.players[uuid]
    this.sendRooms();
  }

  getRooms() {
    return Object.entries(this.rooms).map(([roomUUID, game]) => {
      return {
        uuid: roomUUID,
        name: game.host.name,
        players: (game.host ? 1 : 0) + (game.challenger ? 1 : 0)
      }
    });
  }

  sendRooms() {
    WSS.clients.forEach(client => {
      client.send(JSON.stringify({
        op: 'rooms',
        data: {
          rooms: this.getRooms()
        }
      }))
    })
  }
}