import { createContext, useContext, useState, useEffect } from 'react';
import Client from './client'
import { useNoti } from '../notifications/noti';
import Case from '../ui/Case';

interface Props {
  children: React.ReactElement<any, any>
}

export type Role = 'host' | 'challenger' | ''

interface IGameState {
  isOver: boolean;
  forfeit: boolean;
  turn: number;
  opponent?: {
    name: string
  }
}

export interface ICase {
  position: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  state: 'challenger' | 'host' | '';
}
interface IRoom {
  name: string;
  players: number;
  uuid: string;
} 
interface IState {
  client: Client;
  uuid: string;
  gameState: IGameState;
  role: Role;
  rooms: IRoom[];
  cases: ICase[];
  reset: () => void;
  updateNickname: () => void
}

const defaultClient = new Client();
const defaultGameState: IGameState = {
  turn: 0,
  forfeit: false,
  isOver: false,
  opponent: undefined
}
const defaultCases: ICase[] = [
  { position: 0, state: '' },
  { position: 1, state: '' },
  { position: 2, state: '' },
  { position: 3, state: '' },
  { position: 4, state: '' },
  { position: 5, state: '' },
  { position: 6, state: '' },
  { position: 7, state: '' },
  { position: 8, state: '' },
]

const WSContext = createContext<IState>({
  client: defaultClient,
  gameState: defaultGameState,
  uuid: '',
  role: '',
  rooms: [],
  cases: defaultCases,
  reset: () => {},
  updateNickname: () => {},
})

export default ({children}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState(defaultClient);
  const [uuid, setUuid] = useState('')
  const [role, setRole] = useState<Role>('')
  const [gameState, setGameState] = useState<IGameState>(defaultGameState);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [cases, setCases] = useState<ICase[]>(defaultCases);
  const { addNoti } = useNoti();

  const reset = () => {
    setGameState(defaultGameState);
    setCases(defaultCases);
    setRole('');
  }

  function end(forfeit: boolean = false) {
    setGameState(old => {
      if (!old.opponent) {
        reset();
        return old;
      }
      if (forfeit && role == 'challenger') setRole('host');
      return {
        opponent: forfeit ? undefined : old.opponent,
        isOver: true,
        forfeit: forfeit,
        turn: old.turn
      }
    })
  }

  const updateNickname = () => {
    const input = document.getElementById('nickname-input') as HTMLInputElement;
    const value = input.value || '';
    localStorage.setItem('@name', value);
    setClient(old => {
      old.name = value
      return old
    })
    input.value = "";
    addNoti({
      title: 'Nickname updated',
      message: `Your nickname is now ${value || 'Player'}`
    })
    
  }

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
        case 'leave':
          if (data.who == 'you') return reset();
          setGameState(old => {return {...old, opponent: undefined}})
          break;
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
          setGameState({...defaultGameState, ...{opponent: data.opponent}});
          setRole((old) => old != 'host' ? 'challenger' : old);
          break;
        case 'win':
          end(data.forfeit);
          break;
        case 'lose':
          end(data.forfeit);
          break;
        case 'error':
          addNoti({
            title: data.title || 'Error',
            message: data.message || 'Une erreur est survenue',
            type: 'error'
          })
          break;    
        case 'update':
          setCases(old => old.map(c => c.position == data.position ? data : c))
          setGameState(old => {return {...old, ...{turn: old.turn + 1}}})
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
    rooms,
    cases,
    reset,
    updateNickname
  }

  return (
    <WSContext.Provider value={value}>{isLoading ? null : children}</WSContext.Provider>
  )
}

export const useWS = () => useContext(WSContext);