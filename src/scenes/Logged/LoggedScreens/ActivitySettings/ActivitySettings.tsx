import { useEffect, useRef, useState } from "react";
import { stringifyTime, parseTime, isEqual, isAfter, isBefore } from "src/functions/time";
import { activityType, timeType } from "src/types";
import { areActivitiesEqual } from "src/functions";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";
import { colors } from "src/colors";
import { texts } from "./ActivitySettings.lang";
import Preview from "./components/Preview";
import ColorOption from "./components/ColorOption";
import PopupContent from "./components/PopupContent";
import {
  Background,
  ColorPalette,
  DayOption,
  Edit,
  Hint,
  HourInput,
  HourInputText,
  HourInputs,
  Input,
  Inputs,
  Weekdays,
} from "./ActivitySettings.style";

type whatType = { what: string };
type whereType = { where: string };
type whoType = { who: string };
type startType = { startsAt: timeType };
type endType = { endsAt: timeType };
type colorType = { color: string };
type propertyType =
  | whatType
  | whereType
  | whoType
  | startType
  | endType
  | colorType;

const colorsAvailable = [
  colors.darkRed,
  colors.red,
  colors.yellow,
  colors.green,
  colors.blue,
  colors.purple,
  colors.black,
];

const DEFAULT_WHAT = "";
const DEFAULT_WHO = "";
const DEFAULT_WHERE = "";
const DEFAULT_START_TIME = "12:00";
const DEFAULT_END_TIME = "14:00";
const DEFAULT_DAY = 0;

interface props {}

export default function ActivitySettings({}: props) {
  const { language, showPopup, hidePopup } = useGlobalContext();
  const { selected, weekActivities, goBack, goTo, addActivity, updateActivity, resetSelectedActivity } = useLoggedContext();
  const detailsTexts = texts.get(language);

  const [selectedDay, setSelectedDay] = useState<number>(() => selected.day);
  const [newActivity, setNewActivity] = useState<activityType | null>(() => detailsTexts.exampleActivity);
  const [timeCheckMessage, setTimeCheckMessage] = useState<string | null>(() => null);

  const whatRef = useRef(null);
  const whoRef = useRef(null);
  const whereRef = useRef(null);
  const whenRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  const hasConflict = (): activityType => {
    const existing = weekActivities[selectedDay].find((activity) =>
        isBefore(newActivity.startsAt, activity.endsAt) &&
        isAfter(newActivity.endsAt, activity.startsAt)
    );

    if (!existing || areActivitiesEqual(existing, selected.activity))
      return null;
    return existing;
  };


  const resetAll = (specificDayToReset?: number) => {
    whatRef.current.value = DEFAULT_WHAT;
    whoRef.current.value = DEFAULT_WHO;
    whereRef.current.value = DEFAULT_WHERE;
    startRef.current.value = DEFAULT_START_TIME;
    endRef.current.value = DEFAULT_END_TIME;
    whenRef.current.value = specificDayToReset ?? DEFAULT_DAY;
    setSelectedDay(specificDayToReset?? DEFAULT_DAY);
  };


  const updateActivityProperty = (property: propertyType) => {
    setNewActivity((prev) => ({ ...prev, ...property }));
  };


  const updateOrCreateActivity = () => {
    if(selected.activity){
      updateActivity({activity: newActivity, day: selectedDay});
      resetSelectedActivity();
      showPopup(detailsTexts.activityUpdated, {
        type: "warning-success",
        timeout: 4000
      }); 
      return;
    }
    addActivity({
      activity: newActivity,
      day: selectedDay,
    });
    showPopup(detailsTexts.activityCreated, {
      type: "warning-success",
      timeout: 4000
    }); 
  }

  const confirmUpdateOrCreate = () => {
    showPopup(
      <PopupContent
        type={"confirm"}
        dayIndex={selectedDay}
        activity={newActivity}
        onYes={() => {
          hidePopup();
          resetAll();
          goBack();               // the goBack followed by the goTo is on purpose here.
          goTo("activities");     // the goal is to ensure we always get "back" to the activities (not accidentally to the dashboard if we came from there)
          setTimeout(() => {
            updateOrCreateActivity();
          }, 200);
        }}
        onNo={() => {
          hidePopup();
        }}
      />,
      { type: "prompt" }
    );
  };


  const confirmDiscardChanges = () => {
    if (
      areActivitiesEqual(selected.activity, newActivity) &&
      selected.day === selectedDay
    ) {
      goBack();
      resetAll();
      return;
    }
    showPopup(
      <PopupContent
        type={"discard"}
        onYes={() => {
          hidePopup();
          resetAll();
          goBack();
        }}
        onNo={() => {
          hidePopup();
        }}
      />,
      { type: "prompt" }
    );
  };

  useEffect(() => {
    newActivity &&
    newActivity.startsAt &&
    newActivity.endsAt &&
    setTimeCheckMessage(() => {
      if (isEqual(newActivity.startsAt, newActivity.endsAt))
        return detailsTexts.timesAreEqual;
      if (isAfter(newActivity.startsAt, newActivity.endsAt))
        return detailsTexts.timesAreInverted;
      const conflict = hasConflict();
      if (conflict) return (`
        ${detailsTexts.timesConflict}
        ${stringifyTime(conflict.startsAt)}
        - ${stringifyTime(conflict.endsAt)}.
      `);
      return null;
    });
  }, [newActivity, selectedDay, language]);

  useEffect(() => {
    if (selected.activity) {
      const curr = { ...selected };
      whatRef.current.value = curr.activity.what;
      whereRef.current.value = curr.activity.where;
      whoRef.current.value = curr.activity.who;
      whenRef.current.value = curr.day;
      startRef.current.value = stringifyTime(curr.activity.startsAt);
      endRef.current.value = stringifyTime(curr.activity.endsAt);
      setNewActivity(selected.activity);
      setSelectedDay(selected.day);
    } else {
      resetAll(selected.day);
      setNewActivity({ ...detailsTexts.exampleActivity });
    }
  }, [selected, language]);

  return (
    <Background>
      <Edit>
        <Hint>
          {selected
            ? detailsTexts.editActivity
            : detailsTexts.newActivity}
        </Hint>
        <ColorPalette>
          {colorsAvailable.map((color, index) => (
            <ColorOption
              key={index}
              color={color}
              selected={color === newActivity.color}
              onClick={() => updateActivityProperty({ color })}
            />
          ))}
        </ColorPalette>
        <Inputs>
          <Input
            ref={whatRef}
            placeholder={detailsTexts.what}
            onChange={(e) => updateActivityProperty({ what: e.target.value })}
          />
          <Input
            ref={whoRef}
            placeholder={detailsTexts.who}
            onChange={(e) => updateActivityProperty({ who: e.target.value })}
          />
          <Input
            ref={whereRef}
            placeholder={detailsTexts.where}
            onChange={(e) => updateActivityProperty({ where: e.target.value })}
          />
          <Weekdays
            ref={whenRef}
            placeholder={detailsTexts.when}
            onChange={(event) =>
              setSelectedDay(Number.parseInt(event.target.value))
            }>
            {detailsTexts.daysOfTheWeek.map((day, index) => (
              <DayOption key={index} value={`${index}`}>
                {day}
              </DayOption>
            ))}
          </Weekdays>
          <HourInputs>
            <HourInput
              type={"time"}
              ref={startRef}
              placeholder={detailsTexts.start}
              onChange={(e) =>
                updateActivityProperty({ startsAt: parseTime(e.target.value) })
              }
            />
            <HourInputText>{detailsTexts.to}</HourInputText>
            <HourInput
              type={"time"}
              ref={endRef}
              placeholder={detailsTexts.end}
              onChange={(e) =>
                updateActivityProperty({ endsAt: parseTime(e.target.value) })
              }
            />
          </HourInputs>
        </Inputs>
      </Edit>
      <Preview
        title={detailsTexts.preview}
        errorMsg={timeCheckMessage}
        activity={newActivity}
        onConfirm={confirmUpdateOrCreate}
        onDiscard={confirmDiscardChanges}
      />
    </Background>
  );
}
