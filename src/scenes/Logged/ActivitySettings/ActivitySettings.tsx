import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { stringifyTime, parseTime, isEqual, isAfter } from "src/functions/time";
import { activityType, timeType } from "src/types";
import { colors } from "src/colors";
import { texts } from "./ActivitySettings.lang";
import Preview from "./components/Preview";
import ColorOption from "./components/ColorOption";
import { Background, ColorPalette, DayOption, Edit, Hint, HourInput, HourInputText, HourInputs, Input, Inputs, Weekdays } from "./ActivitySettings.style";
import PopupContent from "./components/PopupContent";

interface props {
    currentlyEditing: activityType | null;
    getDay: (activity: activityType) => number;
    checkConflicts: (day: number, activity: activityType) => activityType;
    onConfirmClick: (day: number, activity: activityType) => void;
    onDiscardClick: () => void;
    onPopupShow: () => void;
    onPopupHide: () => void;
}

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

export default function ActivitySettings({currentlyEditing, getDay, checkConflicts, onConfirmClick, onDiscardClick, onPopupShow, onPopupHide}: props){
    const { language, showPopup, hidePopup } = useGlobalContext();
    const [selectedDay, setSelectedDay] = useState<number>(() => 0);
    const [timeCheckMessage, setTimeCheckMessage] = useState<string | null>(() => null);
    const [newActivity, setNewActivity] = useState<activityType>(() => ({...currentlyEditing}));
    const detailsTexts = texts.get(language); 

    const whatRef = useRef(null);
    const whoRef = useRef(null);
    const whereRef = useRef(null);
    const whenRef = useRef(null);
    const startRef = useRef(null);
    const endRef = useRef(null);

    const resetAll = () => {
        whatRef.current.value = "";
        whoRef.current.value = "";
        whereRef.current.value = "";
        whenRef.current.value = 0;
        startRef.current.value = "12:00";
        endRef.current.value = "14:00";
        
        setNewActivity({...detailsTexts.exampleActivity});
        setSelectedDay(whenRef.current.value);
    }

    const confirmUpdateOrCreate = () => {
        showPopup(
            <PopupContent
                type={"confirm"}
                dayIndex={selectedDay}
                activity={newActivity}
                onYes={() => {
                    onConfirmClick(selectedDay, newActivity);
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
        // onDiscardClick();
        showPopup(
            <PopupContent
                type={"discard"}
                onYes={() => {
                    onDiscardClick();
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

    const updateActivity = (property: propertyType) => {
        setNewActivity((prev) => ({...prev, ...property}));
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
        if(currentlyEditing){
            const curr = {...currentlyEditing};
            whatRef.current.value = curr.what;
            whereRef.current.value = curr.where;
            whoRef.current.value = curr.who;
            whenRef.current.value = getDay(currentlyEditing);
            startRef.current.value = stringifyTime(curr.startsAt);
            endRef.current.value = stringifyTime(curr.endsAt);

            setNewActivity(curr);
            setSelectedDay(whenRef.current.value);
        } else {
            resetAll();
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