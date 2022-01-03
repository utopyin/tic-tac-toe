import { useWS } from '../ws/ws'
import style from '../../style/board.module.scss'
import Case from './Case'

export default () => {
  const { gameState, cases, client, isWinning } = useWS();

  return (
    <div className={`${style.Board} ${gameState.isOver ? style.GameOver : ''}`}>
      { gameState.isOver && <div className={style.Overlay}>
        <h2>{gameState.isDraw ? 'Draw' : isWinning ? 'Win' : 'Lose'}</h2>
        <span>{gameState.isDraw ? 'When two gods defy the impossible...' : isWinning ? 'Well done! You beat his ass' : 'Well, maybe next time loser...'}</span>
        <button onClick={() => client.rematch()}>Rematch</button>
      </div> }
      <div className={style.Inner}>{
        cases.map((c, i) => {
          return <Case key={i} props={c} />
        })
      }</div>
    </div>
  )
}