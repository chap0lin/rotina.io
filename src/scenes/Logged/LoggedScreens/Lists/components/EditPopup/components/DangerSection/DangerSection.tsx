import { useLayoutEffect, useRef, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { fade, move, resize, rotate } from "src/functions/animation";
import { ChevronUp } from "react-feather";
import { listType } from "src/types";
import { texts } from "./DangerSection.lang";
import { colors } from "src/colors";
import { Button } from "src/components";
import { ButtonSection, ConfirmButtons, DangerButton, DangerConfirm, DangerContainer, DangerText, DangerTitle, Row } from "./DangerSection.style";

interface props {
    list: listType | null;
    onClear: () => void;
    onDelete: () => void;
}

export default function DangerSection({list, onClear, onDelete}: props){
    const { language } = useGlobalContext();
    const dangerTexts = texts.get(language);
  
    const [showingDanger, setShowingDanger] = useState<boolean>(() => false);
    const [confirmText, setConfirmText] = useState<string | null>(() => null);
    
    const emptyList = (list && list.items && !list.items.length);
    const dangerRef = useRef(null);
    const dangerButtonsRef = useRef(null);
    const dangerToggleRef = useRef(null);
    const dangerConfirmRef = useRef(null);
  
    const onYes = () => {
      if(confirmText === dangerTexts.clear) return onClear();
      onDelete();
    }
  
    const onNo = () => {
      setConfirmText(null);
    }
  
    const toggleDanger = () => {
      if(!dangerToggleRef.current) return;
      setShowingDanger(prev => !prev);
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
        <DangerContainer ref={dangerRef} style={{opacity: showingDanger? 1 : 0.5}}>
            <Row style={{height: 40}}>
                <DangerTitle>
                    {dangerTexts.dangerZone}
                </DangerTitle>
                <DangerButton ref={dangerToggleRef}>
                    <ChevronUp strokeWidth={3} color={colors.pink} width={"100%"} height={"100%"} onClick={toggleDanger}/>
                </DangerButton>
            </Row>
            <ButtonSection ref={dangerButtonsRef}>
                <Button
                    disabled={!showingDanger || emptyList}
                    height={45}
                    borderRadius={10}
                    onClick={() => setConfirmText(dangerTexts.clear)}
                >
                    {`${dangerTexts.clear} ${dangerTexts.list}`}
                </Button>
                <Button
                    disabled={!showingDanger}
                    height={45}
                    borderRadius={10}
                    background={colors.pink}
                    onClick={() => setConfirmText(dangerTexts.delete)}
                >
                    {`${dangerTexts.delete} ${dangerTexts.list}`}
                </Button>
            </ButtonSection>
            <DangerConfirm ref={dangerConfirmRef}>
                <DangerText>
                    {(confirmText)? `${confirmText} ${dangerTexts.list}?` : ""}
                </DangerText>
                <ConfirmButtons>
                    <Button
                        width={70}
                        height={40}
                        borderRadius={10}
                        onClick={onYes}
                    >
                        {dangerTexts.yep}
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
                        {dangerTexts.nope}
                    </Button>
                </ConfirmButtons>
            </DangerConfirm>
        </DangerContainer>
    )
}