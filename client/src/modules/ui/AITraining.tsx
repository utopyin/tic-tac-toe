import style from '../../style/header.module.scss'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { useWS } from '../ws/ws';

export default function AITraining() {
  const { client } = useWS()

  return (
    <div className={style.AI}>
      <PrecisionManufacturingIcon />
      <div className={style.Menu}>
        <span onClick={() => client.train(1)}>Garbage</span>
        <span onClick={() => client.train(2)}>Meh</span>
        <span onClick={() => client.train(3)}>Pro player</span>
      </div>
    </div>
  )
}
