import { RawData, WebSocket } from 'ws';
import { gameHandler } from '../server'
import { v4 as uuidV4 } from 'uuid'; 

export function onMessage(this: WebSocket, payload: RawData) {
  try {
    const { op, data } = JSON.parse(payload.toString())
    switch(op) {
      case 'host':
        gameHandler.create({
          uuid: data,
          ws: this
        })
        break;
      case 'play':
        gameHandler.get(data.uuid)?.play(data);
        break;
      case 'join':
        gameHandler.join(data.host, { uuid: data.uuid, ws: this })
        break;
      case 'hello':
        this.send(JSON.stringify({
          op: 'hello',
          data: uuidV4()
        }))
        break;
      case 'leave':
        gameHandler.playerLeft(data.uuid)
        break;
    }
  } catch(e) {
    console.log(e)
  }
}