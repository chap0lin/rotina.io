import { useLayoutEffect, useRef } from "react";
import { move, fade } from "src/functions/animation";
import { ActivityCard, Button } from "src/components";
import { activityType } from "src/types";
import { texts } from "./HappeningNow.lang";
import { ButtonText, GsapCard, Activities, Section } from "./HappeningNow.style";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Edit } from "react-feather";
import { colors } from "src/colors";

interface props {
    show: boolean,
    happeningNow: activityType;
    onNotesClick: () => void;
}

export default function HappeningNow({show, happeningNow, onNotesClick}: props){
    const { language, innerHeight } = useGlobalContext();
    const happeningTexts = texts.get(language);
    const buttonHeight = (innerHeight > 750 ? 50 : 40);

    const sectionRef = useRef(null);
    const nothingRef = useRef(null);
    const happeningRef = useRef(null);

    useLayoutEffect(() => {
        move(sectionRef.current, {x: -400});
        fade(happeningRef.current, 0);
    }, []);

    useLayoutEffect(() => {
        move(sectionRef.current, {x: show? 0 : -400}, 1, 0.3);            
    }, [show]);

    useLayoutEffect(() => {
        fade(happeningRef.current, happeningNow? 1 : 0, 1);
        fade(nothingRef.current, happeningNow? 0 : 1, 1);
    }, [happeningNow]);

    return (
        <Section ref={sectionRef}>
            <Activities>
                <GsapCard ref={nothingRef}>
                    <ActivityCard placeholder={happeningTexts.nothingHappening}/>
                </GsapCard>
                <GsapCard ref={happeningRef}>
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
                </GsapCard>
            </Activities>
        </Section>
    );
}