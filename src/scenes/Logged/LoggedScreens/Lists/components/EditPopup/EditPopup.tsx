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
  const [showingDanger, setShowingDanger] = useState<boolean>(() => false);
  const [confirming, setConfirming] = useState<boolean>(() => false);
  const [confirmText, setConfirmText] = useState<string | null>(() => null);

  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const dangerRef = useRef(null);

  const dangerButtonsRef = useRef(null);
  const dangerToggleRef = useRef(null);
  const dangerConfirmRef = useRef(null);

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

  useEffect(() => {
    confirmText && setConfirming(true);
  }, [confirmText]);

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
    move(dangerConfirmRef.current, {          //TODO trocar todos os spawnAndMove por simples move!
      y: (confirming)? -85 : 0
    }, {
      duration: 1,
      ease: confirming? "back" : "power2",
      opacity: (confirming)? 1 : 0
    });
    fade(dangerButtonsRef.current, 
      confirming? 0 : 1,
      0.5,
      confirming? 0 : 0.25
    );
    
    !confirming && setTimeout(() => {
      setConfirmText(null);
    }, 500);
  }, [confirming]);

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
                  defaultValue={originalList.name}
                  placeholder={popupTexts.insertName}
                  onChange={() => update()}
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
            disabled={!showingDanger || !originalList.items.length}
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
              {`${confirmText} ${popupTexts.list}`}?
            </DangerText>
            <ConfirmButtons>
              <Button
                disabled={!showingDanger || !originalList.items.length}
                width={70}
                height={40}
                borderRadius={10}
                onClick={() => setConfirming(false)}
              >
                {popupTexts.yep}
              </Button>
              <Button
                disabled={!showingDanger || !originalList.items.length}
                width={70}
                height={40}
                borderRadius={10}
                border={`1px solid ${colors.black}`}
                background={colors.white}
                color={colors.black}
                onClick={() => setConfirming(false)}
              >
                {popupTexts.nope}
              </Button>
            </ConfirmButtons>
        </DangerConfirm>
      </DangerSection>
    </Container>
  );
}