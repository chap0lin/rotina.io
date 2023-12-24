import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { moveAndVanish, spawn, spawnAndMove, vanish } from "src/functions/animation";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Background, Header, Loading } from "src/components";
import { areActivitiesEqual } from "src/functions";
import { useNavigate } from "react-router-dom";
import { activityType } from "src/types";
import { emptyWeek } from "src/constants";
import { useTime } from "src/hooks/time";
import { texts } from "./Logged.lang";
import { api } from "src/services/api";
import Dashboard from "./Dashboard";
import Activities from "./Activities";
import ActivitySettings from "./ActivitySettings";
import { BigContainer, Gsap, SmallContainer } from "./Logged.style";
import { isAfter, isBefore } from "src/functions/time";

type serverReplyType =
  | "SUCCESS"
  | "SUCCESS_DATA"
  | "ERROR"
  | "ERROR_NO_REGISTERED_USER"
  | "ERROR_MISSING_CREDENTIALS";

type screens = "dashboard" | "activities" | "activity-settings" ;

export default function Logged() {
  const navigate = useNavigate();
  const { language, user, innerWidth, showPopup } = useGlobalContext();
  const [ hour ] = useTime();
  const [blur, setBlur] = useState<boolean>(() => false);
  const [screen, setScreen] = useState<screens>(() => "dashboard");
  const [dayIndex, setDayIndex] = useState<number>(0);
  const [todoList, setTodoList] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<string[]>(() => []);
  const [weekActivities, setWeekActivities] = useState<activityType[][]>(() => emptyWeek);
  const [selectedActivity, setSelectedActivity] = useState<activityType | null>(() => null);
  const [waitingForServer, setWaitingForServer] = useState<boolean>(() => true);
  const [receivedFirstContent, setReceivedFirstContent] = useState<boolean>(
    () => false
  );

  const loadingRef = useRef(null);
  const dashboardRef = useRef(null);
  const activitiesRef = useRef(null);
  const newActivityRef = useRef(null);
  const loggedTexts = texts.get(language);

  const getActivityDay = (targetActivity: activityType) => {
    for(let i = 0; i < 7; i++){
      if(weekActivities[i].find(activity => (
        areActivitiesEqual(activity, targetActivity))
      )) return i;
    }
    return -1;
  }

  const goBack = () => {
    setScreen(prev => {
      switch(prev){
        case "activity-settings": return "activities";
        case "activities": return "dashboard";
        default: return prev;
      }
    });
  }

  const toggleSelectedActivity = (activity: activityType) => {
    setSelectedActivity((prev) => {
      return areActivitiesEqual(activity, prev)? null : activity
    });
  }

  const updateActivities = (day: number, newOrEditedActivity: activityType) => {
    if(!areActivitiesEqual(selectedActivity, newOrEditedActivity) || (day !== getActivityDay(selectedActivity))){
      selectedActivity && deleteSelectedActivity();
      weekActivities[day].push(newOrEditedActivity);
      weekActivities[day].sort((a, b) => (isBefore(a.startsAt,b.startsAt)? -1 : 1));
      setSelectedActivity(null); 
    }
    goBack();
  }

  const deleteSelectedActivity = () => {
    //TODO create a confirmation popup
    const weekIndex = getActivityDay(selectedActivity);
    const weekdayIndex = weekActivities[weekIndex].findIndex(act => areActivitiesEqual(act, selectedActivity));
    if(weekIndex > -1){
      const newWeek = [...weekActivities];
      newWeek[weekIndex].splice(weekdayIndex, 1);
      setWeekActivities(newWeek);
      setSelectedActivity(null);
      //TODO send updated selection to server
      return;
    }
  }

  const checkConflicts = (day: number, candidate: activityType): activityType => {
    const existing = weekActivities[day].find(activity => (
      isBefore(candidate.startsAt, activity.endsAt) &&
      isAfter(candidate.endsAt, activity.startsAt)
    ));

    if(!existing || areActivitiesEqual(existing, selectedActivity)) return null;
    return existing;
  }

  const editSelectedActivity = () => {
    selectedActivity && setScreen("activity-settings");
  }

  const createNewActivity = () => {
    setSelectedActivity(null);
    setScreen("activity-settings");
  }


  //COMUNICAÇÃO COM SERVIDOR/////////////////////////////////////////////////////////////////////////////////////////////////


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
      showPopup(loggedTexts.errorFetchingData, "warning-failure", 4000);
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
        showPopup(loggedTexts.somethingWentWrong, "warning-failure", 4000);
        break;
      default:
        if (reply.includes("SUCCESS_DATA")) {
          getDataFromServerReply(reply);
        }
        break;
    }
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////


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


  useEffect(() => {
    console.log("selected activity day is " + getActivityDay(selectedActivity));
  }, [selectedActivity]);


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
        case "activity-settings":
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
        blurry={blur}
        show={receivedFirstContent}
        arrow={screen === "dashboard" ? null : goBack}
      />
      <BigContainer>
        <SmallContainer ref={dashboardRef}>
            <Dashboard
                todayIndex={dayIndex}
                show={receivedFirstContent}
                weekActivities={weekActivities}
                shoppingList={shoppingList}
                todoList={todoList}
                onCalendarClick={() => setScreen("activities")}
            />
        </SmallContainer>
        <SmallContainer ref={activitiesRef}>
            <Activities
              todayIndex={dayIndex}
              weekActivities={weekActivities}
              currentlyEditing={selectedActivity}
              onActivityClick={toggleSelectedActivity}
              onDeleteClick={deleteSelectedActivity}
              onEditClick={editSelectedActivity}
              onNewClick={createNewActivity}
              onDeselect={() => setSelectedActivity(null)}
            />
        </SmallContainer>
        <SmallContainer ref={newActivityRef}>
            <ActivitySettings
              getDay={getActivityDay}
              checkConflicts={checkConflicts}
              onConfirmClick={updateActivities}
              onDiscardClick={goBack}
              currentlyEditing={selectedActivity}
              onPopupShow={() => setBlur(true)}
              onPopupHide={() => setBlur(false)}
            />
        </SmallContainer>
      </BigContainer>
      <Gsap ref={loadingRef}>
        <Loading />
      </Gsap>
    </Background>
  );
}
