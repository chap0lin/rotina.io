import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
  } from 'react';
  import gsap from 'gsap';
import { LanguageOption } from '../types';
  
  interface GlobalContextValue {
    language: LanguageOption,
    setLanguage: React.Dispatch<React.SetStateAction<LanguageOption>>;
  }
  
  interface GlobalProviderProps {
    children: ReactNode;
  }
  
  const initialValues: GlobalContextValue = {
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
    const [language, setLanguage] = useState<LanguageOption>(() => 'pt-br');
  
    useEffect(() => {
      gsap.config({ nullTargetWarn: false });
    }, []);
  
    const { children } = props;
  
    const value: GlobalContextValue = {
      language,
      setLanguage,
    };
  
    return (
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    );
  }
  