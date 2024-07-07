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
  const { language, innerWidth, innerHeight, showPopup, hidePopup } = useGlobalContext();
  const { today, weekActivities, addActivity, deleteActivity, goTo } = useLoggedContext();
  const { hour, minute } = useTime();
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
    deleteActivity({ activity: oldOne, day: today });       // brute force update instead of using updateActivity() because the dashboard can't select an activity
    addActivity({ activity: newOne, day: today }, true);
  };

  useEffect(() => {
    const activityList = weekActivities[today]?? [];
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
      showPopup({type: "prompt", text: (
        <Notes
          activity={takingNotes}
          onNotesUpdate={(notes) => {
            updateNotes(takingNotes, notes);
            hidePopup();
            setTakingNotes(null);
          }}
        />
      )},{
        blur: true,
      }
    );
  }, [takingNotes]);

  useEffect(() => {
    const notesButtonHeight = innerHeight > 750 ? 20 : 21;
    const dy = happeningNow ? notesButtonHeight : 0;
    const nowHeight = (innerHeight > 750 ? 240 : 175) + dy;
    const laterHeight = (innerHeight > 750 ? 300 : 190) - dy;

    move(laterSectionRef.current, { y: dy }, {duration: 1});
    resize(nowSectionRef.current, { height: nowHeight }, 1);
    resize(laterSectionRef.current, { height: laterHeight }, 1);
  }, [happeningNow, innerHeight]);

  useLayoutEffect(() => {    
    move(nowTitleRef.current, {
      x: show? 0 : -innerWidth, 
    }, {
      duration: show? 1 : 0,
      delay: show? 0.15 : 0,
    });
    move(laterTitleRef.current, {
      x: show? 0 : -innerWidth, 
    }, {
      duration: show? 1 : 0,
      delay: show? 0.7 : 0,
    });
    move(menuButtonsRef.current, {
      y: show? 0 : 200,
    }, {
      duration: show? 1 : 0,
      delay: show? 1.5 : 0,
    });

    if(show){
      spawn(mainContentRef.current, 1, 0.15);
    } else {
      vanish([mainContentRef.current]);
    }
  }, [show]);

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
