import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isEmailValid, isPasswordValid } from "src/functions";
import {
  move,
  moveAndVanish,
  spawn,
  spawnAndMove,
  vanish,
} from "src/functions/animation";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { colors } from "src/colors";
import { texts } from "./Login.lang";
import { api } from "src/services/api";
import { Background, Header, Credential, Button, Logo } from "components/index";
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
type screenType =
  | "sign-in"
  | "sign-up"
  | "forgot-password"
  | "sent-sign-up-email"
  | "sent-recovery-email";
type serverReplyType =
  | "SUCCESS"
  | "SUCCESS_LOGGED_IN"
  | "SUCCESS_ACTIVATING_USER"
  | "SUCCESS_RECOVERING_USER"
  | "ERROR"
  | "ERROR_USERNAME_ALREADY_TAKEN"
  | "ERROR_EMAIL_ALREADY_TAKEN"
  | "ERROR_NO_REGISTERED_USER"
  | "ERROR_EMAIL"
  | "ERROR_AUTHENTICATION"
  | "ERROR_MISSING_CREDENTIALS";

export default function Login() {
  const navigate = useNavigate();
  const { language, innerHeight, keyPressed, setUser, showPopup } =
    useGlobalContext();
  const loginTexts = texts.get(language);
  const [screen, setScreen] = useState<screenType>(() => "sign-in");
  const [hintText, setHintText] = useState<string>(
    () => loginTexts.forgotMyPassword
  );
  const [buttonText, setButtonText] = useState<string>(
    () => loginTexts.buttonSignIn
  );
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(() => true);
  const [waitingForServer, setWaitingForServer] = useState<boolean>(
    () => false
  );
  const canGoBack =
    !waitingForServer && (screen === "sign-up" || screen === "forgot-password");

  const username = useRef<string>("");
  const email = useRef<string>("");
  const password = useRef<string>("");
  const repPassword = useRef<string>("");

  const logoRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const repPassRef = useRef(null);
  const hintRef = useRef(null);
  const signUpRef = useRef(null);
  const buttonRef = useRef(null);

  const getRequest = (link: string, params: any, catchCall?: () => void) => {
    setWaitingForServer(true);
    api
      .get(link, { params })
      .then((resp) => {
        handleServerReply(resp.data.msg);
        setWaitingForServer(false);
      })
      .catch(() => {
        catchCall && catchCall();
        setWaitingForServer(false);
      });
  };

  const login = () => {
    setUser({
      name: username.current,
      password: password.current,
    });
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
      default:
        return isEmailValid(email.current);
    }
  };

  const handleButtonStatus = () => {
    setButtonDisabled(!checkAllInputs());
  };

  const handleServerReply = (reply: serverReplyType) => {
    switch (reply) {
      case "SUCCESS_LOGGED_IN":
        login();
        break;
      case "SUCCESS_ACTIVATING_USER":
        setScreen("sent-sign-up-email");
        break;
      case "SUCCESS_RECOVERING_USER":
        setScreen("sent-recovery-email");
        break;
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
      default:
        showPopup(loginTexts.somethingWentWrong, {
          type: "warning-failure",
          timeout: 4000,
        });
        break;
    }
  };

  const onButtonClick = () => {
    switch (screen) {
      case "sign-in":
        getRequest("/login", {
          name: username.current,
          password: password.current,
        });
        break;
      case "sign-up":
        getRequest("/activate", {
          name: username.current,
          password: password.current,
          email: email.current,
          lang: language,
        });
        break;
      case "forgot-password":
        getRequest("/recovery", {
          email: email.current,
          lang: language,
        });
        break;
      case "sent-recovery-email":
      case "sent-sign-up-email":
        setScreen("sign-in");
        break;
    }
  };

  useEffect(() => {
    if (keyPressed === "Enter" && checkAllInputs()) {
      onButtonClick();
    }
  }, [keyPressed]);

  useLayoutEffect(() => {
    vanish([emailRef.current, repPassRef.current]);
    move(
      [
        nameRef.current,
        emailRef.current,
        passRef.current,
        repPassRef.current,
        hintRef.current,
        buttonRef.current,
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
        move([logoRef.current], { y: 0 }, 1);
        move([hintRef.current], { y: 220 }, 1);
        move([buttonRef.current], { y: 300 }, 1);
        moveAndVanish([emailRef.current], { y: 90 }, 1);
        moveAndVanish([repPassRef.current], { y: 150 }, 1);
        spawn([signUpRef.current], 1);
        break;
      case "sign-up":
        setHintText(lang.signUpHint);
        setButtonText(lang.buttonSignUp);
        move([logoRef.current], { y: -75 }, 1);
        move([nameRef.current], { y: 0 }, 1);
        spawnAndMove([emailRef.current], { y: 60 }, 1);
        move([passRef.current], { y: 120 }, 1);
        spawnAndMove([repPassRef.current], { y: 180 }, 1);
        move([hintRef.current], { y: 260 }, 1);
        move([buttonRef.current], { y: 340 }, 1);
        vanish([signUpRef.current], 1);
        break;
      case "forgot-password":
        setHintText(lang.enterEmail);
        setButtonText(lang.buttonSend);
        spawn([emailRef.current], 1);
        vanish([nameRef.current], 0.3);
        moveAndVanish([passRef.current], { y: 90 }, 1);
        moveAndVanish([repPassRef.current], { y: 90 }, 1);
        move([hintRef.current], { y: 160 }, 1);
        move([buttonRef.current], { y: 240 }, 1);
        vanish([signUpRef.current], 1);
        break;
      case "sent-sign-up-email":
      case "sent-recovery-email":
        const text =
          screen === "sent-sign-up-email"
            ? lang.willSendSignUpEmail
            : lang.willSendRecoverEmail;
        setHintText(text);
        setButtonText(lang.goBack);
        moveAndVanish(
          [
            nameRef.current,
            emailRef.current,
            passRef.current,
            repPassRef.current,
          ],
          { y: 0 },
          1
        );
        move([logoRef.current], { y: 0 }, 1);
        move([hintRef.current], { y: 90 }, 1);
        move([buttonRef.current], { y: 190 }, 1);
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
                disabled={waitingForServer}
                onChange={(e) => {
                  username.current = e;
                  handleButtonStatus();
                }}
              />
            </Gsap>
            <Gsap ref={emailRef}>
              <Credential
                zIndex={8}
                title={loginTexts.email}
                disabled={waitingForServer}
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
                disabled={waitingForServer}
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
                disabled={waitingForServer}
                onChange={(e) => {
                  repPassword.current = e;
                  handleButtonStatus();
                }}
              />
            </Gsap>
          </Credentials>
          <HintGsap ref={hintRef}>
            <HintText
              onClick={() => {
                !waitingForServer &&
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
              loading={waitingForServer}
              onClick={onButtonClick}>
              {buttonText}
            </Button>
          </Gsap>
        </TopContent>
        <BottomContent>
          <DiscreteText ref={signUpRef}>
            {loginTexts.haventSignedUpYet}&nbsp;
            <Bold onClick={() => !waitingForServer && setScreen("sign-up")}>
              {loginTexts.buttonSignUp}
            </Bold>
          </DiscreteText>
        </BottomContent>
      </Content>
    </Background>
  );
}
