import { useState, createContext, useContext, ReactElement, useEffect } from 'react';
import Cross from './svg/cross'
import Circle from './svg/circle'

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
  },
  spy: {
    svg: <Cross />,
    name: 'cross'
  }

}

const challengerSkins = {
  cross: {
    svg: <Cross />,
    name: 'cross'
  },
  spy: {
    svg: <Circle />,
    name: 'circle'
  }
}

const defaultSkins: ISkins = {
  HostSkin: hostSkins['circle'],
  ChallengerSkin: challengerSkins['cross']
}

const SkinContext = createContext({
  ...defaultSkins,
  chooseHostSkin: (skinName: keyof typeof hostSkins) => {},
  chooseChallengerSkin: (skinName: keyof typeof challengerSkins) => {},
})


export default ({children}: Props) => {
  const [HostSkin, setHostSkin] = useState(defaultSkins['HostSkin']);
  const [ChallengerSkin, setChallengerSkin] = useState(defaultSkins['ChallengerSkin'])

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