import { createContext, useContext, useState, ReactElement } from 'react';
import style from '../../style/noti.module.scss'
import NotificationsIcon from '@mui/icons-material/Notifications';
import ErrorIcon from '@mui/icons-material/Error';

type notiType = 'default' |'error'

interface INoti {
  timestamp?: number;
  message: string;
  type?: notiType;
  title: string;
}


interface Context {
  notis: INoti[];
  addNoti: (noti: INoti) => Promise<INoti>
}

const NotiContext = createContext<Context>({
  notis: [],
  addNoti: (() => {}) as any
});

const livingTime = 5000;

export default ({children}: {
  children: ReactElement<any, any>
}) => {
  const [notis, setNotis] = useState<INoti[]>([]);

  const closeNoti = (timestamp: INoti['timestamp']) => {
    let isNotiActive = false;
    setNotis(oldNotis => {
      return oldNotis.filter(n => {
        if (n.timestamp == timestamp) {
          isNotiActive = true;
          return false;
        }
        return true;
      })
    })
    return isNotiActive;
  }

  const addNoti = (noti: INoti) => {
    noti = {
      timestamp: Date.now(),
      title: noti.title,
      message: noti.message,
      type: noti.type || 'default'
    }
    setNotis(oldNotis => [...oldNotis, noti]);

    return new Promise<INoti>((resolve, reject) => {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        closeNoti(noti.timestamp) && resolve(noti);
      }, livingTime)
    })
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
              onClick={() => closeNoti(noti.timestamp)}
              className={`${style.Noti} ${noti.type == 'error' ? style.Error : ''}`}
              key={noti.timestamp}>
                {noti.type == 'error' ? <ErrorIcon /> : <NotificationsIcon />}
                <div>
                  <span>{noti.title}</span>
                  <p>{noti.message}</p>
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