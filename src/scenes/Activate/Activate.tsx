import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { useNavigate } from "react-router-dom";
import { texts } from "./Activate.lang";
import { getAndRemoveFromStorage } from "src/functions/storage";
import { Header, Background, Button } from "components/index";
import { spawn, spawnAndMove } from "src/functions/animation";
import {
  Bold,
  Gsap,
  HintText,
  Content,
  WelcomeText,
} from "./Activate.style";

export default function Activate() {
  const navigate = useNavigate();
  const { language } = useGlobalContext();
  const [ username, setUsername ] = useState<string>();
  const activateTexts = texts.get(language);
  const contentRef = useRef(null);

  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const name = getAndRemoveFromStorage("username");
    const action = getAndRemoveFromStorage("action");
    if((!action) || (action !== "activate")) navigate("/login");
    setUsername(name);
  }, []);

  useLayoutEffect(() => {
    spawn(titleRef.current, 1);
    spawnAndMove(textRef.current, {y: 60}, 1);
    spawnAndMove(buttonRef.current, {y: 200}, 1);
  }, []);

  return (
    <Background>
      <Header logo lang />
      <Content ref={contentRef}>
        <Gsap ref={titleRef}>
          <WelcomeText>
            {activateTexts.welcome}
          </WelcomeText>
        </Gsap>
        <Gsap ref={textRef}>
        <HintText>
          {activateTexts.hello}
          <Bold>
            {`, ${username}! `}
          </Bold>
          {activateTexts.activationWasSuccessful}
        </HintText>
        </Gsap>
        <Gsap ref={buttonRef}>
        <Button onClick={() => navigate("/login")}>
          {activateTexts.ok}
        </Button>
        </Gsap>
      </Content>
    </Background>
  );
}
