import { createContext, useContext, useState, useEffect } from 'react';
import Client from './client'
import { useNoti } from '../notifications/noti';
import Waiting from './Waiting';
import useAudio from '../audio/useAudio';

interface Props {
  children: React.ReactElement<any, any>
}

export type Role = 'host' | 'challenger' | ''

interface IGameState {
  isOver: boolean;
  forfeit: boolean;
  turn: number;
  isDraw: boolean;
  opponent?: {
    name: string;
  }
}

export interface ICase {
  isDisabled: boolean;
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
  updateNickname: () => void;
  rematchs: number;
  isWinning: boolean;
  isStarting: boolean;
}

const defaultClient = new Client();
const defaultGameState: IGameState = {
  turn: 0,
  forfeit: false,
  isOver: false,
  opponent: undefined,
  isDraw: false
}
const defaultCases: ICase[] = [
  { position: 0, state: '', isDisabled: false },
  { position: 1, state: '', isDisabled: false },
  { position: 2, state: '', isDisabled: false },
  { position: 3, state: '', isDisabled: false },
  { position: 4, state: '', isDisabled: false },
  { position: 5, state: '', isDisabled: false },
  { position: 6, state: '', isDisabled: false },
  { position: 7, state: '', isDisabled: false },
  { position: 8, state: '', isDisabled: false },
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
  rematchs: 0,
  isWinning: false,
  isStarting: false
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
  const [rematchs, setRematchs] = useState(0);
  const [isWinning, setIsWinning] = useState(false);
  const [isStarting, setIsStarting] = useState(role == 'host');
  const toogle = useAudio();
  let pong = true;

  const reset = (isRematch: boolean = false) => {
    setCases(defaultCases);
    if (isRematch) {
      setGameState(old => {
        return {
          ...old,
          ...{
            turn: 0,
            isOver: false,
            forfeit: false
          }
        }
      });
      setCases(defaultCases);
      return 
    }
    setGameState(defaultGameState);
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
        turn: old.turn,
        isDraw: false
      }
    })
  }

  const updateNickname = () => {
    const input = document.getElementById('nickname-input') as HTMLInputElement;
    const value = input.value || '';
    localStorage.setItem('@name', value);
    setClient(old => {
      old.name = value
      return Object.assign(Object.create(Object.getPrototypeOf(old)), old);
    })
    input.value = "";
    addNoti({
      title: 'Nickname updated',
      message: `Your nickname is now ${value || 'Player'} ${value == 'comrad' ? '(listening comrad ^^)' : ''}`
    })
    
  }

  const connect = () => {
    const ws = new WebSocket(import.meta.env.PROD ? 'wss://tic-tac-toe-nsi.herokuapp.com/' : 'ws://localhost:8080');
    const client = new Client(ws);

    ws.onopen = () => {
      setIsLoading(false);
      setClient(client);
      client.hello();
      client.getRooms();
      heartbeat();
    }
    ws.onmessage = (event) => {
      const { op, data } = JSON.parse(event.data);
      switch(op) {
        case 'pong':
          pong = true;
          break;
        case 'rematch':
          setRematchs(oldRematch => oldRematch + 1);
          reset(true);
          break;
        case 'leave':
          if (data.who == 'you') {
            console.log('you')
            setRematchs(0);
            return reset();
          }
          setRematchs(oldRematch => oldRematch + 1);
          setGameState(old => {return {...old, opponent: undefined}})
          break;
        case 'hello':
          setUuid(data.uuid);
          break;
        case 'rooms':
          setRooms(data.rooms)
          break;
        case 'host':
          setRematchs(0);
          setRole('host');
          setGameState(defaultGameState);
          break;
        case 'join':
          setCases(defaultCases);
          setGameState({...defaultGameState, ...{opponent: data.opponent}});
          setRole((old) => old != 'host' ? 'challenger' : old);
          break;
        case 'win':
          setIsWinning(true);
          end(data.forfeit);
          break;
        case 'lose':
          setIsWinning(false);
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
          toogle();
          setCases(old => old.map(c => c.position == data.position ? data : c))
          setGameState(old => {return {...old, ...{turn: old.turn + 1}}})
          break;
        case 'draw':
          setGameState(old => {
            return {
              ...old,
              ...{ isOver: true, isDraw: true }
            }
          })
          break;
        case 'start':
          setIsStarting(data.isStarting)
          break;
      }
    }
    ws.onclose = connect
  }

  function heartbeat() {
    console.log(client);
    if (!client.conn || client.conn.readyState !== 1 || !pong) return;
    pong = false;
    client.ping();
    setTimeout(heartbeat, 1000);
  }

  useEffect(connect, [])

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
    updateNickname,
    rematchs,
    isWinning,
    isStarting
  }

  return (
    <WSContext.Provider value={value}>{isLoading ? <Waiting /> : children}</WSContext.Provider>
  )
}

export const useWS = () => useContext(WSContext);