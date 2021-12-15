export default class Client {
  conn;
  constructor(
    conn?: WebSocket
  ) {
    this.conn = conn;
  }

  hello() {
    this.conn?.send(JSON.stringify({
      op: 'hello'
    }))
  }

  join() {
    
  }
}