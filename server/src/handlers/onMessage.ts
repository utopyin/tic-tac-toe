import { RawData, WebSocket } from 'ws';
import { gameHandler } from '../server'
import { v4 as uuidV4 } from 'uuid'; 

export function onMessage(this: WebSocket, payload: RawData) {
  try {
    const { op, data } = JSON.parse(payload.toString())
    switch(op) {
      case 'host':
        gameHandler.create({
          uuid: data.uuid,
          name: data.name,
          ws: this,
        })
        break;
      case 'play':
        gameHandler.getGameByPlayer(data.uuid)?.play(data);
        break;
      case 'join':
        gameHandler.join(data.room, { uuid: data.uuid, ws: this, name: data.name })
        break;
      case 'hello':
        this.send(JSON.stringify({
          op: 'hello',
          data: uuidV4()
        }))
        break;
      case 'leave':
        gameHandler.leave(data.uuid)
        break;
    }
  } catch(e) {
    console.log(e)
  }
}