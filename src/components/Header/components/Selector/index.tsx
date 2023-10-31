import { languageOption, selectionType } from "../../../../types";
import { useLayoutEffect, useRef } from "react";
import { scaleAndVanish, spawnAndScale, vanish } from "../../../../functions/animation";
import { Icon, Option, Container, Text } from "./Selector.style";

interface props {
  optionList: selectionType[];
  show: boolean;
  onClick: (lang: languageOption) => void;
}

export default function Selector({optionList, show, onClick}: props){

  const containerRef = useRef(null);

  useLayoutEffect(() => {
    vanish(containerRef.current);
  }, [])

  useLayoutEffect(() => {
    if(show){
      spawnAndScale(containerRef.current, 1, 0.25, "flex");
    } else {
      scaleAndVanish(containerRef.current, 0, 0.25);
    }
  }, [show]);

  return (
    <Container ref={containerRef}>
      {optionList.map(lang => (
        <Option onClick={() => onClick(lang.text as languageOption)}>
          <Icon src={lang.icon}/>
          <Text>
            {lang.text}
          </Text>
        </Option>
      ))}
    </Container>
  )
}