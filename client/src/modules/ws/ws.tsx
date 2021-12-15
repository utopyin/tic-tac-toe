import { createContext, useContext, useState, useEffect } from 'react';
import Client from './client'

interface Props {
  children: React.ReactElement<any, any>
} 

interface IState {
  client: Client;
  uuid: string
}

const defaultClient = new Client();

const WSContext = createContext<IState>({
  client: defaultClient,
  uuid: ''
})

export default ({children}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState(defaultClient);
  const [uuid, setUuid] = useState('')

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    const client = new Client(ws);

    ws.onopen = () => {
      setIsLoading(false);
      setClient(client);
    }

    ws.onmessage = (event) => {
      const { op, data } = JSON.parse(event.data);
      switch(op) {
        case 'hello':
          setUuid(data)
      }
    }
  }, [])

  const value = {
    client,
    uuid
  }

  return (
    <WSContext.Provider value={value}>{isLoading ? null : children}</WSContext.Provider>
  )
}

export const useWS = () => useContext(WSContext);