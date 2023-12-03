import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { stringifyTime } from "src/functions/time";
import { activityType } from "src/types";
import { colors } from "src/colors";
import { texts } from "./ActivitySettings.lang";
import Preview from "./components/Preview";
import ColorOption from "./components/ColorOption";
import { Background, ColorPalette, DayOption, Edit, Hint, HourInputText, HourInputs, Input, Inputs, Weekdays } from "./ActivitySettings.style";

interface props {
    currentlyEditing: activityType | null;
    today: number;
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
type startType = {start: string};
type endType = {end: string};
type colorType = {color: string};
type propertyType = whatType | whereType | whoType | startType | endType | colorType;

export default function ActivityDetails({today, currentlyEditing}: props){
    const { language } = useGlobalContext();
    const [selectedDay, setSelectedDay] = useState<number>(() => 0);
    const [newActivity, setNewActivity] = useState<activityType>(() => ({...currentlyEditing}));
    const detailsTexts = texts.get(language); 

    const whatRef = useRef(null);
    const whoRef = useRef(null);
    const whereRef = useRef(null);
    const whenRef = useRef(null);
    const startRef = useRef(null);
    const endRef = useRef(null);

    const resetInputs = () => {
        whatRef.current.value = "";
        whoRef.current.value = "";
        whereRef.current.value = "";
        whenRef.current.value = today;
        startRef.current.value = "00:00";
        endRef.current.value = "00:00";
    }

    const updateActivity = (property: propertyType) => {
        setNewActivity((prev) => ({...prev, ...property}));
    }

    useEffect(() => {
        if(currentlyEditing){
            const curr = {...currentlyEditing};
            whatRef.current.value = curr.what;
            whereRef.current.value = curr.where;
            whoRef.current.value = curr.who;
            whenRef.current.value = today;
            startRef.current.value = stringifyTime(curr.startsAt);
            endRef.current.value = stringifyTime(curr.endsAt);
            setNewActivity(curr);
        } else {
            resetInputs();
            setNewActivity(detailsTexts.exampleActivity);
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
                    <Weekdays ref={whenRef} placeholder={detailsTexts.when}>
                        {detailsTexts.daysOfTheWeek.map((day, index) => (
                            <DayOption
                                key={index}
                                value={`${index}`}
                                onClick={() => setSelectedDay(index)}
                            >
                                {day}
                            </DayOption>
                        ))}
                    </Weekdays>
                    <HourInputs>
                        <Input
                            type={"time"}
                            ref={startRef}
                            placeholder={detailsTexts.start}
                            onChange={(e) => updateActivity({start: e.target.value})}
                        />
                        <HourInputText>
                            {detailsTexts.to}
                        </HourInputText>
                        <Input
                            type={"time"}
                            ref={endRef}
                            placeholder={detailsTexts.end}
                            onChange={(e) => updateActivity({end: e.target.value})}
                        />
                    </HourInputs>
                </Inputs>
            </Edit>
            <Hint>
                {detailsTexts.preview}
            </Hint>
            <Preview
                activity={newActivity}
                onConfirmClick={() => null}
                onDiscardClick={() => null}
            />
        </Background>
    )
}