import React from 'react';
import { useWS } from '../ws/ws'
import style from '../../style/rooms.module.scss'

export default () => {
  const { client, rooms } = useWS();

  return (
    <div className={style.Rooms}>
      {rooms.map(room => {
        return <div>{room.name}</div>
      })}
    </div>
  )
}