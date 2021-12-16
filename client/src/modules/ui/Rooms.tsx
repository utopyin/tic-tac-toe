import { useWS } from '../ws/ws'
import style from '../../style/rooms.module.scss'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

export default () => {
  const { client, rooms } = useWS();

  return (
    <div className={style.Rooms}>
      {rooms.map(room => {
        return (
          <div onClick={() => client.join(room.uuid)} key={room.name} className={style.Room}>
            <span>{room.name}</span>
            <div>
              <span>{room.players}/2</span>
              <SportsEsportsIcon />
            </div>
          </div>
        )
      })}
    </div>
  )
}