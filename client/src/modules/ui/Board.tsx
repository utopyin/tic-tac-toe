import React from 'react';
import { useWS } from '../ws/ws'
import style from '../../style/board.module.scss'

export default () => {
  const { client } = useWS();
  
  return (
    <div className={style.Board}>

    </div>
  )
}