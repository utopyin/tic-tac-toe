import { useWS } from './modules/ws/ws';
import Board from './modules/ui/Board';
import Rooms from './modules/ui/Rooms';
import header from './style/header.module.scss';
import './style/index.scss';
import CheckIcon from '@mui/icons-material/Check';
import HostOrLeave from './modules/ui/HostOrLeave';

const changeNickname = () => {
  const input = document.getElementById('nickname-input') as HTMLInputElement;
  const value = input.value;
  localStorage.setItem('@name', value || '');
}


function App() {
  const { role } = useWS();

  return (
    <div className="app">
      <div className={header.Header}>
        <div className={header.Input}>
          <input type="text" id="nickname-input" placeholder="nickname"></input>
          <div onClick={changeNickname}><CheckIcon /></div>
        </div>
        <HostOrLeave />
      </div>
      { role ? <Board /> : <Rooms /> }
    </div>
  )
}

export default App
