import { selectionType } from "src/types";
import { useLayoutEffect, useRef } from "react";
import { scaleAndVanish, spawnAndScale, vanish } from "src/functions/animation";
import { Icon, Option, Container, Text } from "./Selector.style";

interface props {
  optionList: selectionType[];
  show: boolean;
  uppercase?: boolean;
  onClick: (option: string) => void;
}

const getIcon = (element: string | JSX.Element) => {
  if(typeof element === "string") return <Icon src={element}/>
  return element;
}

export default function Selector({optionList, show, uppercase, onClick}: props){

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
      {optionList.map((option, index) => (
        <Option key={index} onClick={(e) => {
          e.stopPropagation();
          onClick(option.text);
        }}>
          {getIcon(option.icon)}
          <Text style={{textTransform: (uppercase? "uppercase" : "unset")}}>
            {option.text}
          </Text>
        </Option>
      ))}
    </Container>
  )
}