import { ExtWebSocket, gameHandler } from '../server'

export function onClose(socket: ExtWebSocket, code: number, reason: Buffer) {
  gameHandler.leave(socket.uuid);
}