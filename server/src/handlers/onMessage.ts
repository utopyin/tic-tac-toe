import { RawData } from 'ws';
import { gameHandler, ExtWebSocket } from '../server'

export function onMessage(socket: ExtWebSocket, payload: RawData) {
  try {
    const { op, data } = JSON.parse(payload.toString())
    switch(op) {
      case 'host':
        gameHandler.create({
          uuid: data.uuid,
          name: data.name,
          ws: socket,
        }, data.options)
        break;
      case 'play':
        gameHandler.getGameByPlayer(data.uuid)?.play(data);
        break;
      case 'join':
        gameHandler.join(data.room, {
          uuid: data.uuid,
          ws: socket,
          name: data.name
        })
        break;
      case 'hello':
        socket.send(JSON.stringify({
          op: 'hello',
          data: {
            uuid: socket.uuid
          }
        }))
        break;
      case 'leave':
        gameHandler.leave(data.uuid)
        break;
      case 'rooms':
        socket.send(JSON.stringify({
          op: 'rooms',
          data: {
            rooms: gameHandler.getRooms()
          }
        }))
        break;
    }
  } catch(e) {
    console.log(e)
  }
}