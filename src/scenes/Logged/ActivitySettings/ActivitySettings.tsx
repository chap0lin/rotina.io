import { useEffect, useRef, useState } from "react";
import { stringifyTime, parseTime, isEqual, isAfter } from "src/functions/time";
import { activityType, timeType } from "src/types";
import { activitySelectionType } from "../Logged";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { colors } from "src/colors";
import { texts } from "./ActivitySettings.lang";
import Preview from "./components/Preview";
import ColorOption from "./components/ColorOption";
import PopupContent from "./components/PopupContent";
import { Background, ColorPalette, DayOption, Edit, Hint, HourInput, HourInputText, HourInputs, Input, Inputs, Weekdays } from "./ActivitySettings.style";
import { areActivitiesEqual } from "src/functions";

const colorsAvailable = [
    colors.darkRed,
    colors.red,
    colors.yellow,
    colors.green,
    colors.blue,
    colors.purple,
    colors.black,
]

type whatType = {what: string};
type whereType = {where: string};
type whoType = {who: string};
type startType = {startsAt: timeType};
type endType = {endsAt: timeType};
type colorType = {color: string};
type propertyType = whatType | whereType | whoType | startType | endType | colorType;

interface props {
    currentlyEditing: activitySelectionType | null;
    checkConflicts: (day: number, activity: activityType) => activityType;
    onConfirmClick: (day: number, activity: activityType) => void;
    onDiscardClick: () => void;
    onPopupShow: () => void;
    onPopupHide: () => void;
}


export default function ActivitySettings({currentlyEditing, checkConflicts, onConfirmClick, onDiscardClick, onPopupShow, onPopupHide}: props){
    const { language, showPopup, hidePopup } = useGlobalContext();
    const detailsTexts = texts.get(language); 
    const [selectedDay, setSelectedDay] = useState<number>(() => 0);
    const [newActivity, setNewActivity] = useState<activityType | null>(() => detailsTexts.exampleActivity);
    const [timeCheckMessage, setTimeCheckMessage] = useState<string | null>(() => null);
    

    const whatRef = useRef(null);
    const whoRef = useRef(null);
    const whereRef = useRef(null);
    const whenRef = useRef(null);
    const startRef = useRef(null);
    const endRef = useRef(null);

    const resetAll = (specificDayToReset?: number) => {
        whatRef.current.value = "";
        whoRef.current.value = "";
        whereRef.current.value = "";
        startRef.current.value = "12:00";
        endRef.current.value = "14:00";
        whenRef.current.value = specificDayToReset?? 0;
    }

    const updateActivity = (property: propertyType) => {
        setNewActivity((prev) => ({...prev, ...property}));
    }

    const confirmUpdateOrCreate = () => {
        showPopup(
            <PopupContent
                type={"confirm"}
                dayIndex={selectedDay}
                activity={newActivity}
                onYes={() => {
                    onConfirmClick(selectedDay, newActivity);
                    resetAll();
                    hidePopup();
                    onPopupHide();
                }}
                onNo={() => {
                    hidePopup();
                    onPopupHide();
                }}
            />, "warning");
        onPopupShow();
    }

    const confirmDiscardChanges = () => {
        if(
            areActivitiesEqual(currentlyEditing.activity, newActivity) &&
            currentlyEditing.day === selectedDay
        ){
            onDiscardClick();
            resetAll(); 
            return;
        }
        showPopup(
            <PopupContent
                type={"discard"}
                onYes={() => {
                    onDiscardClick();
                    resetAll();
                    hidePopup();
                    onPopupHide();
                }}
                onNo={() => {
                    hidePopup();
                    onPopupHide();
                }}
            />, "warning-alert");
        onPopupShow();
    }

    useEffect(() => {
        newActivity &&
        newActivity.startsAt &&
        newActivity.endsAt && 
        setTimeCheckMessage(() => {
            if(isEqual(newActivity.startsAt, newActivity.endsAt)) return detailsTexts.timesAreEqual;
            if(isAfter(newActivity.startsAt, newActivity.endsAt)) return detailsTexts.timesAreInverted;
            const conflict = checkConflicts(selectedDay, newActivity);
            if(conflict) return `
                ${detailsTexts.timesConflict}
                ${stringifyTime(conflict.startsAt)}
                - ${stringifyTime(conflict.endsAt)}.
            `;
            return null;
        });

    }, [newActivity, selectedDay, language]);
    

    useEffect(() => {
        if(currentlyEditing.activity){
            const curr = {...currentlyEditing};
            whatRef.current.value = curr.activity.what;
            whereRef.current.value = curr.activity.where;
            whoRef.current.value = curr.activity.who;
            whenRef.current.value = curr.day;
            startRef.current.value = stringifyTime(curr.activity.startsAt);
            endRef.current.value = stringifyTime(curr.activity.endsAt);
            setNewActivity(currentlyEditing.activity);
            setSelectedDay(currentlyEditing.day);
        } else {
            resetAll(currentlyEditing.day);
            setSelectedDay(currentlyEditing.day);
            setNewActivity({...detailsTexts.exampleActivity});
        }
    }, [currentlyEditing, language]);


    return (
        <Background>
            <Edit>
                <Hint>
                    {(currentlyEditing)
                        ? detailsTexts.editActivity
                        : detailsTexts.newActivity
                    }
                </Hint>
                <ColorPalette>
                    {colorsAvailable.map((color, index) => (
                        <ColorOption
                            key={index}
                            color={color}
                            selected={color === newActivity.color}
                            onClick={() => updateActivity({color})}
                        />
                    ))}
                </ColorPalette>
                <Inputs>
                    <Input
                        ref={whatRef}
                        placeholder={detailsTexts.what}
                        onChange={(e) => updateActivity({what: e.target.value})}
                    />
                    <Input
                        ref={whoRef}
                        placeholder={detailsTexts.who}
                        onChange={(e) => updateActivity({who: e.target.value})}
                    />
                    <Input
                        ref={whereRef}
                        placeholder={detailsTexts.where}
                        onChange={(e) => updateActivity({where: e.target.value})}
                    />
                    <Weekdays
                        ref={whenRef}
                        placeholder={detailsTexts.when}
                        onChange={(event) => setSelectedDay(Number.parseInt(event.target.value))}
                    >
                        {detailsTexts.daysOfTheWeek.map((day, index) => (
                            <DayOption
                                key={index}
                                value={`${index}`}
                            >
                                {day}
                            </DayOption>
                        ))}
                    </Weekdays>
                    <HourInputs>
                        <HourInput
                            type={"time"}
                            ref={startRef}
                            placeholder={detailsTexts.start}
                            onChange={(e) => updateActivity({startsAt: parseTime(e.target.value)})}
                        />
                        <HourInputText>
                            {detailsTexts.to}
                        </HourInputText>
                        <HourInput
                            type={"time"}
                            ref={endRef}
                            placeholder={detailsTexts.end}
                            onChange={(e) => updateActivity({endsAt: parseTime(e.target.value)})}
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
    )
}