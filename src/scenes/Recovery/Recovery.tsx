import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getAndRemoveFromStorage } from "src/functions/storage";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { isPasswordValid } from "src/functions";
import { serverReplyType } from "src/types";
import { useNavigate } from "react-router-dom";
import { postRequest } from "src/functions/connection";
import { texts } from "./Recovery.lang";
import {
  Gsap,
  HintText,
  Content,
  Title
} from "./Recovery.style";
import {
  moveAndVanish,
  spawnAndMove,
} from "src/functions/animation";
import {
  Header,
  Button,
  Credential,
} from "components/index";

const MIN_PASSWORD_SIZE = 8;

type screenType = "input" | "success" | "failure";

export default function Recovery() {
  const navigate = useNavigate();
  const { language, keyPressed, rollingCode } = useGlobalContext();
  const recoveryTexts = texts.get(language);
  const [code, setCode] = useState<string>(() => "");
  const [screen, setScreen] = useState<screenType>(() => "input");
  const [titleText, setTitleText] = useState<string>(() => recoveryTexts.createNewPassword);
  const [hintText, setHintText] = useState<string>(() => recoveryTexts.newPasswordHint);
  const [buttonText, setButtonText] = useState<string>(() => recoveryTexts.send);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(() => true);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(() => false);

  const password = useRef<string>("");
  const repPassword = useRef<string>("");
  const oldPassword = useRef<string>("");

  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const passRef = useRef(null);
  const repPassRef = useRef(null);
  const hintRef = useRef(null);
  const buttonRef = useRef(null);

  const checkInputs = () => {
    let status = false;
    let hint = recoveryTexts.newPasswordHint;
    if (isPasswordValid(password.current, MIN_PASSWORD_SIZE)) {
      if (password.current === oldPassword.current) {
        hint = recoveryTexts.passwordMustBeNew;
      } else if (repPassword.current.length > 0) {
        if (password.current === repPassword.current) {
          hint = recoveryTexts.goodToGo;
          status = true;
        } else {
          hint = recoveryTexts.passwordsDontMatch;
        }
      }
    }
    setHintText(hint);
    return status;
  }

  const onSuccess = (reply: serverReplyType) => {
    (reply.status === "SUCCESS_RECOVERED_USER") && setScreen("success");
  }

  const onError = () => {
    setScreen("failure");
  }

  const onButtonClick = () => {
    switch (screen) {
      case "input":
        const link = "/change-password";
        const params = {code, rollingCode, password: password.current};
        postRequest({ link, params, onSuccess, onError, setWaitingResponse});
        break;
      case "success":
      case "failure":
        navigate("/login");
        break;
    }
  };


  useEffect(() => {
    const recoveryCode = getAndRemoveFromStorage("code");
    const action = getAndRemoveFromStorage("action");    
    if((!recoveryCode) || (!action) || (action !== "recovery")){
      setScreen("failure");
    } else {
      setCode(recoveryCode);
    }
  }, []);


  useEffect(() => {
    (keyPressed === "Enter") &&
    checkInputs() &&
    onButtonClick();
  }, [keyPressed]);


  useLayoutEffect(() => {
    moveAndVanish(
      [
        titleRef.current,
        passRef.current,
        repPassRef.current,
        hintRef.current,
        buttonRef.current,
      ],
      { y: 120 }
    );
  }, []);

  
  useLayoutEffect(() => {
    const lang = texts.get(language);
    switch (screen) {
      case "input":
        setTitleText(lang.createNewPassword);
        setHintText(lang.newPasswordHint);
        setButtonText(lang.send);
        setButtonDisabled(!checkInputs());
        spawnAndMove([titleRef.current], { y: 0 }, 1);
        spawnAndMove([passRef.current], { y: 70 }, 1);
        spawnAndMove([repPassRef.current], { y: 130 }, 1);
        spawnAndMove([hintRef.current], { y: 190 }, 1);
        spawnAndMove([buttonRef.current], { y: 280 }, 1);
        break;
      default:
        if (screen === "success") {
          setTitleText(lang.yey);
          setHintText(lang.passwordChangeWasSuccessful);
          setButtonText(lang.ok);
        } else {
          setTitleText(lang.hmmm);
          setHintText(lang.somethingWentWrong);
          setButtonText(lang.goBack);
        }
        setButtonDisabled(false);
        spawnAndMove([titleRef.current], { y: 45 }, 1);
        spawnAndMove([hintRef.current], { y: 100 }, 1);
        spawnAndMove([buttonRef.current], { y: 205 }, 1);
        moveAndVanish([passRef.current, repPassRef.current], { y: 120 }, 1);
        break;
    }
  }, [screen, language]);

  return (
    <>
      <Header logo lang />
      <Content ref={contentRef}>
        <Gsap ref={titleRef}>
          <Title>{titleText}</Title>
        </Gsap>
        <Gsap ref={passRef}>
          <Credential
            safe
            zIndex={10}
            title={recoveryTexts.password}
            disabled={waitingResponse}
            onChange={(e) => {
              password.current = e;
              setButtonDisabled(!checkInputs());
            }}
          />
        </Gsap>
        <Gsap ref={repPassRef}>
          <Credential
            safe
            zIndex={8}
            title={recoveryTexts.repeatPassword}
            disabled={waitingResponse}
            onChange={(e) => {
              repPassword.current = e;
              setButtonDisabled(!checkInputs());
            }}
          />
        </Gsap>
        <Gsap ref={hintRef}>
          <HintText>{hintText}</HintText>
        </Gsap>
        <Gsap ref={buttonRef}>
          <Button loading={waitingResponse} disabled={buttonDisabled} onClick={onButtonClick}>
            {buttonText}
          </Button>
        </Gsap>
      </Content>
    </>
  );
}
