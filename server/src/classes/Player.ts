import { WebSocket } from 'ws';
import { Position } from './case';

export interface PlayerProps {
  uuid: string;
  name: string;
  ws: WebSocket;
}

export default class Player {
  uuid; ws; name;
  constructor({uuid, ws, name}: PlayerProps) {
    this.uuid = uuid;
    this.ws = ws;
    this.name = name;
    // const symbols: Symbol[] = ["O", "\u262b"];
  }

  update(position: Position) {
    this.ws.send(JSON.stringify({
      op: 'update',
      data: position
    }))
  }

  error(errorMessage: string) {
    this.ws.send(JSON.stringify({
      op: 'error',
      data: errorMessage
    }))
  }

  win(turn: number, forfeit: boolean = false) {
    this.ws.send(JSON.stringify({
      op: 'win',
      data: {
        turn,
        forfeit
      }
    }))
  }

  lose(turn: number) {
    this.ws.send(JSON.stringify({
      op: 'lose',
      data: turn
    }))
  }
}