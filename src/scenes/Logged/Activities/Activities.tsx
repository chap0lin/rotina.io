import { useRef, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { areActivitiesEqual } from "src/functions";
import { activityType } from "src/types";
import { texts } from "./Activities.lang";
import ButtonBar from "./components/ButtonBar/ButtonBar";
import DayViewer from "./components/DayViewer";
import { Background, ButtonBarContainer, Hint, Carousel, CarouselEdge } from "./Activities.style";

interface props {
    todayIndex: number;
    weekActivities: activityType[][];
    onActivityDeleteClick: (activity: activityType) => void;
    onActivitySettingsClick: (currentActivity: activityType | null) => void;
}

export default function Activities({todayIndex, weekActivities, onActivityDeleteClick, onActivitySettingsClick}: props){
    const { language } = useGlobalContext();
    const activitiesTexts = texts.get(language);
    const [selectedActivity, setSelectedActivity] = useState<activityType | null>(() => null);

    const selectedActivityScroll = useRef<number>(0);
    const carouselRef = useRef(null);

    const deselectActivities = () => {
        setSelectedActivity(null);
    }

    const newActivity = () => {
        deselectActivities();
        onActivitySettingsClick(null);
    }

    const onActivitySelect = (selected: activityType) => {
        selectedActivityScroll.current = carouselRef.current.scrollLeft;
        setSelectedActivity((prev) => (
            areActivitiesEqual(prev, selected)? null : selected
        ));
    }

    const onCarouselScroll = () => {
        const delta = selectedActivityScroll.current - carouselRef.current.scrollLeft; 
        (Math.abs(delta) > (0.75 * innerWidth)) && deselectActivities();
    }

    return (
        <Background>
            <Hint>
                {activitiesTexts.manageActivities}
            </Hint>
            <Carousel ref={carouselRef} onScroll={onCarouselScroll}>
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
                    onAddClick={newActivity}
                    onDeleteClick={() => onActivityDeleteClick(selectedActivity)}
                    onEditClick={() => onActivitySettingsClick(selectedActivity)}
                />
            </ButtonBarContainer>
        </Background>
    )
}