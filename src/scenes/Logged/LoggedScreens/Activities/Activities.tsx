import { useEffect, useRef } from "react";
import { areActivitiesEqual } from "src/functions";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { activityType } from "src/types";
import { texts } from "./Activities.lang";
import { Notes } from "src/components";
import ButtonBar from "./components/ButtonBar/ButtonBar";
import DayViewer from "./components/DayViewer";
import PopupContent from "./components/PopupContent";
import { Background, ButtonBarContainer, Hint, Carousel, CarouselEdge } from "./Activities.style";

interface props {}

export default function Activities({}: props) {
  const { language, innerWidth, showPopup, hidePopup } = useGlobalContext();
  const { today, weekActivities, selected, goTo, setSelected, updateActivity, deleteActivity, resetSelectedActivity } = useLoggedContext();
  const activitiesTexts = texts.get(language);
  const selectedScroll = useRef<number>(0);

  const selectedDayRef = useRef(0);
  const carouselRef = useRef(null);


  const onActivitySelect = (selected: activityType) => {
    selectedScroll.current = carouselRef.current.scrollLeft;
    setSelected((prev) => {
      const activity = areActivitiesEqual(selected, prev.activity) ? null : selected;
      return { day: selectedDayRef.current, activity };
    });
  };


  const onCarouselScroll = () => {
    selectedDayRef.current = Math.floor(
      (1.05 * carouselRef.current.scrollLeft) / innerWidth
    );
    const delta = selectedScroll.current - carouselRef.current.scrollLeft;
    (Math.abs(delta) > 0.75 * innerWidth) && onActivitySelect(null);
  };


  const confirmDelete = () => {
    showPopup(
      <PopupContent
        dayIndex={selectedDayRef.current}
        activity={selected.activity}
        onYes={() => {
          hidePopup();
          setTimeout(() => {
            deleteActivity(selected, true);
            resetSelectedActivity();
            showPopup(
              activitiesTexts.activityDeleted, {
                type: "warning-success",
                timeout: 4000
              });          
          }, 200);
        }}
        onNo={() => {
          hidePopup();
        }}
      />,
      { type: "prompt" }
    );
  };


  const showNotes = () => {
    showPopup(
      <Notes
        activity={selected.activity}
        onNotesUpdate={(notes) => {
          updateActivity({
            activity: {...selected.activity, notes},
            day: selected.day,
          }, true);
          hidePopup();
        }}
      />,
      { type: "prompt" }
    );
  };

  return (
    <Background>
      <Hint>{activitiesTexts.yourRoutine}</Hint>
      <Carousel ref={carouselRef} onScroll={onCarouselScroll}>
        <CarouselEdge />
        {weekActivities.map((dayActivities, index) => (
          <DayViewer
            index={index}
            key={index}
            activities={dayActivities}
            isToday={today === index}
            day={activitiesTexts.days.at(index)}
            selectedActivity={selected.activity}
            onActivitySelect={onActivitySelect}
          />
        ))}
        <CarouselEdge />
      </Carousel>
      <ButtonBarContainer>
        <ButtonBar
          activitySelected={!!selected.activity}
          onNotesClick={showNotes}
          onAddClick={() => {
            resetSelectedActivity(selectedDayRef.current);
            goTo("activity-settings");
          }}
          onDeleteClick={confirmDelete}
          onEditClick={() => {
            selected.activity && goTo("activity-settings");
          }}
        />
      </ButtonBarContainer>
    </Background>
  );
}
