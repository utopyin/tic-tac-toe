import { useState, createContext, useContext, ReactElement, useEffect } from 'react';
import Cross from './svg/cross'
import Circle from './svg/circle'
import Comrad from './svg/comrad'
import { useWS } from '../ws/ws'

interface Props {
  children: ReactElement<any, any>
}
export interface ISkins {
  HostSkin: {
    svg: JSX.Element;
    name: string
  };
  ChallengerSkin: {
    svg: JSX.Element;
    name: string
  };
}

const hostSkins = {
  circle: {
    svg: <Circle />,
    name: 'circle'
  }
}

const challengerSkins = {
  cross: {
    svg: <Cross />,
    name: 'cross'
  },
  comrad: {
    svg: <Comrad />,
    name: 'comrad'
  }
}

const defaultSkins: ISkins = {
  HostSkin: hostSkins['circle'],
  ChallengerSkin: challengerSkins[localStorage.getItem('@name') == 'comrad' ? 'comrad' : 'cross']
}

const SkinContext = createContext({
  ...defaultSkins,
  chooseHostSkin: (skinName: keyof typeof hostSkins) => {},
  chooseChallengerSkin: (skinName: keyof typeof challengerSkins) => {},
})


export default ({children}: Props) => {
  const { client } = useWS();
  const [HostSkin, setHostSkin] = useState(defaultSkins['HostSkin']);
  const [ChallengerSkin, setChallengerSkin] = useState(client.name == 'comrad' ?challengerSkins['comrad'] : defaultSkins['ChallengerSkin'])

  useEffect(() => {
    console.log(client)
    if (client.name == 'comrad') setChallengerSkin(challengerSkins['comrad']);
  }, [client])

  const chooseHostSkin = (skinName: keyof typeof hostSkins) => {
    if (Object.keys(hostSkins).includes(skinName))
      setHostSkin(hostSkins[skinName])
  }

  const chooseChallengerSkin = (skinName: keyof typeof challengerSkins) => {
    if (Object.keys(challengerSkins).includes(skinName))
      setChallengerSkin(challengerSkins[skinName])
  }

  const value = {
    HostSkin,
    ChallengerSkin,
    chooseHostSkin,
    chooseChallengerSkin
  }

  return (
    <SkinContext.Provider value={value}>
      { children }
    </SkinContext.Provider>
  )
}

export const useSkins = () => useContext(SkinContext);