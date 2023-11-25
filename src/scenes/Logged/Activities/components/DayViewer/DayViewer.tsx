import { colors } from "src/colors";
import { activityType } from "src/types";
import { ActivityCard, Wave } from "src/components";
import { areActivitiesEqual } from "src/functions";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Activities, ActivityContainer, Badge, Container, InnerSpacer, OuterSpacer, Title, TitleContainer } from "./DayViewer.style";

interface props {
    day: string,
    isToday: boolean,
    activities?: activityType[],
    selectedActivity: activityType;
    onActivitySelect: (activity: activityType) => void, 
}

export default function DayViewer({day, isToday, activities, selectedActivity, onActivitySelect}: props){
    return (
        <OuterSpacer>
            <Container>
                <TitleContainer>
                    <Title>
                        {day} 
                    </Title>
                    {isToday && 
                        <Badge>
                            hoje
                        </Badge>
                    }
                </TitleContainer>
                <Activities style={{height: 400}}>
                    {activities.map((activity, index) => (
                        <ActivityContainer key={index} onClick={() => onActivitySelect(activity)}>
                            <ActivityCard
                                {...activity}
                                highlighted={areActivitiesEqual(activity, selectedActivity)}
                            />
                        </ActivityContainer>
                    ))}
                    <InnerSpacer style={{height: 300}}/>
                </Activities>
            </Container>
        </OuterSpacer>
    )
}