import { useRef, useState } from "react";
import { reactToClick } from "src/functions/animation";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Button, ColorOption } from "src/components";
import { listType } from "src/types";
import { colors } from "src/colors";
import { texts } from "./EditPopup.lang";
import { Edit2 } from "react-feather";
import { Container, EditSection, Input, InputButton, Options, Row, Text, Title } from "./EditPopup.style";
import { DangerSection } from "./components";

interface props {
  editing: listType | null;
  onUpdate: (newList: listType) => void;
  onClear: () => void;
  onDelete: () => void;
  onCreate: (newList: listType) => void;
}

const colorsAvailable = [
  colors.red,
  colors.yellow,
  colors.green,
  colors.blue,
  colors.purple,
  colors.black
]

export default function EditListPopup({editing, onUpdate, onClear, onDelete, onCreate}: props){
  const { language } = useGlobalContext();
  const popupTexts = texts.get(language);
  
  const [isValid, setIsValid] = useState(() => (editing)? true : false);
  /*
    TODO gambiarra no color. Apenas um useState deveria ser preciso
    para a cor, em vez de um useState e um useRef, mas estou
    tendo problemas significativos em persistir o estado do
    componente pai quando o popup desaparece. Parece que
    adotar um useEffect para atualizar o estado do pai é quem
    está causando o problema. Essencialmente, se fizermos isso...

    const update = () => {
      if(!inputRef.current) return;
      const name = inputRef.current.value.trim();
      if(!name.length) return;
      onUpdate({...editing, name, color});
    }

    useEffect(() => {
      update();
    }, [color]);

    ...em vez da jeito atual, o estado original da lista quando
    este popup nasceu é restaurado no momento que o popup é
    fechado, independentemente de quantas modificações fizemos,
    e isso é inaceitável.
    
    Gostaria de investigar mais, mas sinceramente estou
    ficando sem paciência.
  */
  const [color, setColor] = useState<string>(() => editing? editing.color : "");
  const colorRef = useRef(color);
  
  const inputRef = useRef(null);
  const iconRef = useRef(null);

  const focusOnInput = () => {
    if(!inputRef.current) return;
    reactToClick(iconRef.current,
      () => inputRef.current.focus()
    );
  }

  const validateInputs = () => {
    if(!inputRef.current) return null;
    const name = inputRef.current.value.trim();
    const color = colorRef.current;
    if(!name.length || !color.length) return null;
    return {name, color};
  }

  const update = () => {
    const validated = validateInputs();
    if(!validated) return setIsValid(false);
    const {name, color} = validated;
    const items = editing? [...editing.items] : [];
    setIsValid(true);
    onUpdate({name, color, items});
  }

  const createNewList = () => {
    const {name, color} = validateInputs();
    const items = [];
    onCreate({name, color, items});
  }

  return (
    <Container>
      <EditSection>
        <Title>
          {editing? popupTexts.properties : popupTexts.newList}
        </Title>
        <Row>
            <Text>
              {popupTexts.name}:
            </Text>
            <Options>
                <Input 
                  ref={inputRef}
                  defaultValue={editing? editing.name : ""}
                  placeholder={popupTexts.insertName}
                  onChange={update}
                />
                <InputButton ref={iconRef}>
                  <Edit2 strokeWidth={3} width={"100%"} height={"100%"} onClick={focusOnInput}/>
                </InputButton>
            </Options>
        </Row>
        <Row>
            <Text>
              {popupTexts.color}:
            </Text>
            <Options>
              {colorsAvailable.map((col, index) => (
                <ColorOption
                  key={index}
                  color={col}
                  selected={color === col}
                  onClick={() => {
                    colorRef.current = col;
                    setColor(col);
                    update();
                  }}
                />
              ))}
            </Options>
        </Row>
      </EditSection>
      {editing && (
        <DangerSection
          list={editing}
          onClear={onClear}
          onDelete={onDelete}
        />
      )}
      {!editing && (
        <Button
          width={"100%"}
          borderRadius={10}
          onClick={createNewList}
          disabled={!isValid}
        >
          {`${popupTexts.create} ${popupTexts.list}`}
        </Button>
      )}
    </Container>
  );
}