import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { reactToClick } from "src/functions/animation";
import { ColorOption } from "src/components";
import { listType } from "src/types";
import { colors } from "src/colors";
import { texts } from "./EditPopup.lang";
import { Edit2 } from "react-feather";
import { Container, Input, InputButton, Options, Row, Text, Title } from "./EditPopup.style";

interface props {
  originalList: listType,
  onUpdate: (newList: listType) => void;
}

const colorsAvailable = [
  colors.red,
  colors.green,
  colors.blue,
  colors.black
]

export default function EditListPopup({originalList, onUpdate}: props){
  const { language } = useGlobalContext();
  const popupTexts = texts.get(language);

  const [editing, setEditing] = useState<listType>(() => originalList);

  const inputRef = useRef(null);
  const iconRef = useRef(null);

  const focusOnInput = () => {
    if(!inputRef.current) return;
    reactToClick(
      iconRef.current,
      () => inputRef.current.focus()
    );
  }

  const update = (newColor?: string) => {
    const newName = (inputRef.current)? inputRef.current.value.trim() : "";
    setEditing((previous) => ({
      ...previous,
      name: newName.length? newName : originalList.name,
      color: newColor?? previous.color,
    }));
  }

  useEffect(() => {
    editing && onUpdate(editing);
  }, [editing]);

  return (
    <Container>
      <Title>
        {originalList? "Editar lista" : "Nova lista"}
      </Title>
      <Row>
          <Text>
            Nome:
          </Text>
          <Options>
              <Input 
                ref={inputRef}
                defaultValue={originalList.name}
                placeholder="insira o nome da lista"
                onChange={() => update()}
              />
              <InputButton ref={iconRef}>
                <Edit2 strokeWidth={3} width={"100%"} height={"100%"} onClick={focusOnInput}/>
              </InputButton>
          </Options>
      </Row>
      <Row>
          <Text>
            Cor:
          </Text>
          <Options>
            {colorsAvailable.map((color, colorIndex) => (
              <ColorOption
                key={colorIndex}
                color={color}
                selected={editing && (color === editing.color)}
                onClick={() => update(color)}
              />
            ))}
          </Options>
      </Row>
    </Container>
  );
}