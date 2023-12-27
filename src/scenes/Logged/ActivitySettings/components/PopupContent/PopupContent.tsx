import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { move } from "src/functions/animation";
import { texts } from "./PoupupContent.lang";
import { activityType } from "src/types";
import { ActivityCard } from "src/components";
import { ActivityPreview, Ball, Buttons, CardPreview, Container, FocusDiv, NoButton, Slot, Text, Title, YesButton } from "./PoupContent.style";
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

    useEffect(() => {
        setFocus(true);
    }, [activity]);

    if(type === "discard") return (
        <Container>
            <Title>
                {popupTexts.woah}            
            </Title>
            <Text>
                {popupTexts.confirmDiscard}
            </Text>
            <Buttons>
                <YesButton onClick={onYes}>
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
                {popupTexts.happeningAt}
                {popupTexts.weekdays[dayIndex]}
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
                    <Text>
                        {popupTexts.focus}
                    </Text>
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