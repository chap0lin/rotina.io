import gsap from "gsap";
import { Popup } from "src/components";
import { languageOption, popupType, userType } from "../types";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

interface popupPropsType {
  type?: popupType;
  timeout?: number;
  height?: number;
  blur?: boolean;
  onHide?: () => void;
}

interface blurPropsType {
  onHide?: () => void;
}

interface GlobalProviderProps {
  children: ReactNode;
}
interface GlobalContextValue {
  rollingCode: string | null;
  keyPressed: string;
  innerHeight: number;
  innerWidth: number;
  user: userType["auth"] | null;
  language: languageOption;
  popupType: popupType;
  blur: boolean;
  setRollingCode: React.Dispatch<React.SetStateAction<string | null>>; 
  setUser: React.Dispatch<React.SetStateAction<userType["auth"]>>;
  showBlur: (props?: blurPropsType) => void;
  hideBlur: () => void;
  setLanguage: React.Dispatch<React.SetStateAction<languageOption>>;
  showPopup: (message: string | JSX.Element, props?: popupPropsType) => void;
  hidePopup: () => void;
}

const initialValues: GlobalContextValue = {
  rollingCode: null,
  keyPressed: "",
  innerHeight: 768,
  innerWidth: 1366,
  user: {token: null},
  language: "pt-br",
  popupType: null,
  blur: false,
  setRollingCode: () => null,
  setUser: () => null,
  showBlur: () => null,
  hideBlur: () => null,
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
  const [user, setUser] = useState<userType["auth"]>(() => initialValues.user);
  const [blur, setBlur] = useState<boolean>(() => initialValues.blur);
  const [language, setLanguage] = useState<languageOption>(() => initialValues.language);
  const [innerWidth, setInnerWidth] = useState<number>(() => window.innerWidth);
  const [innerHeight, setInnerHeight] = useState<number>(() => window.innerHeight);
  const [rollingCode, setRollingCode] = useState<string | null>(() => initialValues.rollingCode);
  const [keyPressed, setKeyPressed] = useState<string>(() => initialValues.keyPressed);
  const [popupText, setPopupText] = useState<string | JSX.Element>(() => "");
  const [popupType, setPopupType] = useState<popupType>(() => initialValues.popupType);
  const [popupVisibility, setPopupVisibility] = useState<boolean>(() => false);

  const blurCallback = useRef<popupPropsType["onHide"]>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);
  };

  const handleKey = (e: KeyboardEvent) => {
    setKeyPressed(e.key);
  };

  const showBlur = (props?: blurPropsType) => {
    setBlur(true);
    blurCallback.current = props? props.onHide : null;
  }

  const hideBlur = () => {
    setBlur(false);
  }

  const showPopup = (message: string | JSX.Element, props?: popupPropsType) => {    //TODO remover blur callback destas opções! desacoplar blur e blurCallback dos popups
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const type = props ? props.type : null;
    const timeout = props ? props.timeout : null;
    const shouldBlur = props ? props.blur : null;
    shouldBlur && showBlur({...props});
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
    hideBlur();
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


  useEffect(() => {
    if(!blur && blurCallback.current) {
      blurCallback.current();
      blurCallback.current = null;
    }
  }, [blur]);

  const { children } = props;

  const value: GlobalContextValue = {
    rollingCode,
    keyPressed,
    innerWidth,
    innerHeight,
    user,
    language,
    popupType,
    blur,
    setRollingCode,
    setUser,
    showBlur,
    hideBlur,
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
      />
    </GlobalContext.Provider>
  );
}
