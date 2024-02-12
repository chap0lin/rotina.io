import { useRef } from "react";
import { colors } from "src/colors";
import { activityType } from "src/types";
import { Check, X, XCircle } from "react-feather";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { ActivityCard, CustomCircleIcon } from "src/components";
import {
  Buttons,
  Container,
  Gsap,
  Invalid,
  Title,
  UpperBar,
} from "./Preview.style";
import { reactToClick } from "src/functions/animation";

interface props {
  title: string;
  errorMsg: string | null;
  activity: activityType;
  onConfirm: () => void;
  onDiscard: () => void;
}

export default function Preview({
  title,
  errorMsg,
  activity,
  onConfirm,
  onDiscard,
}: props) {
  const { innerHeight } = useGlobalContext();
  const buttonSize = innerHeight > 740 ? 40 : 35;

  const yesRef = useRef(null);
  const noRef = useRef(null);

  const isDisabled = () => {
    if (
      errorMsg ||
      !activity ||
      !activity.what ||
      !activity.where ||
      !activity.who
    )
      return true;
    return false;
  };

  const onConfirmClick = () => {
    !isDisabled() && reactToClick(yesRef.current, onConfirm);
  };

  const onDiscardClick = () => {
    reactToClick(noRef.current, onDiscard);
  };

  return (
    <Container>
      <UpperBar>
        <Title>{title}</Title>
        <Buttons>
          <Gsap
            ref={yesRef}
            style={{ opacity: isDisabled() ? 0.4 : 1 }}
            onClick={onConfirmClick}>
            <CustomCircleIcon
              innerIcon={Check}
              width={buttonSize}
              height={buttonSize}
              color={colors.green}
              strokeWidth={1}
            />
          </Gsap>
          <Gsap ref={noRef} onClick={onDiscardClick}>
            <CustomCircleIcon
              innerIcon={X}
              width={buttonSize}
              height={buttonSize}
              color={colors.red}
              strokeWidth={1}
            />
          </Gsap>
        </Buttons>
      </UpperBar>
      <ActivityCard highlighted {...activity} />
      <Invalid>{errorMsg}</Invalid>
    </Container>
  );
}
