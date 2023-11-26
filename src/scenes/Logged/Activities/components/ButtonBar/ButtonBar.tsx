import { useEffect, useRef } from "react";
import { colors } from "src/colors";
import { texts } from "./ButtonBar.lang";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Check, Edit2, Plus, XCircle } from "react-feather";
import { fadeIn, fadeOut, move, reactToClick, resize } from "src/functions/animation";
import CustomCircleIcon from "./components/CheckCircle2";
import { AddButton, AddIcon, AddText, ButtonsContainer, Gsap } from "./ButtonBar.style";

interface props {
    activitySelected: boolean;
    onAddClick: () => void;
    onAcceptClick: () => void;
    onEditClick: () => void;
    onDeleteClick: () => void;
}

export default function ButtonBar({activitySelected, onAddClick, onAcceptClick, onEditClick, onDeleteClick}: props){
    const { language, innerHeight } = useGlobalContext();
    const iconSize = (innerHeight > 750) ? 50 : 40; 
    const barTexts = texts.get(language);

    const addRef = useRef(null);
    const addIconRef = useRef(null);
    const acceptRef = useRef(null);
    const editRef = useRef(null);
    const deleteRef = useRef(null);

    useEffect(() => {
        fadeOut([
            editRef.current,
            acceptRef.current,
            deleteRef.current,
        ]);
    }, []);

    useEffect(() => {
        if(!activitySelected){
            resize(addRef.current, {width: 150}, 1);
            fadeOut([
                editRef.current,
                acceptRef.current,
                deleteRef.current,
            ], 0.5);
            move([
                editRef.current,
                acceptRef.current,
                deleteRef.current,
            ], {x: 0}, 1);
        } else {
            resize(addRef.current, {width: 120}, 1);
            fadeIn([
                editRef.current,
                acceptRef.current,
                deleteRef.current,
            ], 0.5);
            move(deleteRef.current, {x: 75}, 1);
            move(editRef.current, {x: 150}, 1); 
        }
    }, [activitySelected]);

    return (
        <ButtonsContainer>
            <AddButton ref={addRef} onClick={() => reactToClick(addIconRef.current, onAddClick, 0.5)}>
                <AddText>
                    {barTexts.new}
                </AddText>
                <AddIcon ref={addIconRef} style={{width: (0.6 * iconSize), height: (0.6 * iconSize)}}>
                    <Plus
                        width={0.6 * iconSize}
                        height={0.6 * iconSize}
                        strokeWidth={0.8}
                        color={colors.white}
                    />
                </AddIcon>
            </AddButton>
            <Gsap ref={acceptRef} onClick={() => activitySelected && onAcceptClick()}>
                <CustomCircleIcon
                    innerIcon={Check}
                    width={iconSize}
                    height={iconSize}
                    strokeWidth={0.8}
                    color={colors.green}
                />
            </Gsap>
            <Gsap ref={editRef} onClick={() => activitySelected && onEditClick()}>
                <CustomCircleIcon
                    innerIcon={Edit2}
                    width={iconSize}
                    height={iconSize}
                    strokeWidth={0.8}
                    sizeRatio={0.45}
                    color={colors.black}
                />
            </Gsap>
            <Gsap ref={deleteRef} onClick={() => activitySelected && onDeleteClick()}>
                <XCircle
                    width={iconSize}
                    height={iconSize}
                    strokeWidth={0.8}
                    color={colors.red}
                />
            </Gsap>
        </ButtonsContainer>
    )
}