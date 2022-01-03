import { useWS } from './modules/ws/ws';
import Board from './modules/ui/Board';
import Rooms from './modules/ui/Rooms';
import header from './style/header.module.scss';
import './style/index.scss';
import CheckIcon from '@mui/icons-material/Check';
import HostOrLeave from './modules/ui/Controller';
import IATraining from './modules/ui/AITraining'
import Opponent from './modules/ui/Opponent'

function App() {
  const { role, client, updateNickname, gameState } = useWS();
  
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
        <div className={header.Right}>
          { gameState.opponent && <Opponent /> }
          { !role && <IATraining /> }
          <HostOrLeave />
        </div>
      </div>
      { role ? <Board /> : <Rooms /> }
    </div>
  )
}

export default App
