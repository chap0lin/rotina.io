import { activityType } from "src/types";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { texts } from "./Activities.lang";
import { useRef, useState } from "react";
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

    const selectedActivityScroll = useRef<number>(0);
    const carouselRef = useRef(null);

    const deselectActivities = () => {
        setSelectedActivity(null);
    }

    const onActivitySelect = (selected: activityType) => {
        selectedActivityScroll.current = carouselRef.current.scrollLeft;
        setSelectedActivity((prev) => (
            areActivitiesEqual(prev, selected)? null : selected
        ));
    }

    const onCarouselScroll = () => {
        const delta = selectedActivityScroll.current - carouselRef.current.scrollLeft; 
        (Math.abs(delta) > (innerWidth)/2) && deselectActivities();
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
                    onEditClick={() => null}
                    onDeleteClick={() => null}
                    onAddClick={() => null}
                />
            </ButtonBarContainer>
        </Background>
    )
}