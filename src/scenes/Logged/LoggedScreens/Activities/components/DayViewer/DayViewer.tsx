import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { areActivitiesEqual } from "src/functions";
import { dayElementId } from "src/constants";
import { texts } from "./DayViewer.lang";
import { activityType } from "src/types";
import { ActivityCard } from "src/components";
import {
  Activities,
  ActivityContainer,
  ActivitySymbol,
  Badge,
  Container,
  InnerSpacer,
  NothingHere,
  OuterSpacer,
  Title,
  TitleContainer,
} from "./DayViewer.style";

interface props {
  day: string;
  index: number;
  isToday: boolean;
  activities?: activityType[];
  selectedActivity: activityType;
  onActivitySelect: (activity: activityType) => void;
}

export default function DayViewer({
  day,
  index,
  isToday,
  activities,
  selectedActivity,
  onActivitySelect,
}: props) {
  const { innerHeight, language } = useGlobalContext();
  const dayTexts = texts.get(language);
  const hasActivities = activities.length > 0;

  return (
    <OuterSpacer>
      <Container id={`${dayElementId}${index}`}>
        <TitleContainer>
          <Title>{day}</Title>
          {isToday && <Badge>{dayTexts.today}</Badge>}
        </TitleContainer>
        <Activities style={{ height: innerHeight > 750 ? 450 : 300 }}>
          {!hasActivities && <NothingHere>{dayTexts.allQuiethere}</NothingHere>}
          {hasActivities &&
            activities.map((activity, index) => (
              <ActivitySymbol
                key={index}
                style={{
                  background: areActivitiesEqual(activity, selectedActivity)
                    ? activity.color
                    : "none",
                  border: `1px solid ${activity.color}`,
                  transform: `translateY(${index * 12}px)`,
                }}
              />
            ))}
          {hasActivities &&
            activities.map((activity, index) => (
              <ActivityContainer
                key={100 * index + 1}
                onClick={() => onActivitySelect(activity)}>
                <ActivityCard
                  {...activity}
                  highlighted={areActivitiesEqual(activity, selectedActivity)}
                />
              </ActivityContainer>
            ))}
          <InnerSpacer style={{ height: innerHeight > 750 ? 320 : 280 }} />
        </Activities>
      </Container>
    </OuterSpacer>
  );
}
