import { useEffect, useRef } from "react";
import { colors } from "src/colors";
import { texts } from "./ButtonBar.lang";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Check, Edit2, Plus, XCircle } from "react-feather";
import { fadeIn, fadeOut, move, reactToClick, resize } from "src/functions/animation";
import CustomCircleIcon from "../../../../../components/CustomCircleIcon";
import { AddButton, AddIcon, AddText, ButtonsContainer, Gsap } from "./ButtonBar.style";

interface props {
    activitySelected: boolean;
    onAddClick: () => void;
    onAcceptClick: () => void;
    onEditClick: () => void;
    onDeleteClick: () => void;
}

const ANIMATION_DELAY = 1;

export default function ButtonBar({activitySelected, onAddClick, onAcceptClick, onEditClick, onDeleteClick}: props){
    const { language, innerHeight } = useGlobalContext();
    const iconSize = (innerHeight > 750) ? 50 : 43;
    const iconSpacing = (innerHeight > 750)? 70 : 60;
    const addButtonResize = (innerHeight > 750)? [150, 120] : [130, 100];
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
            resize(addRef.current, {width: addButtonResize[0]}, ANIMATION_DELAY);
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
            resize(addRef.current, {width: addButtonResize[1]}, ANIMATION_DELAY);
            fadeIn([
                editRef.current,
                acceptRef.current,
                deleteRef.current,
            ], 0.5);
            move(deleteRef.current, {x: iconSpacing}, ANIMATION_DELAY);
            move(editRef.current, {x: 2 * iconSpacing}, ANIMATION_DELAY); 
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
                        strokeWidth={1.4}
                        color={colors.white}
                    />
                </AddIcon>
            </AddButton>
            <Gsap ref={acceptRef} onClick={() => activitySelected && reactToClick(acceptRef.current, onAcceptClick, 0.5)}>
                <CustomCircleIcon
                    innerIcon={Check}
                    width={iconSize}
                    height={iconSize}
                    strokeWidth={0.8}
                    color={colors.green}
                />
            </Gsap>
            <Gsap ref={editRef} onClick={() => activitySelected && reactToClick(editRef.current, onEditClick, 0.5)}>
                <CustomCircleIcon
                    innerIcon={Edit2}
                    width={iconSize}
                    height={iconSize}
                    strokeWidth={0.8}
                    sizeRatio={0.45}
                    color={colors.black}
                />
            </Gsap>
            <Gsap ref={deleteRef} onClick={() => activitySelected && reactToClick(deleteRef.current, onDeleteClick, 0.5)}>
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