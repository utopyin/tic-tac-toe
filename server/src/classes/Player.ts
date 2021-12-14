import { WebSocket } from 'ws';
import { Position } from './case';

export interface PlayerProps {
  uuid: string;
  ws: WebSocket;
}

export default class Player {
  uuid; ws;
  constructor({uuid, ws}: PlayerProps) {
    this.uuid = uuid;
    this.ws = ws;
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

  win(turn: number) {
    this.ws.send(JSON.stringify({
      op: 'win',
      data: turn
    }))
  }

  lose(turn: number) {
    this.ws.send(JSON.stringify({
      op: 'lose',
      data: turn
    }))
  }
}