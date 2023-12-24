import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { texts } from "./PoupupContent.lang";
import { colors } from "src/colors";
import { activityType } from "src/types";
import { ActivityCard } from "src/components";
import { ActivityPreview, Ball, Buttons, Container, FocusDiv, NoButton, Slot, Text, Title, YesButton } from "./PoupContent.style";
import { move } from "src/functions/animation";
import { useEffect, useRef, useState } from "react";

interface props {
    type: "confirm" | "discard";
    dayIndex?: number;
    activity?: activityType;
    onYes: () => void;
    onNo: () => void;
}

export default function PopupContent({type, dayIndex, activity, onYes, onNo}: props){
    const { language } = useGlobalContext();
    const popupTexts = texts.get(language);

    const [focus, setFocus] = useState<boolean>(() => true);
    const slotRef = useRef(null);

    useEffect(() => {
        move(slotRef.current, {x: (focus? 0 : -25)}, 0.5);
    }, [focus]);

    if(type === "discard") return (
        <Container>
            <Title>
                {popupTexts.woah}            
            </Title>
            <Text>
                {popupTexts.confirmDiscard}
            </Text>
            <Buttons>
                <YesButton onClick={onYes} style={{border: `1px solid ${colors.yellow}`}}>
                    {popupTexts.yesDiscard}
                </YesButton>
                <NoButton onClick={onNo}>
                    {popupTexts.noDiscard}
                </NoButton>
            </Buttons>
        </Container>
    )

    return (
        <Container>
            <Title>
                {popupTexts.allGood}            
            </Title>
            <Text>
                {popupTexts.happeningAt}{popupTexts.weekdays[dayIndex]}
                <br/>
                {popupTexts.confirmConfim}
            </Text>
            <ActivityPreview>
                <ActivityCard
                    highlighted={focus}
                    {...activity}
                />
                <FocusDiv>
                    <Slot onClick={() => setFocus(prev => !prev)}>
                        <Ball ref={slotRef}/>
                    </Slot>
                </FocusDiv>
            </ActivityPreview>
            <Buttons style={{justifyContent: "center", gap: "0"}}>
                <YesButton onClick={onYes}>
                    {popupTexts.yesConfirm}
                </YesButton>
                <NoButton onClick={onNo} style={{padding: "10px 25px"}}>
                    {popupTexts.noConfirm}
                </NoButton>
            </Buttons>
        </Container>
    )
}