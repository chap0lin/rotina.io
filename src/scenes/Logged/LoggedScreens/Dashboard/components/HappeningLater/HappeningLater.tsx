import { useLayoutEffect, useRef } from "react";
import { Plus } from "react-feather";
import { move } from "src/functions/animation";
import { colors } from "src/colors";
import { texts } from "./HappeningLater.lang";
import { activityType } from "src/types";
import { ActivityCard } from "src/components";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { CreateDiv, CreateIcon, CreateText, EmptyFooter, Placeholder, PlaceholderText, Section, Snap } from "./HappeningLater.style";

interface props {
  show: boolean;
  happeningLater: activityType[];
}

export default function HappeningLater({ show, happeningLater }: props) {
  const { language, innerHeight } = useGlobalContext();
  const { goTo, resetSelectedActivity } = useLoggedContext();
  const happeningTexts = texts.get(language);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    move(sectionRef.current, { x: -400 });
  }, []);

  useLayoutEffect(() => {
    move(sectionRef.current, { x: show ? 0 : -400 }, 1, 1);
  }, [show]);

  const createNewActivity = (
    <Placeholder>
      <PlaceholderText>
        {happeningTexts.createActivity[0]}
      </PlaceholderText>
      <CreateDiv>
        <CreateIcon>
          <Plus
            width={"100%"}
            height={"100%"}
            color={colors.white}
          />
        </CreateIcon>
        <CreateText>
          {happeningTexts.createActivity[1]}
        </CreateText>
      </CreateDiv>
    </Placeholder>
  )

  return (
    <Section ref={sectionRef}>
      {happeningLater &&
        happeningLater.map((act, index) => (
          <Snap key={index}>
            <ActivityCard {...act} />
          </Snap>
        ))}
      <Snap onClick={() => {
        resetSelectedActivity();
        goTo("activity-settings");
      }}>
        <ActivityCard
          highlighted={false}
          placeholder={createNewActivity}
        />
      </Snap>
      <EmptyFooter style={{ height: innerHeight / 6 }} />
    </Section>
  );
}
