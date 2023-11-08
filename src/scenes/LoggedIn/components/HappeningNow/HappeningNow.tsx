import { ActivityCard, Button } from "src/components";
import { ActivityType } from "src/types";
import { Section } from "./HappeningNow.style";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { texts } from "./HappeningNow.lang";

interface props {
    happeningNow: ActivityType;
    onNotesClick: () => void;
}

export default function HappeningNow({happeningNow, onNotesClick}: props){
    const { language } = useGlobalContext();
    const happeningTexts = texts.get(language);

    if(!happeningNow) return <ActivityCard placeholder={happeningTexts.nothingHappening}/>;
    return (
        <Section>
            <ActivityCard {...happeningNow} highlighted/>
            <Button onClick={onNotesClick} width={'300px'} borderRadius={15}>
                {happeningTexts.notes}
            </Button>
        </Section>
    );
}