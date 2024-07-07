import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { isEmailValid, isPasswordValid } from "src/functions";
import { loginScreens, serverReplyType } from "src/types";
import { getFromStorage, saveOnStorage } from "src/functions/storage";
import { postRequest } from "src/functions/connection";
import { tokenKey } from "src/constants";
import { colors } from "src/colors";
import { texts } from "./Login.lang";
import {
  Background,
  Header,
  Credential,
  Button,
  Logo,
} from "components/index";
import {
  move,
  moveAndVanish,
  spawn,
  spawnAndMove,
  vanish,
} from "src/functions/animation";
import {
  TopContent,
  Credentials,
  DiscreteText,
  BottomContent,
  Content,
  Bold,
  LogoDiv,
  Gsap,
  HintText,
  HintGsap,
} from "./Login.style";

const MIN_PASSWORD_SIZE = 8;

export default function Login() {
  const navigate = useNavigate();
  const { rollingCode, language, innerHeight, keyPressed, setUser, showPopup, setRollingCode } = useGlobalContext();
  const loginTexts = texts.get(language);
  const [screen, setScreen] = useState<loginScreens>(() => "sign-in");
  const [hintText, setHintText] = useState<string>(() => loginTexts.forgotMyPassword);
  const [buttonText, setButtonText] = useState<string>(() => loginTexts.buttonSignIn);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(() => true);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(() => false);
  const canGoBack = !waitingResponse && (screen === "sign-up" || screen === "forgot-password");

  const username = useRef<string>("");
  const email = useRef<string>("");
  const password = useRef<string>("");
  const repPassword = useRef<string>("");
  const code = useRef<string>("");

  const logoRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const repPassRef = useRef(null);
  const codeRef = useRef(null);
  const hintRef = useRef(null);
  const signUpRef = useRef(null);
  const buttonRef = useRef(null);

  const login = (token: string) => {
    saveOnStorage(tokenKey, token);
    setUser({ token });
    navigate("/logged");
  };

  const checkSignInInputs = () => {
    return (
      username.current.length > 0 &&
      isPasswordValid(password.current, MIN_PASSWORD_SIZE)
    );
  };

  const checkSignUpInputs = () => {
    if (screen !== "sign-up") return false;
    let status = false;
    let hint = loginTexts.signUpHint;

    if (
      username.current.length > 0 &&
      email.current.length > 0 &&
      password.current.length > 0
    ) {
      if (!isEmailValid(email.current)) {
        hint = loginTexts.invalidEmail;
      } else {
        hint = loginTexts.newPasswordHint;
        if (isPasswordValid(password.current, MIN_PASSWORD_SIZE)) {
          if (repPassword.current.length > 0) {
            if (password.current === repPassword.current) {
              hint = loginTexts.goodToGo;
              status = true;
            } else {
              hint = loginTexts.passwordsDontMatch;
            }
          }
        }
      }
    }
    setHintText(hint);
    return status;
  };

  const checkAllInputs = () => {
    switch (screen) {
      case "sign-in":
        return checkSignInInputs();
      case "sign-up":
        return checkSignUpInputs();
      case "forgot-password":
        return isEmailValid(email.current);
      default:
        return true;
    }
  };

  const handleButtonStatus = () => {
    setButtonDisabled(!checkAllInputs());
  };


//COMUNICAÇÃO COM SERVIDOR////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const onSuccess = (reply: serverReplyType) => {
    if(!reply) return;
    reply.rollingCode && setRollingCode(reply.rollingCode);
    switch (reply.status) {
      case "SUCCESS_CODE":
        break;
      case "SUCCESS_LOGGED_IN":
        login(reply.token);
        break;
      case "SUCCESS_ACTIVATING_USER":
        setScreen("sent-code-activate");
        break;
      case "SUCCESS_RECOVERING_USER":
        setScreen("sent-code-recovery");
        break;
      case "SUCCESS_VALID_PURPOSE":
        saveOnStorage("code", code.current);
        saveOnStorage("action", "recovery");
        navigate("/recovery");
        break;
      case "SUCCESS_REGISTERED_USER":
        saveOnStorage("username", username.current);
        saveOnStorage("action", "activate");
        navigate("/activate");
        break;
      case "SUCCESS_TOKEN":
        navigate("/logged");
        break;
    }
  };

  const onError = (reply: serverReplyType) => {
    switch(reply.status){
      case "ERROR_AUTHENTICATION":
        showPopup(loginTexts.noAccount, {
          type: "warning-failure",
          timeout: 4000,
        });
        break;
      case "ERROR_NO_REGISTERED_USER":
        showPopup(loginTexts.emailNotRegistered, {
          type: "warning-failure",
          timeout: 4000,
        });
        break;
      case "ERROR_EMAIL_ALREADY_TAKEN":
        showPopup(loginTexts.emailAlreadyExists, {
          type: "warning-failure",
          timeout: 4000,
        });
        break;
      case "ERROR_USERNAME_ALREADY_TAKEN":
        showPopup(loginTexts.nameAlreadyExists, {
          type: "warning-failure",
          timeout: 4000,
        });
        break;
      case "ERROR_NO_ACTIVATING_USER":
      case "ERROR_NO_RECOVERING_USER":
        showPopup(loginTexts.invalidCode, {
          type: "warning-failure",
          timeout: 4000,
        });
      break;
    }
  }

  const request = (link: string, params: any) => {
    postRequest({link, params, onSuccess, onError, setWaitingResponse});
  };

  const onButtonClick = () => {
    switch (screen) {
      case "sign-in":
        request("/login", {
          name: username.current,
          password: password.current,
          rollingCode,
        });
        break;
      case "sign-up":
        request("/activate", {
          name: username.current,
          password: password.current,
          email: email.current,
          lang: language,
          rollingCode,
        });
        break;
      case "forgot-password":
        request("/recovery", {
          email: email.current,
          lang: language,
          rollingCode,
        });
        break;
      case "sent-code-activate":
      case "sent-code-recovery":
        const codePurpose = screen.split("-").at(2);
        request("/validate", {
          code: code.current,
          purpose: codePurpose,
          rollingCode, 
        });
        break;
    }
  };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if(!rollingCode){
      const link = "/rolling-code";
      postRequest({link, onSuccess, onError});
    } else {
      const token = getFromStorage(tokenKey);
      if(token){
        const link = "/token";
        const params = { rollingCode };
        postRequest({link, token, params, onSuccess, onError});
      }
    }
  }, [rollingCode]);

  useEffect(() => {
    if (keyPressed === "Enter" && checkAllInputs()) {
      onButtonClick();
    }
  }, [keyPressed]);

  useLayoutEffect(() => {
    vanish([emailRef.current, repPassRef.current, codeRef.current]);
    move(
      [
        nameRef.current,
        emailRef.current,
        passRef.current,
        repPassRef.current,
        hintRef.current,
        buttonRef.current,
        codeRef.current,
      ],
      { y: 90 }
    );
  }, []);

  useLayoutEffect(() => {
    const lang = texts.get(language);
    switch (screen) {
      case "sign-in":
        setHintText(lang.forgotMyPassword);
        setButtonText(lang.buttonSignIn);
        spawnAndMove([nameRef.current], { y: 90 }, 1);
        spawnAndMove([passRef.current], { y: 150 }, 1);
        move([logoRef.current], { y: 0 }, {duration: 1});
        move([hintRef.current], { y: 220 }, {duration: 1});
        move([buttonRef.current], { y: 300 }, {duration: 1});
        moveAndVanish([emailRef.current, codeRef.current], { y: 90 }, 1);
        moveAndVanish([repPassRef.current], { y: 150 }, 1);
        spawn([signUpRef.current], 1);
        break;
      case "sign-up":
        setHintText(lang.signUpHint);
        setButtonText(lang.buttonSignUp);
        move([logoRef.current], { y: -75 }, {duration: 1});
        move([nameRef.current], { y: 0 }, {duration: 1});
        spawnAndMove([emailRef.current], { y: 60 }, 1);
        move([passRef.current], { y: 120 }, {duration: 1});
        spawnAndMove([repPassRef.current], { y: 180 }, 1);
        move([hintRef.current], { y: 260 }, {duration: 1});
        move([buttonRef.current], { y: 340 }, {duration: 1});
        vanish([signUpRef.current], 1);
        break;
      case "forgot-password":
        setHintText(lang.enterEmail);
        setButtonText(lang.buttonSend);
        spawn([emailRef.current], 1);
        vanish([nameRef.current], 0.3);
        moveAndVanish([passRef.current, repPassRef.current], { y: 90 }, 1);
        move([hintRef.current], { y: 160 }, { duration: 1});
        move([buttonRef.current], { y: 240 }, { duration: 1});
        vanish([signUpRef.current], 1);
        break;
      case "sent-code-activate":
      case "sent-code-recovery":
        setHintText((screen === "sent-code-activate")? lang.willSendSignUpEmail: lang.willSendRecoverEmail);
        moveAndVanish([nameRef.current, emailRef.current, passRef.current, repPassRef.current], { y: 90 }, 1);
        setButtonText(lang.verify);
        spawn(codeRef.current, 1);
        move(logoRef.current, { y: 0 }, { duration: 1});        
        move(hintRef.current, { y: 170 }, { duration: 1});
        move([buttonRef.current], { y: 280 }, { duration: 1});
        vanish([signUpRef.current], 1);
        break;
    }
    handleButtonStatus();
  }, [screen, language]);


  return (
    <Background>
      <Header lang arrow={canGoBack ? () => setScreen("sign-in") : null} />
      <Content>
        <TopContent>
          <LogoDiv ref={logoRef}>
            <Logo color={colors.black} fontSize={innerHeight > 750 ? 50 : 45} />
          </LogoDiv>
          <Credentials>
            <Gsap ref={nameRef}>
              <Credential
                zIndex={10}
                title={loginTexts.user}
                disabled={waitingResponse}
                onChange={(e) => {
                  username.current = e;
                  handleButtonStatus();
                }}
              />
            </Gsap>
            <Gsap ref={emailRef}>
              <Credential
                inputLimit={50}
                zIndex={8}
                title={loginTexts.email}
                disabled={waitingResponse}
                onChange={(e) => {
                  email.current = e;
                  handleButtonStatus();
                }}
              />
            </Gsap>
            <Gsap ref={passRef}>
              <Credential
                safe
                zIndex={10}
                title={loginTexts.password}
                disabled={waitingResponse}
                onChange={(e) => {
                  password.current = e;
                  handleButtonStatus();
                }}
              />
            </Gsap>
            <Gsap ref={repPassRef}>
              <Credential
                safe
                zIndex={8}
                title={loginTexts.repeatPassword}
                disabled={waitingResponse}
                onChange={(e) => {
                  repPassword.current = e;
                  handleButtonStatus();
                }}
              />
            </Gsap>
            <Gsap ref={codeRef}>
              <Credential
                uppercased
                zIndex={8}
                title={loginTexts.code}
                disabled={waitingResponse}
                onChange={(e) => {
                  code.current = e;
                }}
              />
            </Gsap>
          </Credentials>
          <HintGsap ref={hintRef}>
            <HintText
              onClick={() => {
                !waitingResponse &&
                  screen === "sign-in" &&
                  setScreen("forgot-password");
              }}
              style={
                screen.includes("sent")
                  ? { maxWidth: innerHeight < 750 ? "290px" : "320px" }
                  : null
              }>
              {hintText}
            </HintText>
          </HintGsap>
          <Gsap ref={buttonRef}>
            <Button
              disabled={buttonDisabled}
              loading={waitingResponse}
              onClick={onButtonClick}>
              {buttonText}
            </Button>
          </Gsap>
        </TopContent>
        <BottomContent>
          <DiscreteText ref={signUpRef}>
            {loginTexts.haventSignedUpYet}&nbsp;
            <Bold onClick={() => !waitingResponse && setScreen("sign-up")}>
              {loginTexts.buttonSignUp}
            </Bold>
          </DiscreteText>
        </BottomContent>
      </Content>
    </Background>
  );
}
