import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fade, move, reactToClick, resize, rotate } from "src/functions/animation";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Button, ColorOption } from "src/components";
import { listType } from "src/types";
import { colors } from "src/colors";
import { texts } from "./EditPopup.lang";
import { ChevronUp, Edit2 } from "react-feather";
import { ButtonSection, ConfirmButtons, Container, DangerButton, DangerConfirm, DangerSection, DangerText, DangerTitle, EditSection, Input, InputButton, Option, Options, Row, Text, Title } from "./EditPopup.style";

interface props {
  editing: listType;
  onUpdate: (newList: listType) => void;
  onClear: () => void;
  onDelete: () => void;
}

const colorsAvailable = [
  colors.red,
  colors.green,
  colors.blue,
  colors.black
]

export default function EditListPopup({editing, onUpdate, onClear, onDelete}: props){
  const { language } = useGlobalContext();
  const popupTexts = texts.get(language);

  const [showingDanger, setShowingDanger] = useState<boolean>(() => false);
  const [confirmText, setConfirmText] = useState<string | null>(() => null);
  
  /*
    TODO gambiarra. Apenas um useState deveria ser preciso
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
    este popup nasceu é restaurado, independentemente de quantas
    modificações fizemos, e isso é inaceitável. 
    
    Gostaria de investigar mais, mas sinceramente estou
    ficando sem paciência.
  */
  const [color, setColor] = useState<string>(() => editing.color);
  const colorRef = useRef(color);
  
  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const dangerRef = useRef(null);

  const dangerButtonsRef = useRef(null);
  const dangerToggleRef = useRef(null);
  const dangerConfirmRef = useRef(null);

  const onYes = () => {
    if(confirmText === popupTexts.clear) return onClear();
    onDelete();
  }

  const onNo = () => {
    setConfirmText(null);
  }

  const focusOnInput = () => {
    if(!inputRef.current) return;
    reactToClick(iconRef.current,
      () => inputRef.current.focus()
    );
  }

  const toggleDanger = () => {
    if(!dangerToggleRef.current) return;
    setShowingDanger(prev => !prev);
  }

  const update = () => {
    if(!inputRef.current) return;
    const name = inputRef.current.value.trim();
    const color = colorRef.current;
    if(!name.length) return;
    onUpdate({...editing, name, color});
  }


  useLayoutEffect(() => {
    resize(dangerRef.current, {height: 70});
    move(dangerConfirmRef.current, {y: 0});
  }, []);


  useLayoutEffect(() => {
    resize(dangerRef.current, {
      height: (showingDanger)? "auto" : 70
    }, 1);
    rotate(dangerToggleRef.current,
      (showingDanger)? -180 : 0,
    1);
    !showingDanger && setConfirmText(null);
  }, [showingDanger]);


  useLayoutEffect(() => {
    move(dangerConfirmRef.current, {
      y: (confirmText)? -85 : 0
    }, {
      duration: 1,
      ease: confirmText? "back" : "power2",
      opacity: (confirmText)? 1 : 0
    });
    fade(dangerButtonsRef.current, 
      confirmText? 0 : 1,
      0.5,
      confirmText? 0 : 0.25
    );
    
    !confirmText && setTimeout(() => {
      setConfirmText(null);
    }, 500);
  }, [confirmText]);


  return (
    <Container>
      <EditSection>
        <Title>
          {popupTexts.properties}
        </Title>
        <Row>
            <Text>
              {popupTexts.name}:
            </Text>
            <Options>
                <Input 
                  ref={inputRef}
                  defaultValue={editing.name}
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
                  selected={editing && (color === col)}
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
      <DangerSection ref={dangerRef} style={{opacity: showingDanger? 1 : 0.5}}>
        <Row style={{height: 40}}>
          <DangerTitle>
            {popupTexts.dangerZone}
          </DangerTitle>
          <DangerButton ref={dangerToggleRef}>
            <ChevronUp strokeWidth={3} color={colors.pink} width={"100%"} height={"100%"} onClick={toggleDanger}/>
          </DangerButton>
        </Row>
        <ButtonSection ref={dangerButtonsRef}>
          <Button
            disabled={!showingDanger || !editing.items.length}
            height={45}
            borderRadius={10}
            onClick={() => setConfirmText(popupTexts.clear)}
          >
            {`${popupTexts.clear} ${popupTexts.list}`}
          </Button>
          <Button
            disabled={!showingDanger}
            height={45}
            borderRadius={10}
            background={colors.pink}
            onClick={() => setConfirmText(popupTexts.delete)}
          >
            {`${popupTexts.delete} ${popupTexts.list}`}
          </Button>
        </ButtonSection>
        <DangerConfirm ref={dangerConfirmRef}>
            <DangerText>
              {(confirmText)? `${confirmText} ${popupTexts.list}?` : ""}
            </DangerText>
            <ConfirmButtons>
              <Button
                width={70}
                height={40}
                borderRadius={10}
                onClick={onYes}
              >
                {popupTexts.yep}
              </Button>
              <Button
                width={70}
                height={40}
                borderRadius={10}
                border={`1px solid ${colors.black}`}
                background={colors.white}
                color={colors.black}
                onClick={onNo}
              >
                {popupTexts.nope}
              </Button>
            </ConfirmButtons>
        </DangerConfirm>
      </DangerSection>
    </Container>
  );
}