import { useWS } from '../ws/ws'
import style from '../../style/board.module.scss'
import Case from './Case'

export default () => {
  const { gameState, cases, role, client, resets } = useWS();

  const winner = (gameState.turn + resets) % 2 == 1 ? 'host' : 'challenger';
  const isWinning = role == winner;

  return (
    <div className={style.Board}>
      { gameState.isOver && <div className={style.Overlay}>
        <h2>{isWinning ? 'Win' : 'Lose'}</h2>
        <span>{isWinning ? 'Well done! You beat his ass' : 'Well, maybe next time loser...'}</span>
        <span>{gameState.opponent?.name || 'Player left'}</span>
        <button onClick={() => client.rematch()}>Rematch</button>
      </div> }
      <div className={`${style.Inner} ${gameState.isOver ? style.GameOver : ''}`}>{
        cases.map((c, i) => {
          return <Case key={i} props={c} />
        })
      }</div>
    </div>
  )
}