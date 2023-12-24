import { useRef } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { activityType } from "src/types";
import { texts } from "./Activities.lang";
import ButtonBar from "./components/ButtonBar/ButtonBar";
import DayViewer from "./components/DayViewer";
import { Background, ButtonBarContainer, Hint, Carousel, CarouselEdge } from "./Activities.style";

interface props {
    todayIndex: number;
    weekActivities: activityType[][];
    currentlyEditing: activityType;
    onActivityClick: (activity: activityType) => void;
    onDeleteClick: () => void;
    onEditClick: () => void;
    onDeselect: () => void;
    onNewClick: () => void;
}

export default function Activities({todayIndex, weekActivities, currentlyEditing, onActivityClick, onDeleteClick, onEditClick, onDeselect, onNewClick}: props){
    const { language, innerWidth } = useGlobalContext();
    const activitiesTexts = texts.get(language);
    const selectedActivityScroll = useRef<number>(0);
    const carouselRef = useRef(null);

    const onActivitySelect = (selected: activityType) => {
        selectedActivityScroll.current = carouselRef.current.scrollLeft;
        onActivityClick(selected);
    }

    const onCarouselScroll = () => {
        const delta = selectedActivityScroll.current - carouselRef.current.scrollLeft; 
        (Math.abs(delta) > (0.75 * innerWidth)) && onDeselect();
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
                        selectedActivity={currentlyEditing}
                        onActivitySelect={onActivitySelect}
                    />
                ))}
                <CarouselEdge />
            </Carousel>
            <ButtonBarContainer>
                <ButtonBar 
                    activitySelected={!!currentlyEditing}
                    onAcceptClick={onDeselect}  
                    onAddClick={onNewClick}
                    onDeleteClick={onDeleteClick}
                    onEditClick={onEditClick}
                />
            </ButtonBarContainer>
        </Background>
    )
}