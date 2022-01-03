import { ICase, useWS } from '../ws/ws';
import style from '../../style/case.module.scss';
import ChallengerSVG from './svg/challenger';
import HostSVG from './svg/host';

interface Props {
  props: ICase;
  key: number;
}

export default ({props}: Props) => {
  const { client, gameState } = useWS();

  const click = () => client.play(props.position)

  return (
    <div className={`${style.Case} ${props.state == '' ? '' : style.blocked} ${gameState.isOver ? style.Disabled : ''}`} onClick={click}>
      {
        props.state == 'challenger' ? <ChallengerSVG /> :
        props.state == 'host' ? <HostSVG /> :
        null
      }
    </div>
  )
}