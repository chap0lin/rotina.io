import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { move } from "src/functions/animation";
import { texts } from "./PoupupContent.lang";
import { activityType } from "src/types";
import { ActivityCard } from "src/components";
import {
  ActivityPreview,
  Ball,
  Buttons,
  Container,
  FocusDiv,
  NoButton,
  Slot,
  Text,
  Title,
  YesButton,
} from "./PoupContent.style";

interface props {
  dayIndex?: number;
  activity?: activityType;
  onYes: () => void;
  onNo: () => void;
}

export default function PopupContent({
  dayIndex,
  activity,
  onYes,
  onNo,
}: props) {
  const { language } = useGlobalContext();
  const popupTexts = texts.get(language);

  return (
    <Container>
      <Title>{popupTexts.woah}</Title>
      <Text>
        {popupTexts.question}
        {popupTexts.weekdays[dayIndex]}
        {popupTexts.confirm}
      </Text>
      <ActivityPreview>
        <ActivityCard highlighted {...activity} />
      </ActivityPreview>
      <Buttons>
        <YesButton onClick={onYes}>{popupTexts.yes}</YesButton>
        <NoButton onClick={onNo}>{popupTexts.no}</NoButton>
      </Buttons>
    </Container>
  );
}
