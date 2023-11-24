import { useLayoutEffect, useRef } from "react";
import { move } from "src/functions/animation";
import { texts } from "./HappeningLater.lang";
import { activityType } from "src/types";
import { ActivityCard } from "src/components";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { EmptyFooter, Section } from "./HappeningLater.style";

interface props {
  show: boolean;
  happeningLater: activityType[];
}

export default function HappeningLater({ show, happeningLater }: props) {
  const { language, innerHeight } = useGlobalContext();
  const happeningTexts = texts.get(language);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    move(sectionRef.current, { x: -400 });
  }, []);

  useLayoutEffect(() => {
    move(sectionRef.current, { x: show ? 0 : -400 }, 1, 1);
  }, [show]);

  return (
    <Section style={{ height: innerHeight / 3 }} ref={sectionRef}>
      {happeningLater && happeningLater.map((act, index) => (
        <ActivityCard {...act} key={index} />
      ))}
      <ActivityCard
        highlighted={false}
        placeholder={happeningTexts.createActivity}
      />
      <EmptyFooter style={{ height: innerHeight / 6 }} />
    </Section>
  );
}
