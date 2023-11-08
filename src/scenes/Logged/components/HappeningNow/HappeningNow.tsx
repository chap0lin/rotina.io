import { ActivityCard, Button } from "src/components";
import { ActivityType } from "src/types";
import { texts } from "./HappeningNow.lang";
import { ButtonText, Section } from "./HappeningNow.style";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Edit } from "react-feather";
import { colors } from "src/colors";

interface props {
    happeningNow: ActivityType;
    onNotesClick: () => void;
}

export default function HappeningNow({happeningNow, onNotesClick}: props){
    const { language, innerHeight } = useGlobalContext();
    const happeningTexts = texts.get(language);

    const buttonHeight = (innerHeight > 750 ? 50 : 40)

    if(!happeningNow) return <ActivityCard placeholder={happeningTexts.nothingHappening}/>;
    return (
        <Section>
            <ActivityCard {...happeningNow} highlighted/>
            <Button onClick={onNotesClick} width={"85%"} height={buttonHeight} borderRadius={15}>
                <ButtonText>
                    {happeningTexts.notes}
                </ButtonText>
                <Edit
                    width={buttonHeight/2}
                    height={buttonHeight/2}
                    color={colors.darkWhite}
                    strokeWidth={1.2}
                />
            </Button>
        </Section>
    );
}