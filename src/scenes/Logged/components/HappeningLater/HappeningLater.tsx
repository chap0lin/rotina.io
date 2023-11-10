import { useLayoutEffect, useRef } from "react";
import { move } from "src/functions/animation";
import { texts } from "./HappeningLater.lang";
import { useTime } from "src/hooks/time";
import { isAfter } from "src/functions/time";
import { activityType } from "src/types";
import { ActivityCard } from "src/components";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { EmptyFooter, Section } from "./HappeningLater.style";

interface props {
    show: boolean;
    activities: activityType[];
}

export default function HappeningLater({show, activities}: props){
    const { language, innerHeight } = useGlobalContext();
    const [hour, minute] = useTime();
    const happeningTexts = texts.get(language);
    const sectionRef = useRef(null);

    const laterActivities = activities.filter((act) => (
        isAfter(act.startsAt, {hour, minute}, true)
    ));

    useLayoutEffect(() => {
        move(sectionRef.current, {x: -400});
    }, []);

    useLayoutEffect(() =>{
        move(sectionRef.current, {x: (show)? 0 : -400}, 1, 1);
    }, [show]);
    
    return (
        <Section style={{height: (innerHeight / 3)}} ref={sectionRef}>
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
            <EmptyFooter style={{height: (innerHeight / 6)}}/>
        </Section>
    )
}