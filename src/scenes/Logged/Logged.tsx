import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { activityType } from "src/types";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { useNavigate } from "react-router-dom";
import { move, resize, spawn, vanish } from "src/functions/animation";
import { api } from "src/services/api";
import { texts } from "./Logged.lang";
import { useTime } from "src/hooks/time";
import { isAfter, isBefore } from "src/functions/time";
import { Background, Header, Loading } from "src/components";
import { HappeningNow, HappeningLater, RoundButton } from "./components/index";
import {
  BigBold,
  SubTitle,
  BigTitle,
  MainContent,
  TopTexts,
  Section,
  SectionTitle,
  Gsap,
} from "./Logged.style";

type serverReplyType =
  | "SUCCESS"
  | "SUCCESS_ACTIVITIES"
  | "ERROR"
  | "ERROR_NO_REGISTERED_USER"
  | "ERROR_MISSING_CREDENTIALS";

export default function LoggedIn() {
  const navigate = useNavigate();
  const { language, innerHeight, user, showPopup } = useGlobalContext();
  const [hour, minute] = useTime();
  const [activities, setActivities] = useState<activityType[]>([]);
  const [happeningNow, setHappeningNow] = useState<activityType | undefined>();
  const [waitingForServer, setWaitingForServer] = useState<boolean>(() => true);
  const [receivedFirstContent, setReceivedFirstContent] = useState<boolean>(
    () => false
  );

  const date = new Date();
  const dayIndex = date.getDay();
  const mainContentRef = useRef(null);
  const loadingRef = useRef(null);
  const loggedTexts = texts.get(language);

  const nowTitleRef = useRef(null);
  const laterTitleRef = useRef(null);
  const laterSectionRef = useRef(null);

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

  const getActivitiesFromServerReply = (reply: serverReplyType) => {
    const stringifiedActivities = reply.split("==").at(1);
    if (!stringifiedActivities) {
      showPopup(loggedTexts.errorFetchingActivities);
      return;
    }
    setActivities(JSON.parse(stringifiedActivities));
    setReceivedFirstContent(true);
  };

  const handleServerReply = (reply: serverReplyType) => {
    switch (reply) {
      case "ERROR":
      case "ERROR_MISSING_CREDENTIALS":
      case "ERROR_NO_REGISTERED_USER":
        showPopup(loggedTexts.somethingWentWrong);
        break;
      default:
        if (reply.includes("SUCCESS_ACTIVITIES")) {
          getActivitiesFromServerReply(reply);
        }
        break;
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getRequest("/get-activities", { ...user });
    }
  }, []);

  useEffect(() => {
    setHappeningNow(
      activities
        .filter((act) => {
          return (
            isBefore(act.startsAt, { hour, minute }) &&
            isAfter(act.endsAt, { hour, minute })
          );
        })
        .at(0)
    );
  }, [activities, hour, minute]);

  useEffect(() => {
    const dy = innerHeight > 750 ? -50 : -30;
    const newHeight = (innerHeight > 750 ? 250 : 200) - dy;
    move(laterSectionRef.current, { y: happeningNow ? 0 : dy }, 1);
    resize(laterSectionRef.current, { height: newHeight }, 1);
  }, [happeningNow, innerHeight]);

  useLayoutEffect(() => {
    if (!receivedFirstContent) {
      vanish([mainContentRef.current, loadingRef.current]);
      spawn(loadingRef.current, 1);
    } else {
      vanish(loadingRef.current, 1);
      spawn(mainContentRef.current, 1, 0.15);
      move(nowTitleRef.current, { x: 0 }, 1, 0.15);
      move(laterTitleRef.current, { x: 0 }, 1, 0.7);
    }
  }, [receivedFirstContent]);

  useLayoutEffect(() => {
    move(nowTitleRef.current, { x: -400 });
    move(laterTitleRef.current, { x: -400 });
  }, []);

  return (
    <Background>
      <Header logo user show={receivedFirstContent} />
      <MainContent ref={mainContentRef}>
        <TopTexts>
          <BigTitle>
            {loggedTexts.todayIs}
            &nbsp;
            <BigBold>{loggedTexts.days[dayIndex]}</BigBold>
          </BigTitle>
          <SubTitle>{loggedTexts.placeholders[dayIndex]}</SubTitle>
        </TopTexts>
        <Section style={{ height: innerHeight / 3 }}>
          <SectionTitle ref={nowTitleRef}>
            {loggedTexts.happeningNow}
          </SectionTitle>
          <HappeningNow
            show={receivedFirstContent}
            happeningNow={happeningNow}
            onNotesClick={() => null}
          />
        </Section>
        <Section ref={laterSectionRef}>
          <SectionTitle ref={laterTitleRef}>
            {loggedTexts.whatsNext}
          </SectionTitle>
          <HappeningLater show={receivedFirstContent} activities={activities} />
        </Section>
      </MainContent>
      <RoundButton
        show={receivedFirstContent}
        onClick={() => showPopup("//TODO")}
      />
      <Gsap ref={loadingRef}>
        <Loading />
      </Gsap>
    </Background>
  );
}
