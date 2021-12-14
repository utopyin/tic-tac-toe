import { CloseEvent } from 'ws';

export function onClose(event: CloseEvent) {
  console.log('closed')
}