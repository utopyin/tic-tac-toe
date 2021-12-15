import { WebSocketServer } from 'ws';
import GameHandler from './classes/GameHandler';
import { onMessage, onClose } from './handlers'

export const gameHandler = new GameHandler();

new WebSocketServer({ port: 8080 })
  .on('connection', (ws) => {
    console.log('connected!')
    ws.on('message', onMessage);
    ws.onclose = onClose
  })
  .on('close', () => console.log('Connection closing...'));