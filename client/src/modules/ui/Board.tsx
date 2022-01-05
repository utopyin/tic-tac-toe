import { useWS } from '../ws/ws'
import style from '../../style/board.module.scss'
import Case from './Case'
import { useEffect, useState } from 'react';

export default () => {
  const { gameState, cases, client, isWinning, role, rematchs: resets } = useWS();
  const [isRematching, setIsRematching] = useState(false);
  const [isStarting, setIsStarting] = useState(role == 'host' ? true : false);
  const isDisabled = gameState.isOver || !gameState.opponent

  useEffect(() => {
    if (gameState.turn == 0) {
      setIsRematching(false)
    }
  }, [gameState])

  useEffect(() => {
    if (role == 'host') setIsStarting((resets + gameState.turn) % 2 == 0);
    else if (role == 'challenger') setIsStarting((resets + gameState.turn) % 2 != 0);
  }, [gameState, resets, role])

  const [points, setPoints] = useState('.');

  useEffect(() => {
    const intervale = setInterval(() => {
      setPoints(old => {
        return '.'.repeat(old.length % 3 + 1);
      })
    }, 450)
    return () => clearInterval(intervale)
  }, [])

  const rematch = () => {
    setIsRematching(true)
    client.rematch()
  }

  return (
    <div className={`${style.Board} ${gameState.isOver || !gameState.opponent ? style.GameOver : ''}`}>
      {/* { gameState.turn == 0 && gameState.opponent && <div className={style.StartingMessage}>
        { isStarting ? "You are starting" : "Your opponent is starting"} 
      </div> } */}
      { gameState.isOver && <div className={style.Overlay}>
        <h2>{gameState.isDraw ? 'Draw' : isWinning ? 'Win' : 'Lose'}</h2>
        <span>{gameState.isDraw ? 'When two gods defy the impossible...' : isWinning ? 'Well done! You beat his ass' : 'Well, maybe next time loser...'}</span>
        <button onClick={() => rematch()}>{ isRematching ? 'Waiting for your opponent...' : 'Rematch' }</button>
      </div> }
      { !gameState.opponent && !gameState.isOver && <div className={style.Overlay}>
        <h2>Waiting for an opponent{points}</h2>
        <span>Thank you for your patience, as soon as an opponent join the room the game will start.</span>
      </div> }
      <div className={style.Inner}>{
        cases.map((c, i) => {
          return <Case key={i} props={{...c, ...{isDisabled}}}/>
        })
      }</div>
    </div>
  )
}