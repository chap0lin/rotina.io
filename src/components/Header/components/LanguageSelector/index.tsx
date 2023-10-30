import { languageOption, languageSelectionType } from "../../../../types";
import { useLayoutEffect, useRef } from "react";
import { scaleAndVanish, spawnAndScale, vanish } from "../../../../functions/animation";
import brazilFlag from "../../../../assets/icons/brazil.png";
import usaFlag from "../../../../assets/icons/usa.png";
import { Icon, Option, Container, Text } from "./LanguageSelector.style";

const languages: languageSelectionType[] = [
  {
    flag: brazilFlag,
    text: "pt-br",
  }, {
    flag: usaFlag,
    text: "en-us",
  }
]

interface props {
  show: boolean;
  onClick: (lang: languageOption) => void;
}

export default function LanguageSelector({show, onClick}: props){

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
      {languages.map(lang => (
        <Option onClick={() => onClick(lang.text)}>
          <Icon src={lang.flag}/>
          <Text>
            {lang.text}
          </Text>
        </Option>
      ))}
    </Container>
  )
}