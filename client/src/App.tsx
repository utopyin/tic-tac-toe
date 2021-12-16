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
  const { role } = useWS();
  const { addNoti } = useNoti();
  const [nickname, setNickname] = useState(localStorage.getItem('@name') || 'nickname');

  const changeNickname = () => {
    const input = document.getElementById('nickname-input') as HTMLInputElement;
    const value = input.value || '';
    localStorage.setItem('@name', value );
    setNickname(value);
    input.value = "";
    addNoti({
      title: 'Nickname updated',
      message: `Your nickname is now ${value || 'Player'}`
    })
  }

  return (
    <div className="app">
      <div className={header.Header}>
        <div className={header.Input}>
          <input
            type="text" id="nickname-input"
            onKeyDown={(event) => {
              if (event.key === 'Enter') changeNickname();
            }}
            placeholder={nickname ? `Playing as ${nickname}` : 'nickname'}></input>
          <div onClick={changeNickname}><CheckIcon /></div>
        </div>
        <HostOrLeave />
      </div>
      { role ? <Board /> : <Rooms /> }
    </div>
  )
}

export default App
