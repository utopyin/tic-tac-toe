import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import style from '../../style/header.module.scss';
import { useWS } from '../ws/ws';

export default () => {
  const { role, client } = useWS();

  const click = () => role ? client.leave() : client.host();

  return <div className={`${style.Controller} ${role && style.leave}`} onClick={click}>
    { role ? <LogoutIcon /> : <AddIcon style={{width: 30, height: 30}}/> }
  </div>
}