import { useLayoutEffect, useRef } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { move, fade, reactToClick } from "src/functions/animation";
import { ActivityCard, Button } from "src/components";
import { activityType } from "src/types";
import { texts } from "./HappeningNow.lang";
import { Edit } from "react-feather";
import { colors } from "src/colors";
import {
  ButtonText,
  Gsap,
  Section,
  GsapActivity,
  GsapHappening,
  Icon,
} from "./HappeningNow.style";

interface props {
  show: boolean;
  happeningNow: activityType;
  onNotesClick: () => void;
}

export default function HappeningNow({
  show,
  happeningNow,
  onNotesClick,
}: props) {
  const { language, innerWidth, innerHeight } = useGlobalContext();
  const happeningTexts = texts.get(language);
  const buttonHeight = innerHeight > 750 ? 50 : 40;

  const sectionRef = useRef(null);
  const nothingRef = useRef(null);
  const happeningRef = useRef(null);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);

  useLayoutEffect(() => {
    move(buttonRef.current, { y: 0 });
    move(sectionRef.current, { x: -400 });
    fade(happeningRef.current, 0);
  }, []);

  useLayoutEffect(() => {
    move(sectionRef.current, {
      x: show ? 0 : -innerWidth
    }, {
      duration: 1,
      delay: 0.3
    });
  }, [show]);

  useLayoutEffect(() => {
    move(buttonRef.current, {
      y: happeningNow ? 0 : -60
    }, {
      duration: 1
    });
    fade(happeningRef.current, happeningNow ? 1 : 0, 1);
    fade(nothingRef.current, happeningNow ? 0 : 1, 1, 0.5);
  }, [happeningNow]);

  return (
    <Section ref={sectionRef}>
      <Gsap>
        <GsapActivity ref={nothingRef}>
          <ActivityCard placeholder={happeningTexts.nothingHappening} />
        </GsapActivity>
        <GsapActivity ref={happeningRef}>
          <GsapHappening>
            <ActivityCard {...happeningNow} highlighted />
          </GsapHappening>
          <Gsap ref={buttonRef}>
            <Button
              onClick={() => reactToClick(iconRef.current, onNotesClick)}
              width={"85%"}
              height={buttonHeight}
              borderRadius={15}>
              <ButtonText>{happeningTexts.notes}</ButtonText>
              <Icon
                ref={iconRef}
                style={{
                  width: buttonHeight / 2,
                  height: buttonHeight / 2,
                }}>
                <Edit
                  width={"100%"}
                  height={"100%"}
                  color={colors.white}
                  strokeWidth={1}
                />
              </Icon>
            </Button>
          </Gsap>
        </GsapActivity>
      </Gsap>
    </Section>
  );
}
