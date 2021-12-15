import { useEffect, useState } from 'react';
import { useWS } from './modules/ws/ws'

function App() {
  const { client, uuid } = useWS();

  useEffect(() => {
    console.log(client)
  }, [client])

  const click = () => {
    client.hello()
  }

  return (
    <div className="App">
      <button onClick={click}>Connect</button>
      {uuid}
    </div>
  )
}

export default App
