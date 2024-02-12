import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { texts } from "./MenuButtons.lang";
import { Button } from "src/components";
import { colors } from "src/colors";
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
  const { language, innerHeight } = useGlobalContext();
  const menuTexts = texts.get(language);

  const listsIconRef = useRef(null);
  const weekIconRef = useRef(null);

  return (
    <Buttons>
      <Button
        padding={"0 0 0 10px"}
        borderRadius={"15px 0 0 15px"}
        // width={(innerHeight > 750? 148 : 120)}
        height={(innerHeight > 750? 50 : 40)}
        onClick={onListsClick}>
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
        padding={"0 10px 0 0"}
        borderRadius={"0 15px 15px 0"}
        // width={(innerHeight > 750? 148 : 120)}
        height={(innerHeight > 750? 50 : 40)}
        onClick={onWeekClick}>
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
