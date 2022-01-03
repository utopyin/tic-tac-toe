import { useWS } from '../ws/ws'
import style from '../../style/header.module.scss'
import PersonIcon from '@mui/icons-material/Person';

export default () => {
  const { gameState } = useWS();

  return (
    <>{ gameState.opponent &&
      <div className={style.Opponent}>
        <PersonIcon/>
        <span>{gameState.opponent.name || 'Player left'}</span>
      </div>
    } </>
  )
}