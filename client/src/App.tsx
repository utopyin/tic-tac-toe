import { useWS } from './modules/ws/ws';
import { useNoti } from './modules/notifications/noti';
import Board from './modules/ui/Board';
import Rooms from './modules/ui/Rooms';
import header from './style/header.module.scss';
import './style/index.scss';
import CheckIcon from '@mui/icons-material/Check';
import HostOrLeave from './modules/ui/Controller';
import { useEffect, useState } from 'react';

function App() {
  const { role, client, updateNickname } = useWS();
  
  return (
    <div className="app">
      <div className={header.Header}>
        <div className={header.Input}>
          <input
            type="text" id="nickname-input"
            onKeyDown={(event) => {
              if (event.key === 'Enter') updateNickname();
            }}
            placeholder={client.name ? `Playing as ${client.name}` : 'nickname'}></input>
          <div onClick={updateNickname}><CheckIcon /></div>
        </div>
        <HostOrLeave />
      </div>
      { role ? <Board /> : <Rooms /> }
    </div>
  )
}

export default App
