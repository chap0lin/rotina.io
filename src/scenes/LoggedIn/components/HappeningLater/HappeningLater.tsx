import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { ActivityCard } from "src/components";
import { ActivityType } from "src/types";
import { Section } from "./HappeningLater.style";
import { texts } from "./HappeningLater.lang";
import { useTime } from "src/hooks/time";
import { isAfter } from "src/functions/time";

interface props {
    activities: ActivityType[];
}

export default function HappeningLater({activities}: props){
    const { language } = useGlobalContext();
    const [hour, minute] = useTime();
    const happeningTexts = texts.get(language);

    const laterActivities = activities.filter((act) => (
        isAfter(act.startsAt, {hour, minute}, true)
    ));
    
    return (
        <Section style={{height: (innerHeight / 3)}}>
            {laterActivities.map((act, index) => (
                <ActivityCard
                    {...act}
                    key={index}
                />
            ))}
            <ActivityCard
                highlighted={false}
                placeholder={happeningTexts.createActivity}
            />
            <ActivityCard empty />
        </Section>
    )
}