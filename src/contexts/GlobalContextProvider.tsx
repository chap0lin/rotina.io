import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
  } from 'react';
  import gsap from 'gsap';
import { languageOption } from '../types';
  
interface GlobalContextValue {
  innerHeight: number,
  language: languageOption,
  setLanguage: React.Dispatch<React.SetStateAction<languageOption>>;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const initialValues: GlobalContextValue = {
  innerHeight: 768,
  language: 'pt-br',
  setLanguage: () => null,
};

const GlobalContext = createContext<GlobalContextValue>(initialValues);

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (typeof context !== 'undefined') {
    return context;
  } else {
    console.log('Global Context cannot be accessed from here.')
  }
}
  
export default function GlobalProvider(props: GlobalProviderProps) {
  const [language, setLanguage] = useState<languageOption>(() => 'pt-br');
  const [innerHeight, setInnerHeight] = useState<number>(() => window.innerHeight);

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
    console.log(window.innerHeight);
  };

  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const { children } = props;

  const value: GlobalContextValue = {
    innerHeight,
    language,
    setLanguage,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
  