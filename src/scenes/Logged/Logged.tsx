import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { moveAndVanish, spawn, spawnAndMove, vanish } from "src/functions/animation";
import { useNavigate } from "react-router-dom";
import { activityType } from "src/types";
import { emptyWeek } from "src/constants";
import { useTime } from "src/hooks/time";
import { texts } from "./Logged.lang";
import { api } from "src/services/api";
import { Background, Header, Loading } from "src/components";
import { BigContainer, Gsap, SmallContainer } from "./Logged.style";
import Dashboard from "./Dashboard";
import Activities from "./Activities";
import NewActivity from "./NewActivity";

type serverReplyType =
  | "SUCCESS"
  | "SUCCESS_DATA"
  | "ERROR"
  | "ERROR_NO_REGISTERED_USER"
  | "ERROR_MISSING_CREDENTIALS";

type screens = "dashboard" | "activities" | "new-activity" ;

export default function Logged() {
  const navigate = useNavigate();
  const { language, user, innerWidth, showPopup } = useGlobalContext();
  const [ hour ] = useTime();
  const [screen, setScreen] = useState<screens>(() => "dashboard");
  const [dayIndex, setDayIndex] = useState<number>(0);
  const [todoList, setTodoList] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<string[]>(() => []);
  const [weekActivities, setWeekActivities] = useState<activityType[][]>(() => emptyWeek);
  const [waitingForServer, setWaitingForServer] = useState<boolean>(() => true);
  const [receivedFirstContent, setReceivedFirstContent] = useState<boolean>(
    () => false
  );

  const loadingRef = useRef(null);
  const dashboardRef = useRef(null);
  const activitiesRef = useRef(null);
  const newActivityRef = useRef(null);
  const loggedTexts = texts.get(language);

   

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

  const getDataFromServerReply = (reply: serverReplyType) => {
    const stringifiedData = reply.split("==");
    if (!stringifiedData || stringifiedData.length < 4) {
      showPopup(loggedTexts.errorFetchingData);
      return;
    }
    setWeekActivities(JSON.parse(stringifiedData.at(1)));
    setTodoList(JSON.parse(stringifiedData.at(2)));
    setShoppingList(JSON.parse(stringifiedData.at(3)));
    setTimeout(() => setReceivedFirstContent(true), 2000);
  };

  const handleServerReply = (reply: serverReplyType) => {
    switch (reply) {
      case "ERROR":
      case "ERROR_MISSING_CREDENTIALS":
      case "ERROR_NO_REGISTERED_USER":
        showPopup(loggedTexts.somethingWentWrong);
        break;
      default:
        if (reply.includes("SUCCESS_DATA")) {
          getDataFromServerReply(reply);
        }
        break;
    }
  };

  useEffect(() => {
    if (!user) {                                         
      navigate("/login");
    } else {
      getRequest("/get-user-data", { ...user });
    }
  }, []);

  useEffect(() => {
    const date = new Date();
    setDayIndex((date.getDay() + 6) % 7);       //here, 0 equals monday and 6 equals sunday. Fuck the system
  }, [hour]);

  useLayoutEffect(() => {
    spawnAndMove(dashboardRef.current, {x: 0});
    moveAndVanish([activitiesRef.current, newActivityRef.current], {x: 1.4 * innerWidth});
  }, []);

  useLayoutEffect(() => {
    if (!receivedFirstContent) {
      spawn(loadingRef.current, 1);
    } else {
      vanish(loadingRef.current, 1);
    }
  }, [receivedFirstContent]);

  useLayoutEffect(()=> {
    switch(screen){
        case "dashboard":
            spawnAndMove(dashboardRef.current, {x: 0}, 1);
            moveAndVanish([activitiesRef.current, newActivityRef.current], {x: 1.4 * innerWidth}, 1);
        break;
        case "activities":
            moveAndVanish(dashboardRef.current, {x: -1.4 * innerWidth}, 1);
            spawnAndMove(activitiesRef.current, {x: 0}, 1);
            moveAndVanish(newActivityRef.current, {x: 1.4 * innerWidth}, 1);
        break;
        case "new-activity":
            moveAndVanish(dashboardRef.current, {x: -1.4 * innerWidth}, 1);
            moveAndVanish(activitiesRef.current, {x: -1.4 * innerWidth}, 1);
            spawnAndMove(newActivityRef.current, {x: 0}, 1);
        break;
    }
  }, [screen]);

  return (
    <Background>
      <Header
        logo
        user
        show={receivedFirstContent}
        arrow={screen === "dashboard" ? null : () => setScreen("dashboard")}
      />
      <BigContainer>
        <SmallContainer ref={dashboardRef}>
            <Dashboard
                todayIndex={dayIndex}
                show={receivedFirstContent}
                weekActivities={weekActivities}
                shoppingList={shoppingList}
                todoList={todoList}
                onAddbuttonClick={() => setScreen("activities")}
            />
        </SmallContainer>
        <SmallContainer ref={activitiesRef}>
            <Activities
              todayIndex={dayIndex}
              weekActivities={weekActivities}
            />
        </SmallContainer>
        <SmallContainer ref={newActivityRef}>
            <NewActivity/>
        </SmallContainer>
      </BigContainer>
      <Gsap ref={loadingRef}>
        <Loading />
      </Gsap>
    </Background>
  );
}
