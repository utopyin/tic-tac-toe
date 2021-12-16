import { createContext, useContext, useState, useEffect } from 'react';
import Client from './client'

interface Props {
  children: React.ReactElement<any, any>
}

type Role = 'host' | 'challenger' | ''

interface IGameState {
  isOver: boolean;
  forfeit: boolean;
  turn: number;
}

interface IRoom {
  name: string,
  players: number
} 
interface IState {
  client: Client;
  uuid: string;
  gameState: IGameState;
  role: Role,
  rooms: IRoom[]
}

const defaultClient = new Client();
const defaultGameState = {
  turn: 0,
  forfeit: false,
  isOver: false,
  opponent: {
    name: ''
  }
}

const WSContext = createContext<IState>({
  client: defaultClient,
  gameState: defaultGameState,
  uuid: '',
  role: '',
  rooms: []
})

export default ({children}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState(defaultClient);
  const [uuid, setUuid] = useState('')
  const [role, setRole] = useState<Role>('')
  const [gameState, setGameState] = useState<IGameState>(defaultGameState);
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    const client = new Client(ws);

    ws.onopen = () => {
      setIsLoading(false);
      setClient(client);
      client.hello();
      client.getRooms();
    }

    ws.onmessage = (event) => {
      const { op, data } = JSON.parse(event.data);
      switch(op) {
        case 'hello':
          setUuid(data.uuid);
          break;
        case 'rooms':
          setRooms(data.rooms)
          break;
        case 'host':
          setRole('host');
          setGameState(defaultGameState);
          break;
        case 'join':
          setGameState({...defaultGameState, ...{opponent: {name: data.opponent.name}}});
          if (role != 'host') setRole('challenger');
          break;
        case 'win':
          setGameState((old) => {
            return {
              ...old,
              ...{
                isOver: true,
                forfeit: data.forfeit,
                turn: data.turn
              }
            }
          })
          break;
      }
    }
  }, [])

  useEffect(() => {
    if (uuid) {
      client.setUuid(uuid);
    }
  }, [uuid])

  const value = {
    client,
    uuid,
    gameState,
    role,
    rooms
  }

  return (
    <WSContext.Provider value={value}>{isLoading ? null : children}</WSContext.Provider>
  )
}

export const useWS = () => useContext(WSContext);