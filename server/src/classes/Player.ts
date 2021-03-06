import { WebSocket } from 'ws';
import { Position } from './Case_';

export interface PlayerProps {
  uuid: string;
  name: string;
  ws: WebSocket | null;
}

export interface Options {
  ai : 1 | 2 | 3 ; 
}

export default class Player {
  uuid; ws; name;
  constructor({uuid, ws, name}: PlayerProps) {
    this.uuid = uuid;
    this.ws = ws;
    this.name = name || 'Player';
    // const symbols: Symbol[] = ["O", "\u262b"];
  }

  start(isStarting: boolean) {
    this.ws?.send(JSON.stringify({
      op: 'start',
      data: {
        isStarting
      }
    }))
  }

  draw() {
    this.ws?.send(JSON.stringify({
      op: 'draw'
    }))
  }

  update(position: Position, state: 'challenger' | 'host') {
    this.ws?.send(JSON.stringify({
      op: 'update',
      data: {
        position,
        state
      }
    }))
  }

  error(message: string, title?: string) {
    this.ws?.send(JSON.stringify({
      op: 'error',
      data: {
        title,
        message
      }
    }))
  }

  win(turn: number, forfeit: boolean = false) {
    this.ws?.send(JSON.stringify({
      op: 'win',
      data: {
        turn,
        forfeit
      }
    }))
  }

  lose(turn: number, forfeit: boolean = false) {
    this.ws?.send(JSON.stringify({
      op: 'lose',
      data: {
        turn,
        forfeit
      }
    }))
  }

  leave(uuid: string) {
    this.ws?.send(JSON.stringify({
      op: 'leave',
      data: {
        who: uuid == this.uuid ? 'you' : 'them'
      }
    }))
  }

  rematch() {
    this.ws?.send(JSON.stringify({
      op: 'rematch'
    }))
  }
}