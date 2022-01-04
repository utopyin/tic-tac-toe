import { useWS } from '../ws/ws'
import style from '../../style/header.module.scss'
import PersonIcon from '@mui/icons-material/Person';
import { useEffect } from 'react';

export default () => {
  const { gameState } = useWS();

  useEffect(() => {
    console.log(gameState.opponent?.name)
  }, [gameState.opponent])

  return (
    <>{ gameState.opponent &&
      <div className={style.Opponent}>
        <PersonIcon/>
        <span>{gameState.opponent.name || 'Player'}</span>
      </div>
    } </>
  )
}