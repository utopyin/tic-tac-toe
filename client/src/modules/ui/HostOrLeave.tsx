import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import style from '../../style/header.module.scss';
import { useWS } from '../ws/ws';

export default () => {
  const { role, client } = useWS();

  const click = () => role ? client.leave() : client.host();

  return <div className={style.HostOrLeave} onClick={click}>
    { role ? <LogoutIcon style={{width: 20}}/> : <AddIcon /> }
  </div>
}