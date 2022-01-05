import { useWS } from '../ws/ws'
import style from '../../style/board.module.scss'
import Case from './Case'
import { useEffect, useState } from 'react';

export default () => {
  const { gameState, cases, client, isWinning } = useWS();
  const [isRematching, setIsRematching] = useState(false);

  useEffect(() => {
    if (gameState.turn == 0) {
      setIsRematching(false)
    }
  }, [gameState])

  const rematch = () => {
    setIsRematching(true)
    client.rematch()
  }

  return (
    <div className={`${style.Board} ${gameState.isOver ? style.GameOver : ''}`}>
      { gameState.isOver && <div className={style.Overlay}>
        <h2>{gameState.isDraw ? 'Draw' : isWinning ? 'Win' : 'Lose'}</h2>
        <span>{gameState.isDraw ? 'When two gods defy the impossible...' : isWinning ? 'Well done! You beat his ass' : 'Well, maybe next time loser...'}</span>
        <button onClick={() => rematch()}>{ isRematching ? 'Waiting for your opponent...' : 'Rematch' }</button>
      </div> }
      <div className={style.Inner}>{
        cases.map((c, i) => {
          return <Case key={i} props={c} />
        })
      }</div>
    </div>
  )
}