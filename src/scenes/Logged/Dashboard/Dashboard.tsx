import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { move, resize, spawn, vanish } from "src/functions/animation";
import { activityType, dayType } from "src/types";
import { texts } from "./Dashboard.lang";
import { useTime } from "src/hooks/time";
import { isAfter, isBefore } from "src/functions/time";
import { HappeningNow, HappeningLater, RoundButton } from "./components/index";
import {
  Background,
  BigBold,
  SubTitle,
  BigTitle,
  MainContent,
  TopTexts,
  Section,
  SectionTitle,
} from "./Dashboard.style";

interface props {
  todayIndex: number;
  show: boolean;
  weekActivities: activityType[][],
  todoList: string[],
  shoppingList: string[],
  onAddbuttonClick: () => void,
}

export default function Dashboard({todayIndex, show, weekActivities, todoList, shoppingList, onAddbuttonClick} : props) {
  const { language, innerHeight, showPopup } = useGlobalContext();
  const [hour, minute] = useTime();
  const [happeningNow, setHappeningNow] = useState<activityType | undefined>();
  const [happeningLater, setHappeningLater] = useState<activityType[] | undefined>();

  const nowTitleRef = useRef(null);
  const laterTitleRef = useRef(null);
  const mainContentRef = useRef(null);
  const laterSectionRef = useRef(null);
  const loggedTexts = texts.get(language);


  useEffect(() => {
    const activityList = weekActivities? weekActivities[todayIndex] : [];
    setHappeningNow(
      activityList
        .filter((act) => {
          return (
            isBefore(act.startsAt, { hour, minute }) &&
            isAfter(act.endsAt, { hour, minute })
          );
        })
        .at(0)
    );
    setHappeningLater(
      activityList.filter((act) =>
        isAfter(act.startsAt, { hour, minute }, true)
      ).sort((a, b) => (
        (a.startsAt.hour*60 + a.startsAt.minute) - (b.startsAt.hour*60 + a.startsAt.minute)
      ))
    );
  }, [weekActivities, hour, minute]);

  useEffect(() => {
    const dy = innerHeight > 750 ? -50 : -30;
    const newHeight = (innerHeight > 750 ? 250 : 200) - dy;
    move(laterSectionRef.current, { y: happeningNow ? 0 : dy }, 1);
    resize(laterSectionRef.current, { height: newHeight }, 1);
  }, [happeningNow, innerHeight]);

  useLayoutEffect(() => {
    if (!show) {
      vanish([mainContentRef.current]);
    } else {
      spawn(mainContentRef.current, 1, 0.15);
      move(nowTitleRef.current, { x: 0 }, 1, 0.15);
      move(laterTitleRef.current, { x: 0 }, 1, 0.7);
    }
  }, [show]);

  useLayoutEffect(() => {
    move(nowTitleRef.current, { x: -400 });
    move(laterTitleRef.current, { x: -400 });
  }, []);

  return (
    <Background>
      <MainContent ref={mainContentRef}>
        <TopTexts>
          <BigTitle>
            {loggedTexts.todayIs}
            &nbsp;
            <BigBold>{loggedTexts.days[todayIndex]}</BigBold>
          </BigTitle>
          <SubTitle>{loggedTexts.placeholders[todayIndex]}</SubTitle>
        </TopTexts>
        <Section style={{ height: innerHeight / 3 }}>
          <SectionTitle ref={nowTitleRef}>
            {loggedTexts.happeningNow}
          </SectionTitle>
          <HappeningNow
            show={show}
            happeningNow={happeningNow}
            onNotesClick={() => showPopup("//TODO")}
          />
        </Section>
        <Section ref={laterSectionRef}>
          <SectionTitle ref={laterTitleRef}>
            {loggedTexts.whatsNext}
          </SectionTitle>
          <HappeningLater
            show={show}
            happeningLater={happeningLater}
          />
        </Section>
      </MainContent>
      <RoundButton
        show={show}
        onClick={onAddbuttonClick}
      />
    </Background>
  );
}
