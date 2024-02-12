import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HappeningNow, HappeningLater, MenuButtons } from "./components/index";
import { move, resize, spawn, vanish } from "src/functions/animation";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { isAfter, isBefore } from "src/functions/time";
import { activityType } from "src/types";
import { useTime } from "src/hooks/time";
import { texts } from "./Dashboard.lang";
import { Notes } from "src/components";
import { Background, BigBold, SubTitle, BigTitle, MainContent, TopTexts, Section, SectionTitle, BottomContainer } from "./Dashboard.style";

interface props {
  show: boolean;
}

export default function Dashboard({ show }: props) {
  const { language, innerHeight, showPopup, hidePopup } = useGlobalContext();
  const { today, weekActivities, addActivity, deleteActivity, goTo } = useLoggedContext();
  const [hour, minute] = useTime();
  const [happeningNow, setHappeningNow] = useState<activityType | undefined>(() => null);
  const [happeningLater, setHappeningLater] = useState<activityType[] | undefined>(() => null);
  const [takingNotes, setTakingNotes] = useState<activityType>(() => null);

  const nowTitleRef = useRef(null);
  const laterTitleRef = useRef(null);
  const mainContentRef = useRef(null);
  const menuButtonsRef = useRef(null);
  const nowSectionRef = useRef(null);
  const laterSectionRef = useRef(null);
  const loggedTexts = texts.get(language);
  

  const updateNotes = (activity: activityType, notes: string[]) => {
    const oldOne = activity;
    const newOne = { ...activity, notes };
    deleteActivity({ activity: oldOne, day: today });
    addActivity({ activity: newOne, day: today });
  };

  useEffect(() => {
    const activityList = weekActivities ? weekActivities[today] : [];
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
      activityList
        .filter((act) => isAfter(act.startsAt, { hour, minute }, true))
        .sort(
          (a, b) =>
            a.startsAt.hour * 60 +
            a.startsAt.minute -
            (b.startsAt.hour * 60 + a.startsAt.minute)
        )
    );
  }, [weekActivities, hour, minute]);

  useEffect(() => {
    takingNotes &&
      showPopup(
        <Notes
          activity={takingNotes}
          onNotesUpdate={(notes) => {
            updateNotes(takingNotes, notes);
            hidePopup();
            setTakingNotes(null);
          }}
        />,
        { type: "prompt" }
      );
  }, [takingNotes]);

  useEffect(() => {
    const notesButtonHeight = innerHeight > 750 ? 20 : 21;
    const dy = happeningNow ? notesButtonHeight : 0;
    const nowHeight = (innerHeight > 750 ? 240 : 175) + dy;
    const laterHeight = (innerHeight > 750 ? 300 : 190) - dy;

    move(laterSectionRef.current, { y: dy }, 1);
    resize(nowSectionRef.current, { height: nowHeight }, 1);
    resize(laterSectionRef.current, { height: laterHeight }, 1);
  }, [happeningNow, innerHeight]);

  useLayoutEffect(() => {
    if (!show) {
      vanish([mainContentRef.current]);
      move(menuButtonsRef.current, { y: 200 }, 0);
    } else {
      spawn(mainContentRef.current, 1, 0.15);
      move(nowTitleRef.current, { x: 0 }, 1, 0.15);
      move(laterTitleRef.current, { x: 0 }, 1, 0.7);
      move(menuButtonsRef.current, { y: 0 }, 1, 1.5);
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
            <BigBold>{loggedTexts.days[today]}</BigBold>
          </BigTitle>
          <SubTitle>{loggedTexts.placeholders[today]}</SubTitle>
        </TopTexts>
        <Section ref={nowSectionRef}>
          <SectionTitle ref={nowTitleRef}>
            {loggedTexts.happeningNow}
          </SectionTitle>
          <HappeningNow
            show={show}
            happeningNow={happeningNow}
            onNotesClick={() => setTakingNotes(happeningNow)}
          />
        </Section>
        <Section ref={laterSectionRef}>
          <SectionTitle ref={laterTitleRef}>
            {loggedTexts.whatsNext}
          </SectionTitle>
          <HappeningLater show={show} happeningLater={happeningLater} />
        </Section>
      </MainContent>
      <BottomContainer ref={menuButtonsRef}>
        <MenuButtons
          show={show}
          onListsClick={() => goTo("lists")}
          onWeekClick={() =>  goTo("activities")}
        />
      </BottomContainer>
    </Background>
  );
}