import { useWS } from '../ws/ws'
import style from '../../style/board.module.scss'
import Case from './Case'

export default () => {
  const { gameState, cases, role } = useWS();

  const isWinning = (gameState.turn % 2) == 1 ? role == 'host' : (gameState.turn % 2) == 0 ? role == 'challenger' : false;

  return (
    <div className={style.Board}>
      { gameState.isOver && <div className={style.Overlay}>
        <h2>{isWinning ? 'Win' : 'Lose'}</h2>
        <span>{isWinning ? 'Well done! You beat his ass' : 'Well, maybe next time loser...'}</span>
        <span>{gameState.opponent?.name || 'Player left'}</span>
        <button>Rematch</button>
      </div> }
      <div className={`${style.Inner} ${gameState.isOver ? style.GameOver : ''}`}>{
        cases.map((c, i) => {
          return <Case key={i} props={c} />
        })
      }</div>
    </div>
  )
}