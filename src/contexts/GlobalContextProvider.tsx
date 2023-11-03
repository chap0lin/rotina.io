import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
  } from "react";
  import gsap from "gsap";
import { languageOption } from "../types";
  
interface GlobalContextValue {
  keyPressed: string;
  innerHeight: number,
  language: languageOption,
  setLanguage: React.Dispatch<React.SetStateAction<languageOption>>;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const initialValues: GlobalContextValue = {
  keyPressed: "",
  innerHeight: 768,
  language: "pt-br",
  setLanguage: () => null,
};

const GlobalContext = createContext<GlobalContextValue>(initialValues);

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (typeof context !== "undefined") {
    return context;
  } else {
    console.log("Global Context cannot be accessed from here.")
  }
}
  
export default function GlobalProvider(props: GlobalProviderProps) {
  const [language, setLanguage] = useState<languageOption>(() => "pt-br");
  const [innerHeight, setInnerHeight] = useState<number>(() => window.innerHeight);
  const [keyPressed, setKeyPressed] = useState<string>(() => "");

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
    console.log(window.innerHeight);
  };

  const handleKey = (e: KeyboardEvent) => {
    setKeyPressed(e.key);
  }

  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
    window.addEventListener("resize", handleResize);
    document.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener('keydown', handleKey);
    }
  }, []);

  useEffect(() => {
    const lang = language.split("-").at(0);
    document.documentElement.lang = lang;
  }, [language]);

  const { children } = props;

  const value: GlobalContextValue = {
    keyPressed,
    innerHeight,
    language,
    setLanguage,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
  