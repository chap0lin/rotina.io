import { ArrowLeftCircle, ArrowRightCircle, Check, Edit2, PlusCircle, XCircle } from "react-feather";
import { colors } from "src/colors";
import { useEffect, useRef } from "react";
import { moveAndVanish, spawn, spawnAndMove, vanish } from "src/functions/animation";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import CustomCircleIcon from "./components/CheckCircle2";
import { ButtonsContainer, Gsap } from "./ButtonBar.style";

interface props {
    activitySelected: boolean;
    onLeftArrowClick: () => void;
    onAddClick: () => void;
    onAcceptClick: () => void;
    onDeleteClick: () => void;
    onEditClick: () => void;
    onRightArrowClick?: () => void;
}

export default function ButtonBar({activitySelected, onLeftArrowClick, onRightArrowClick, onAcceptClick, onAddClick, onEditClick, onDeleteClick}: props){
    const { innerHeight } = useGlobalContext();
    const iconSize = (innerHeight > 750) ? 50 : 40; 

    const leftArrowRef = useRef(null);
    const acceptRef = useRef(null);
    const addRef = useRef(null);
    const editRef = useRef(null);
    const deleteRef = useRef(null);
    const rightArrowRef = useRef(null);

    useEffect(() => {
        vanish([
            leftArrowRef.current,
            acceptRef.current,
            addRef.current,
            editRef.current,
            deleteRef.current,
            rightArrowRef.current
        ]);
    }, []);

    useEffect(() => {
        if(!activitySelected){
            vanish(editRef.current, 0.5);
            moveAndVanish([
                acceptRef.current,
                deleteRef.current,
            ], {x: 0}, 1);
            spawn([addRef.current], 1, 0, "flex");
            spawnAndMove(leftArrowRef.current, {x: -120}, 1, "flex");
            spawnAndMove(rightArrowRef.current, {x: 120}, 1, "flex");
        } else {
            vanish(addRef.current, 0.15);
            moveAndVanish(leftArrowRef.current, {x: -240}, 1);
            moveAndVanish(rightArrowRef.current, {x: 240}, 1);
            spawn([editRef.current], 1, 0, "flex");
            spawnAndMove(acceptRef.current, {x: -75}, 1, "flex");
            spawnAndMove(deleteRef.current, {x: 75}, 1, "flex"); 
        }
    }, [activitySelected]);

    return (
        <ButtonsContainer>
            <Gsap ref={leftArrowRef} onClick={() => (!activitySelected && onLeftArrowClick())}>
                <ArrowLeftCircle
                    width={iconSize}
                    height={iconSize}
                    strokeWidth={0.5}
                    color={colors.black}
                />
            </Gsap>
            <Gsap ref={acceptRef} onClick={() => (activitySelected && onAcceptClick())}>
                <CustomCircleIcon
                    innerIcon={Check}
                    width={iconSize}
                    height={iconSize}
                    strokeWidth={0.5}
                    color={colors.green}
                />
            </Gsap>
            <Gsap ref={addRef} onClick={() => (!activitySelected && onAddClick())}>
                <PlusCircle
                    width={iconSize}
                    height={iconSize}
                    strokeWidth={0.5}
                    color={colors.black}
                />
            </Gsap>
            <Gsap ref={editRef} onClick={() => (activitySelected && onEditClick())}>
                <CustomCircleIcon
                    innerIcon={Edit2}
                    width={iconSize}
                    height={iconSize}
                    strokeWidth={0.5}
                    sizeRatio={0.45}
                    color={colors.black}
                />
            </Gsap>
            <Gsap ref={deleteRef} onClick={() => (activitySelected && onDeleteClick())}>
                <XCircle
                    width={iconSize}
                    height={iconSize}
                    strokeWidth={0.5}
                    color={colors.red}
                />
            </Gsap>
            <Gsap ref={rightArrowRef} onClick={() => (!activitySelected && onRightArrowClick())}>
                <ArrowRightCircle
                    width={iconSize}
                    height={iconSize}
                    strokeWidth={0.5}
                    color={colors.black}
                />
            </Gsap>
        </ButtonsContainer>
    )
}