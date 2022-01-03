import { WebSocketServer, WebSocket } from 'ws';
import GameHandler from './classes/GameHandler';
import { onMessage, onClose } from './handlers'
import { v4 as uuidV4 } from 'uuid'; 

export const gameHandler = new GameHandler();
export interface ExtWebSocket extends WebSocket {
  uuid: string;
}

const PORT = process.env.PORT as unknown as number || 8080
const HOST = '0.0.0.0'
const wss = new WebSocketServer({ port: PORT, host: HOST });

wss.on('connection', (ws: ExtWebSocket) => {
  const uuid = uuidV4();
  ws.uuid = uuid;
  ws.on('message', (rawData) => onMessage(ws, rawData));
  ws.on('close', (code, reason) => onClose(ws, code, reason));
});

wss.on('close', () => console.log('Connection closing...'));

export default wss;