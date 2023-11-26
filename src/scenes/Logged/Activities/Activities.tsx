import { activityType } from "src/types";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { texts } from "./Activities.lang";
import { useState } from "react";
import { areActivitiesEqual } from "src/functions";
import ButtonBar from "./components/ButtonBar/ButtonBar";
import DayViewer from "./components/DayViewer";
import { Background, ButtonBarContainer, Hint, Carousel, CarouselEdge } from "./Activities.style";

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
        ));
    }

    const deselectActivities = () => {
        setSelectedActivity(null);
    }

    return (
        <Background>
            <Hint>
                {activitiesTexts.manageActivities}
            </Hint>
            <Carousel onScroll={deselectActivities}>
                <CarouselEdge />
                {weekActivities.map((dayActivities, index) => (
                    <DayViewer
                        key={index}
                        activities={dayActivities}
                        isToday={todayIndex === index}
                        day={activitiesTexts.days.at(index)}
                        selectedActivity={selectedActivity}
                        onActivitySelect={onActivitySelect}
                    />
                ))}
                <CarouselEdge />
            </Carousel>
            <ButtonBarContainer>
                <ButtonBar 
                    activitySelected={!!selectedActivity}
                    onAcceptClick={deselectActivities}  
                    onEditClick={() => null}
                    onDeleteClick={() => null}
                    onAddClick={() => null}
                />
            </ButtonBarContainer>
        </Background>
    )
}