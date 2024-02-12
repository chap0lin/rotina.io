import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { move } from "src/functions/animation";
import { texts } from "./PoupupContent.lang";
import { activityType } from "src/types";
import { ActivityCard } from "src/components";
import { AlertTriangle } from "react-feather";
import { colors } from "src/colors";
import {
  ActivityPreview,
  Ball,
  Buttons,
  Container,
  FocusDiv,
  FocusText,
  NoButton,
  OffCircle,
  Slot,
  Text,
  Title,
  TitleContainer,
  YesButton,
} from "./PoupContent.style";

interface props {
  type: "confirm" | "discard";
  dayIndex?: number;
  activity?: activityType;
  onYes: () => void;
  onNo: () => void;
}

export default function PopupContent({
  type,
  dayIndex,
  activity,
  onYes,
  onNo,
}: props) {
  const { language } = useGlobalContext();
  const popupTexts = texts.get(language);

  const [focus, setFocus] = useState<boolean>(() => true);
  const slotRef = useRef(null);

  useEffect(() => {
    move(slotRef.current, { x: focus ? 0 : -19 }, 0.5);
  }, [focus]);

  useEffect(() => {
    setFocus(true);
  }, [activity]);

  if (type === "discard")
    return (
      <Container>
        <TitleContainer>
          <Title>{popupTexts.woah}</Title>
          <AlertTriangle
            width={30}
            height={30}
            strokeWidth={1.5}
            color={colors.white}
            style={{
              position: "absolute",
              right: 13,
              top: 13,
              zIndex: 100,
            }}
          />
          <OffCircle />
        </TitleContainer>
        <Text style={{ maxWidth: "80%" }}>{popupTexts.confirmDiscard}</Text>
        <Buttons>
          <YesButton onClick={onYes}>{popupTexts.yesDiscard}</YesButton>
          <NoButton onClick={onNo}>{popupTexts.noDiscard}</NoButton>
        </Buttons>
      </Container>
    );

  return (
    <Container>
      <Title>{popupTexts.allGood}</Title>
      <Text>
        {popupTexts.happeningAt}
        {popupTexts.weekdays[dayIndex]}
        {popupTexts.confirmConfim}
      </Text>
      <ActivityPreview>
        <ActivityCard highlighted={focus} {...activity} />
        <FocusDiv>
          <Slot onClick={() => setFocus((prev) => !prev)}>
            <Ball ref={slotRef} />
          </Slot>
          <FocusText>{popupTexts.focus}</FocusText>
        </FocusDiv>
      </ActivityPreview>
      <Buttons>
        <YesButton onClick={onYes}>{popupTexts.yesConfirm}</YesButton>
        <NoButton onClick={onNo}>{popupTexts.noConfirm}</NoButton>
      </Buttons>
    </Container>
  );
}
