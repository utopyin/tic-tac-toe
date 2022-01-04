type Position = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export default class Client {
  conn; uuid; name;
  constructor(
    conn?: WebSocket
  ) {
    const name = localStorage.getItem('@name');
    this.conn = conn;
    this.uuid = '';
    this.name = name || '';
  }

  ping() {
    this.conn?.send(JSON.stringify({
      op: 'ping'
    }))
  }

  setUuid(uuid: string) {
    this.uuid = uuid;
  }

  getRooms() {
    this.conn?.send(JSON.stringify({
      op: 'rooms'
    }))
  }

  hello() {
    this.conn?.send(JSON.stringify({
      op: 'hello'
    }));
  }

  play(position: Position) {
    if (this.uuid) {
      this.conn?.send(JSON.stringify({
        op: 'play',
        data: {
          uuid: this.uuid,
          position
        }
      }));
    }
  }

  leave() {
    if (this.uuid) {
      this.conn?.send(JSON.stringify({
        op: 'leave',
        data: {
          uuid: this.uuid,
        }
      }));
    }
  }

  join(room: string = 'default') {
    if (this.uuid) {
      this.conn?.send(JSON.stringify({
        op: 'join',
        data: {
          room: room,
          name: this.name,
          uuid: this.uuid
        }
      }));
    }
  }

  host() {
    if (this.uuid) {
      this.conn?.send(JSON.stringify({
        op: 'host',
        data: {
          uuid: this.uuid,
          name: this.name
        }
      }));
    }
  }

  train(difficulty: number) {
    if (this.uuid) {
      this.conn?.send(JSON.stringify({
        op: 'host',
        data: {
          uuid: this.uuid,
          name: this.name,
          options: {
            ai: difficulty
          }
        }
      }));
    }
  }

  rematch() {
    this.conn?.send(JSON.stringify({
      op: 'rematch',
      data: {
        uuid: this.uuid
      }
    }))
  }
}