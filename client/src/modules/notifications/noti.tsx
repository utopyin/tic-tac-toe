import { createContext, useContext, useState, ReactElement } from 'react';
import style from '../../style/noti.module.scss'
import NotificationsIcon from '@mui/icons-material/Notifications';

type notiType = 'default' |'error'

interface INoti {
  timestamp: number;
  text: string;
  type: notiType;
  title: string;
}

interface Context {
  notis: INoti[];
  addNoti: (noti: INoti) => void
}

const NotiContext = createContext<Context>({
  notis: [],
  addNoti: () => {}
});

const livingTime = 5000;

export default ({children}: {
  children: ReactElement<any, any>
}) => {
  const [notis, setNotis] = useState<INoti[]>([]);

  const addNoti = (noti: INoti) => {
    setNotis(oldNotis => {
      return [...oldNotis, noti]
    })
    
    setTimeout(() => {
      setNotis(oldNotis => {
        return oldNotis.filter(n => n.timestamp != noti.timestamp)
      })
    }, livingTime)
  }

  const value = {
    notis, 
    addNoti
  }

  return (
    <NotiContext.Provider value={value}>
      <div className={style.Modal}>
        {notis.map(noti => {
          return (
            <div
              className={`${style.Noti} ${noti.type == 'error' ? style.Error : ''}`}>
                <NotificationsIcon />
                <div>
                  <span>{noti.title}</span>
                  <p>{noti.text}</p>
                </div>
                
            </div>
          )
        })}
      </div>
      {children}
    </NotiContext.Provider>
  )
}

export const useNoti = () => useContext(NotiContext)