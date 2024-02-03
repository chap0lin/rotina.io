import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  moveAndVanish,
  spawn,
  spawnAndMove,
  vanish,
} from "src/functions/animation";
import { BigContainer, Gsap, SmallContainer } from "./Logged.style";
import { Background, Header, Loading } from "src/components";
import { areActivitiesEqual } from "src/functions";
import { isAfter, isBefore } from "src/functions/time";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { useNavigate } from "react-router-dom";
import { activityType } from "src/types";
import { emptyWeek } from "src/constants";
import { useTime } from "src/hooks/time";
import { texts } from "./Logged.lang";
import { api } from "src/services/api";
import Dashboard from "./Dashboard";
import Activities from "./Activities";
import ActivitySettings from "./ActivitySettings";

type serverReplyType =
  | "SUCCESS"
  | "SUCCESS_DATA"
  | "ERROR"
  | "ERROR_NO_REGISTERED_USER"
  | "ERROR_MISSING_CREDENTIALS";

type screens = "dashboard" | "activities" | "activity-settings";

export type activitySelectionType = {
  activity: activityType;
  day: number;
};

const selectionIsValid = (selection: activitySelectionType) => {
  if (!selection || !selection.activity || typeof selection.day !== "number")
    return false;
  if (selection.day < 0) return false;
  return true;
};

export default function Logged() {
  const navigate = useNavigate();
  const { language, user, innerWidth, showPopup } = useGlobalContext();
  const [hour] = useTime();
  const [screen, setScreen] = useState<screens>(() => "dashboard");
  const [dayIndex, setDayIndex] = useState<number>(0);
  const [todoList, setTodoList] = useState<string[]>([]);
  const [selected, setSelected] = useState<activitySelectionType | null>(
    () => ({ activity: null, day: 0 })
  );
  const [shoppingList, setShoppingList] = useState<string[]>(() => []);
  const [weekActivities, setWeekActivities] = useState<activityType[][]>(
    () => emptyWeek
  );
  const [waitingForServer, setWaitingForServer] = useState<boolean>(() => true);
  const [receivedFirstContent, setReceivedFirstContent] = useState<boolean>(
    () => false
  );

  const loadingRef = useRef(null);
  const dashboardRef = useRef(null);
  const activitiesRef = useRef(null);
  const newActivityRef = useRef(null);
  const loggedTexts = texts.get(language);

  const goBack = () => {
    setScreen((prev) => {
      switch (prev) {
        case "activity-settings":
          return "activities";
        case "activities":
          return "dashboard";
        default:
          return prev;
      }
    });
  };

  const checkConflicts = (
    day: number,
    candidate: activityType
  ): activityType => {
    const existing = weekActivities[day].find(
      (activity) =>
        isBefore(candidate.startsAt, activity.endsAt) &&
        isAfter(candidate.endsAt, activity.startsAt)
    );

    if (!existing || areActivitiesEqual(existing, selected.activity))
      return null;
    return existing;
  };

  const toggleSelected = (day: number, activ: activityType) => {
    setSelected((prev) => {
      const activity = areActivitiesEqual(activ, prev.activity) ? null : activ;
      return { day, activity };
    });
  };

  const editSelected = () => {
    selected.activity && setScreen("activity-settings");
  };

  const createNewActivity = (day: number) => {
    setSelected({ day, activity: null });
    setScreen("activity-settings");
  };

  const addActivity = (selection: activitySelectionType) => {
    if (!selectionIsValid(selection)) return;
    const newWeek = [...weekActivities];
    newWeek[selection.day].push(selection.activity);
    newWeek[selection.day].sort((a, b) =>
      isBefore(a.startsAt, b.startsAt) ? -1 : 1
    );
    setWeekActivities(newWeek);
  };

  const deleteActivity = (selection: activitySelectionType) => {
    if (!selectionIsValid(selection)) return;
    const index = weekActivities[selection.day].findIndex((act) =>
      areActivitiesEqual(act, selection.activity)
    );
    const newWeek = [...weekActivities];
    newWeek[selection.day].splice(index, 1);
    setWeekActivities(newWeek);
    setSelected((prev) => ({ ...prev, activity: null }));
  };

  const updateActivities = (
    day: number,
    activity: activityType,
    shouldGoBack?: boolean
  ) => {
    if (areActivitiesEqual(selected.activity, activity) && selected.day == day)
      return;
    deleteActivity(selected);
    addActivity({ activity, day });
    setSelected((prev) => ({ ...prev, activity: null }));
    shouldGoBack && goBack();
  };

  const deleteSelected = (notify?: boolean) => {
    //TODO send updated selection to server
    deleteActivity(selected);
    notify &&
      showPopup(loggedTexts.activityDeleted, {
        type: "warning-success",
        timeout: 4000,
      });
  };

  const discardChanges = () => {
    setSelected((prev) => ({ ...prev, activity: null }));
    goBack();
  };

  const updateNotes = (updatedActivity: activityType) => {
    updateActivities(selected.day, updatedActivity);
  };

  const selectAndUpdateNotes = (
    activity: activityType,
    notes: string[],
    day: number
  ) => {
    const oldOne = activity;
    const newOne = { ...activity, notes };
    deleteActivity({ activity: oldOne, day });
    addActivity({ activity: newOne, day });
  };

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
      showPopup(loggedTexts.errorFetchingData, {
        type: "warning-failure",
        timeout: 4000,
      });
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
        showPopup(loggedTexts.somethingWentWrong, {
          type: "warning-failure",
          timeout: 4000,
        });
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
    setDayIndex((date.getDay() + 6) % 7); //here, 0 equals monday and 6 equals sunday. Fuck the system
  }, [hour]);

  useLayoutEffect(() => {
    spawnAndMove(dashboardRef.current, { x: 0 });
    moveAndVanish([activitiesRef.current, newActivityRef.current], {
      x: 1.4 * innerWidth,
    });
  }, []);

  useLayoutEffect(() => {
    if (!receivedFirstContent) {
      spawn(loadingRef.current, 1);
    } else {
      vanish(loadingRef.current, 1);
    }
  }, [receivedFirstContent]);

  useLayoutEffect(() => {
    switch (screen) {
      case "dashboard":
        spawnAndMove(dashboardRef.current, { x: 0 }, 1);
        moveAndVanish(
          [activitiesRef.current, newActivityRef.current],
          { x: 1.4 * innerWidth },
          1
        );
        break;
      case "activities":
        moveAndVanish(dashboardRef.current, { x: -1.4 * innerWidth }, 1);
        spawnAndMove(activitiesRef.current, { x: 0 }, 1);
        moveAndVanish(newActivityRef.current, { x: 1.4 * innerWidth }, 1);
        break;
      case "activity-settings":
        moveAndVanish(dashboardRef.current, { x: -1.4 * innerWidth }, 1);
        moveAndVanish(activitiesRef.current, { x: -1.4 * innerWidth }, 1);
        spawnAndMove(newActivityRef.current, { x: 0 }, 1);
        break;
    }
  }, [screen]);

  return (
    <Background>
      <Header
        logo
        user
        lang
        show={receivedFirstContent}
        arrow={screen === "dashboard" ? null : goBack}
      />
      <BigContainer>
        <SmallContainer ref={dashboardRef}>
          <Dashboard
            todayIndex={dayIndex}
            show={receivedFirstContent}
            weekActivities={weekActivities}
            onCalendarClick={() => setScreen("activities")}
            onNotesUpdate={selectAndUpdateNotes}
          />
        </SmallContainer>
        <SmallContainer ref={activitiesRef}>
          <Activities
            todayIndex={dayIndex}
            weekActivities={weekActivities}
            currentlyEditing={selected.activity}
            onActivityClick={toggleSelected}
            onDeleteClick={() => deleteSelected(true)}
            onEditClick={editSelected}
            onNewClick={createNewActivity}
            onNotesUpdate={updateNotes}
          />
        </SmallContainer>
        <SmallContainer ref={newActivityRef}>
          <ActivitySettings
            currentlyEditing={selected}
            onDiscardClick={discardChanges}
            checkConflicts={checkConflicts}
            onConfirmClick={updateActivities}
          />
        </SmallContainer>
      </BigContainer>
      <Gsap ref={loadingRef}>
        <Loading />
      </Gsap>
    </Background>
  );
}
