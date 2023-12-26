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
    onActivityClick: (day: number, activity: activityType) => void;
    onDeleteClick: () => void;
    onEditClick: () => void;
    onNewClick: (day: number) => void;
}

export default function Activities({todayIndex, weekActivities, currentlyEditing, onActivityClick, onDeleteClick, onEditClick, onNewClick}: props){
    const { language, innerWidth } = useGlobalContext();
    const activitiesTexts = texts.get(language);
    const selectedScroll = useRef<number>(0);
    
    const selectedDayRef = useRef(0);
    const carouselRef = useRef(null);

    const onActivitySelect = (selected: activityType) => {
        selectedScroll.current = carouselRef.current.scrollLeft;
        onActivityClick(selectedDayRef.current, selected);
    }

    const onCarouselScroll = () => {
        selectedDayRef.current = Math.floor((1.05 * carouselRef.current.scrollLeft) / (innerWidth));
        const delta = selectedScroll.current - carouselRef.current.scrollLeft; 
        (Math.abs(delta) > (0.75 * innerWidth)) && onActivitySelect(null);
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
                    onAcceptClick={() => onActivitySelect(null)}  
                    onAddClick={() => onNewClick(selectedDayRef.current)}
                    onDeleteClick={onDeleteClick}
                    onEditClick={onEditClick}
                />
            </ButtonBarContainer>
        </Background>
    )
}