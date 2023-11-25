import { activityType } from "src/types";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { texts } from "./Activities.lang";
import ButtonBar from "./components/ButtonBar/ButtonBar";
import DayViewer from "./components/DayViewer";
import { useState } from "react";
import { areActivitiesEqual } from "src/functions";
import { Background, ButtonBarContainer, Hint, MainContainer } from "./Activities.style";

interface props {
    todayIndex: number;
    weekActivities: activityType[][];
}

export default function Activities({todayIndex, weekActivities}: props){
    const { language } = useGlobalContext();
    const activitiesTexts = texts.get(language);
    const [selectedActivity, setSelectedActivity] = useState<activityType | null>(() => null);

    const onActivitySelect = (selected: activityType) => {
        setSelectedActivity((prev) => (
            areActivitiesEqual(prev, selected)? null : selected
        ))
    }

    const deselectActivities = () => {
        setSelectedActivity(null);
    }

    return (
        <Background>
            <Hint>
                {activitiesTexts.manageActivities}
            </Hint>
            <MainContainer>
                {weekActivities.map((dayActivities, index) => (
                    <DayViewer
                        key={index}
                        isToday={todayIndex === index}
                        day={activitiesTexts.days.at(index)}
                        activities={dayActivities}
                        selectedActivity={selectedActivity}
                        onActivitySelect={onActivitySelect}
                    />
                ))}
            </MainContainer>
            <ButtonBarContainer>
                <ButtonBar 
                    activitySelected={!!selectedActivity}
                    onLeftArrowClick={() => null}
                    onAcceptClick={deselectActivities}
                    onAddClick={() => null}   
                    onEditClick={() => null}
                    onDeleteClick={() => null}
                    onRightArrowClick={() => null}
                />
            </ButtonBarContainer>
        </Background>
    )
}