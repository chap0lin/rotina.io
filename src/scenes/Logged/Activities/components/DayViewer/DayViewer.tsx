import { activityType } from "src/types";
import { ActivityCard, Button } from "src/components";
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
    const { language, innerHeight, innerWidth } = useGlobalContext();

    return (
        <OuterSpacer>
            <Container style={{maxWidth: 0.8 * innerWidth}}>
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
                <Activities style={{height: (innerHeight > 750)? 450 : 400}}>
                    {activities.map((activity, index) => (
                        <ActivityContainer key={index} onClick={() => onActivitySelect(activity)}>
                            <ActivityCard
                                {...activity}
                                highlighted={areActivitiesEqual(activity, selectedActivity)}
                            />
                        </ActivityContainer>
                    ))}
                    <InnerSpacer style={{height: (innerHeight > 750)? 320 : 300}}/>
                </Activities>
            </Container>
        </OuterSpacer>
    )
}