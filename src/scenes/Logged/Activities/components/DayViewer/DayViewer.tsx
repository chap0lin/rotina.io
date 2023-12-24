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
    const { innerHeight, language } = useGlobalContext();

    return (
        <OuterSpacer>
            <Container>
                <TitleContainer>
                    <Title>
                        {day} 
                    </Title>
                    {isToday && 
                        <Badge>
                            {language === "pt-br"? "HOJE" : "TODAY"}
                        </Badge>
                    }
                </TitleContainer>
                <Activities style={{height: (innerHeight > 750)? 450 : 300}}>
                    {activities.map((activity, index) => (
                        <ActivityContainer key={index} onClick={() => onActivitySelect(activity)}>
                            <ActivityCard
                                {...activity}
                                highlighted={areActivitiesEqual(activity, selectedActivity)}
                            />
                        </ActivityContainer>
                    ))}
                    <InnerSpacer style={{height: (innerHeight > 750)? 320 : 280}}/>
                </Activities>
            </Container>
        </OuterSpacer>
    )
}