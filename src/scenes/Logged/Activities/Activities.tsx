import { useRef } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { activityType } from "src/types";
import { texts } from "./Activities.lang";
import ButtonBar from "./components/ButtonBar/ButtonBar";
import DayViewer from "./components/DayViewer";
import { Background, ButtonBarContainer, Hint, Carousel, CarouselEdge } from "./Activities.style";
import PopupContent from "./components/PopupContent";

interface props {
    todayIndex: number;
    weekActivities: activityType[][];
    currentlyEditing: activityType;
    onActivityClick: (day: number, activity: activityType) => void;
    onNewClick: (day: number) => void;
    onDeleteClick: () => void;
    onEditClick: () => void;
    onPopupShow: () => void;
    onPopupHide: () => void;
}

export default function Activities({todayIndex, weekActivities, currentlyEditing, onPopupHide, onPopupShow, onActivityClick, onDeleteClick, onEditClick, onNewClick}: props){
    const { language, innerWidth, showPopup, hidePopup } = useGlobalContext();
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

    const confirmDelete = () => {
        showPopup(
            <PopupContent
                dayIndex={selectedDayRef.current}
                activity={currentlyEditing}
                onYes={() => {
                    hidePopup();
                    onPopupHide();
                    setTimeout(onDeleteClick, 200);
                }}
                onNo={() => {
                    hidePopup();
                    onPopupHide();
                }}
            />, "warning");
        onPopupShow();
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
                    onDeleteClick={confirmDelete}
                    onEditClick={onEditClick}
                />
            </ButtonBarContainer>
        </Background>
    )
}