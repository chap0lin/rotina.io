import gsap from "gsap";
import { Blur, Popup } from "src/components";
import { languageOption, popupPropsType, popupType, userType } from "../types";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

interface popupOptionsType {
  timeout?: number;
  blur?: boolean;
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
  popup: popupType;
  blur: boolean;
  setRollingCode: React.Dispatch<React.SetStateAction<string | null>>; 
  setUser: React.Dispatch<React.SetStateAction<userType["auth"]>>;
  showBlur: (props?: popupOptionsType) => void;
  hideBlur: () => void;
  setLanguage: React.Dispatch<React.SetStateAction<languageOption>>;
  showPopup: (props: popupPropsType, options?: popupOptionsType) => void;
  hidePopup: () => void;
}


const initialValues: GlobalContextValue = {
  rollingCode: null,
  keyPressed: "",
  innerHeight: 768,
  innerWidth: 1366,
  user: {token: null},
  language: "pt-br",
  popup: {text: null, type: null, visible: false},
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
  const [popup, setPopup] = useState<popupType | null>(() => initialValues.popup);

  const blurCallback = useRef<popupOptionsType["onHide"]>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);
  };

  const handleKey = (e: KeyboardEvent) => {
    setKeyPressed(e.key);
  };

  const showBlur = (props?: popupOptionsType) => {
    setBlur(true);
    blurCallback.current = props? props.onHide : null;
  }

  const hideBlur = () => {
    setBlur(false);
  }


  const showPopup = (props: popupPropsType, options?: popupOptionsType) => {
    setPopup((prev) => ({ ...prev, ...props, visible: true }));
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if(!options) return;
    if(options.blur) showBlur({...options});
    if(!options.timeout) return;
    timeoutRef.current = setTimeout(() => {
      setPopup((prev) => ({ ...prev, visible: false }));
    }, options.timeout);
  };

  const hidePopup = () => {
    setPopup((prev) => ({ ...prev, type: null, visible: false }));
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
    popup,
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
      <Blur
        show={blur}
        onClick={hideBlur}
      />
      {children}
      <Popup
        description={popup.text}
        show={popup.visible}
        type={popup.type}
      />
    </GlobalContext.Provider>
  );
}
