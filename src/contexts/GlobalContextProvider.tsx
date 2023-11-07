import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
  } from "react";
  import gsap from "gsap";
import { languageOption, userType } from "../types";
import { colors } from "src/colors";
import { Popup } from "src/components";
  
interface GlobalContextValue {
  keyPressed: string;
  innerHeight: number;
  user: userType | null;
  language: languageOption;
  setUser: React.Dispatch<React.SetStateAction<userType>>;
  setLanguage: React.Dispatch<React.SetStateAction<languageOption>>;
  showPopup: (message: string, timeout?: number) => void;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const initialValues: GlobalContextValue = {
  keyPressed: "",
  innerHeight: 768,
  user: null,
  language: "pt-br",
  setUser: () => null,
  setLanguage: () => null,
  showPopup: () => null,
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
  const [user, setUser] = useState<userType>(() => null);
  const [popupVisibility, setPopupVisibility] = useState<boolean>(() => false);
  const [popupText, setPopupText] = useState<string>(() => "");

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
  };

  const handleKey = (e: KeyboardEvent) => {
    setKeyPressed(e.key);
  }

  const showPopup = (message: string, timeout?: number) => {
    setPopupText(message);
    setPopupVisibility(true);
    setTimeout(() => {
        setPopupVisibility(false);
    }, timeout?? 4000);
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
    user,
    language,
    setUser,
    setLanguage,
    showPopup,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
      <Popup
        description={popupText}
        show={popupVisibility}
        type="warning"
        warningType="failure"
        exitIconColor={colors.black}
        descriptionColor={colors.black}
        backgroundColor={colors.white}
        border={`2px solid ${colors.red}`}
    />
    </GlobalContext.Provider>
  );
}
  