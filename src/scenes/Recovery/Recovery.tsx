import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import {
  moveAndVanish,
  spawn,
  spawnAndMove,
  vanish,
} from "src/functions/animation";
import {
  Loading,
  Header,
  Background,
  Button,
  Credential,
} from "components/index";
import { isPasswordValid } from "src/functions";
import { texts } from "./Recovery.lang";
import { api } from "src/services/api";
import { Gsap, HintText, LoadingDiv, Content, Title } from "./Recovery.style";

const MIN_PASSWORD_SIZE = 8;

type screenType = "input" | "success" | "failure";
type serverReply =
  | "SUCCESS_RECOVERED_USER"
  | "SUCCESS_VALID_PURPOSE"
  | "ERROR_INVALID_PURPOSE"
  | "ERROR_NO_RECOVERING_USER"
  | "ERROR_AUTHENTICATION";

const getQueryString = () => {
  const query = useSearchParams();
  const id = query[0].get("id");
  const lang = query[0].get("lang");
  return { id, lang };
};

export default function Recovery() {
  const navigate = useNavigate();
  const { id, lang } = getQueryString();
  const { language, keyPressed, setLanguage } = useGlobalContext();
  const recoveryTexts = texts.get(language);
  const [screen, setScreen] = useState<screenType>(() => "input");
  const [titleText, setTitleText] = useState<string>(
    () => recoveryTexts.createNewPassword
  );
  const [hintText, setHintText] = useState<string>(
    () => recoveryTexts.newPasswordHint
  );
  const [buttonText, setButtonText] = useState<string>(
    () => recoveryTexts.send
  );
  const [hasValidated, setHasValidated] = useState<boolean>(() => false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(() => true);
  const [waitingForServer, setWaitingForServer] = useState<boolean>(
    () => false
  );

  const password = useRef<string>("");
  const repPassword = useRef<string>("");
  const oldPassword = useRef<string>("");

  const contentRef = useRef(null);
  const loadingRef = useRef(null);
  const titleRef = useRef(null);
  const passRef = useRef(null);
  const repPassRef = useRef(null);
  const hintRef = useRef(null);
  const buttonRef = useRef(null);

  const thingsGoneWrong = () => {
    setScreen("failure");
    setHasValidated(true);
  };

  const getRequest = (link: string, params: any, catchCall?: () => void) => {
    setWaitingForServer(true);
    api
      .get(link, { params })
      .then((resp) => {
        handleServerReply(resp.data.status);
      })
      .catch(() => {
        catchCall && catchCall();
        setWaitingForServer(false);
      });
  };

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
  };

  const handleServerReply = (reply: serverReply) => {
    switch (reply) {
      case "SUCCESS_VALID_PURPOSE":
        setHasValidated(true);
        break;
      case "SUCCESS_RECOVERED_USER":
        setScreen("success");
        break;
      case "ERROR_INVALID_PURPOSE":
        thingsGoneWrong();
        break;
      case "ERROR_AUTHENTICATION":
      case "ERROR_NO_RECOVERING_USER":
        setScreen("failure");
        break;
    }
    setWaitingForServer(false);
  };

  const onButtonClick = () => {
    switch (screen) {
      case "input":
        getRequest("/change-password", {
          id: id,
          password: password.current,
        });
        break;
      case "success":
      case "failure":
        navigate("/");
        break;
    }
  };

  useEffect(() => {
    if (keyPressed === "Enter" && checkInputs()) {
      onButtonClick();
    }
  }, [keyPressed]);

  useEffect(() => {
    setLanguage(lang === "en-us" ? lang : "pt-br");
    if (id && id.length) {
      oldPassword.current = id.split("*").at(0);
      getRequest(
        "/validate",
        {
          id: id,
          purpose: "recover",
        },
        thingsGoneWrong
      );
    } else {
      navigate("/");
    }
  }, []);

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
    if (!hasValidated) {
      spawn(loadingRef.current);
    } else {
      vanish(loadingRef.current, 0.5);
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
    }
  }, [hasValidated, screen, language]);

  return (
    <Background>
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
            disabled={waitingForServer}
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
            disabled={waitingForServer}
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
          <Button disabled={buttonDisabled} onClick={onButtonClick}>
            {buttonText}
          </Button>
        </Gsap>
      </Content>
      <LoadingDiv ref={loadingRef}>
        <Loading />
      </LoadingDiv>
    </Background>
  );
}
