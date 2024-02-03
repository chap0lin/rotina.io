import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { languageOption, popupType, userType } from "../types";
import { colors } from "src/colors";
import { Popup } from "src/components";

interface popupPropsType {
  type?: popupType;
  timeout?: number;
  height?: number;
}

interface GlobalProviderProps {
  children: ReactNode;
}
interface GlobalContextValue {
  keyPressed: string;
  innerHeight: number;
  innerWidth: number;
  user: userType | null;
  language: languageOption;
  popupType: string | null;
  setUser: React.Dispatch<React.SetStateAction<userType>>;
  setLanguage: React.Dispatch<React.SetStateAction<languageOption>>;
  showPopup: (message: string | JSX.Element, props?: popupPropsType) => void;
  hidePopup: () => void;
}

const initialValues: GlobalContextValue = {
  keyPressed: "",
  innerHeight: 768,
  innerWidth: 1366,
  user: null,
  language: "pt-br",
  popupType: null,
  setUser: () => null,
  setLanguage: () => null,
  showPopup: () => null,
  hidePopup: () => null,
};

const GlobalContext = createContext<GlobalContextValue>(initialValues);

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (typeof context !== "undefined") {
    return context;
  } else {
    console.log("Global Context cannot be accessed from here.");
  }
}

export default function GlobalProvider(props: GlobalProviderProps) {
  const [language, setLanguage] = useState<languageOption>(() => "pt-br");
  const [innerWidth, setInnerWidth] = useState<number>(() => window.innerWidth);
  const [innerHeight, setInnerHeight] = useState<number>(
    () => window.innerHeight
  );
  const [user, setUser] = useState<userType>(() => null);
  const [keyPressed, setKeyPressed] = useState<string>(() => "");
  const [popupText, setPopupText] = useState<string | JSX.Element>(() => "");
  const [popupType, setPopupType] = useState<popupType>(() => null);
  const [popupVisibility, setPopupVisibility] = useState<boolean>(() => false);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);
  };

  const handleKey = (e: KeyboardEvent) => {
    setKeyPressed(e.key);
  };

  const showPopup = (message: string | JSX.Element, props?: popupPropsType) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const type = props ? props.type : null;
    const timeout = props ? props.timeout : null;
    setPopupText(message);
    setPopupType(type ?? "warning-failure");
    setPopupVisibility(true);
    if (!timeout) return null;
    timeoutRef.current = setTimeout(() => {
      setPopupVisibility(false);
    }, timeout);
  };

  const hidePopup = () => {
    setPopupVisibility(false);
    setPopupType(null);
  };

  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    const lang = language.split("-").at(0);
    document.documentElement.lang = lang;
  }, [language]);

  const { children } = props;

  const value: GlobalContextValue = {
    keyPressed,
    innerWidth,
    innerHeight,
    user,
    language,
    popupType,
    setUser,
    setLanguage,
    showPopup,
    hidePopup,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
      <Popup
        description={popupText}
        show={popupVisibility}
        type={popupType}
        exitIconColor={colors.black}
        descriptionColor={colors.black}
        backgroundColor={colors.white}
      />
    </GlobalContext.Provider>
  );
}
