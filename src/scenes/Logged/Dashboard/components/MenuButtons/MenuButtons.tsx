import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { texts } from "./MenuButtons.lang";
import { Button } from "src/components";
import { colors } from "src/colors";
import { reactToClick } from "src/functions/animation";
import {
  AlignLeft,
  AlignRight,
  Buttons,
  Icon,
  Text,
} from "./MenuButtons.style";

interface props {
  show: boolean;
  onWeekClick: () => void;
  onListsClick: () => void;
}

export default function MenuButtons({
  show,
  onWeekClick,
  onListsClick,
}: props) {
  const { language } = useGlobalContext();
  const menuTexts = texts.get(language);

  const listsIconRef = useRef(null);
  const weekIconRef = useRef(null);

  return (
    <Buttons>
      <Button
        padding={"10px"}
        onClick={() => reactToClick(listsIconRef.current, onListsClick)}>
        <AlignLeft>
          <Icon ref={listsIconRef}>
            <ChevronLeft
              width={"100%"}
              height={"100%"}
              color={colors.darkWhite}
            />
          </Icon>
          <Text>{menuTexts.lists}</Text>
        </AlignLeft>
      </Button>
      <Button
        padding={"10px"}
        onClick={() => reactToClick(weekIconRef.current, onWeekClick)}>
        <AlignRight>
          <Text>{menuTexts.week}</Text>
          <Icon ref={weekIconRef}>
            <ChevronRight
              width={"100%"}
              height={"100%"}
              color={colors.darkWhite}
            />
          </Icon>
        </AlignRight>
      </Button>
    </Buttons>
  );
}
