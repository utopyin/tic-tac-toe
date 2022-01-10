import { ICase, useWS } from '../ws/ws';
import style from '../../style/case.module.scss';
import ChallengerSVG from './svg/challenger';
import HostSVG from './svg/host';
import { useSkins } from '../skins/skinStore';

interface Props {
  props: ICase;
  key: number;
}

export default ({props}: Props) => {
  const { client } = useWS();
  const { HostSkin, ChallengerSkin } = useSkins();
  const click = () => !props.isDisabled && client.play(props.position)

  return (
    <div className={`${style.Case} ${props.state == '' ? '' : style.blocked} ${props.isDisabled ? style.Disabled : ''}`} onClick={click}>
      {
        props.state == 'challenger' ? ChallengerSkin.svg :
        props.state == 'host' ? HostSkin.svg :
        null
      }
    </div>
  )
}