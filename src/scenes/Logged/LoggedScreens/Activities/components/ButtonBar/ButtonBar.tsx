import { useEffect, useRef } from "react";
import { Settings, Edit, Plus, XCircle } from "react-feather";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { CustomCircleIcon } from "src/components";
import { colors } from "src/colors";
import { texts } from "./ButtonBar.lang";
import {
  fadeIn,
  fadeOut,
  move,
  reactToClick,
  resize,
} from "src/functions/animation";
import {
  AddButton,
  AddIcon,
  AddText,
  ButtonsContainer,
  Gsap,
} from "./ButtonBar.style";

interface props {
  activitySelected: boolean;
  onAddClick: () => void;
  onNotesClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const ANIMATION_DURATION = 1;

export default function ButtonBar({
  activitySelected,
  onAddClick,
  onNotesClick,
  onEditClick,
  onDeleteClick,
}: props) {
  const { language, innerHeight } = useGlobalContext();
  const iconSize = innerHeight > 750 ? 50 : 43;
  const iconSpacing = innerHeight > 750 ? 70 : 60;
  const addButtonResize = innerHeight > 750 ? [150, 120] : [130, 100];
  const barTexts = texts.get(language);

  const addRef = useRef(null);
  const addIconRef = useRef(null);
  const acceptRef = useRef(null);
  const editRef = useRef(null);
  const deleteRef = useRef(null);

  useEffect(() => {
    fadeOut([editRef.current, acceptRef.current, deleteRef.current]);
  }, []);

  useEffect(() => {
    if (!activitySelected) {
      resize(addRef.current, { width: addButtonResize[0] }, ANIMATION_DURATION);
      fadeOut([editRef.current, acceptRef.current, deleteRef.current], 0.5);
      move(
        [editRef.current, acceptRef.current, deleteRef.current],
        { x: 0 },
        {duration: 1}
      );
    } else {
      resize(addRef.current, { width: addButtonResize[1] }, ANIMATION_DURATION);
      fadeIn([editRef.current, acceptRef.current, deleteRef.current], 0.5);
      move(deleteRef.current, { x: 2 * iconSpacing }, {duration: ANIMATION_DURATION});
      move(acceptRef.current, { x: iconSpacing }, {duration: ANIMATION_DURATION});
    }
  }, [activitySelected]);

  return (
    <ButtonsContainer>
      <AddButton
        ref={addRef}
        onClick={() => reactToClick(addIconRef.current, onAddClick)}>
        <AddText>{barTexts.new}</AddText>
        <AddIcon
          ref={addIconRef}
          style={{ width: 0.6 * iconSize, height: 0.6 * iconSize }}>
          <Plus
            width={0.6 * iconSize}
            height={0.6 * iconSize}
            strokeWidth={1.4}
            color={colors.white}
          />
        </AddIcon>
      </AddButton>
      <Gsap
        ref={acceptRef}
        onClick={() =>
          activitySelected && reactToClick(acceptRef.current, onNotesClick)
        }>
        <CustomCircleIcon
          innerIcon={Edit}
          width={iconSize}
          height={iconSize}
          strokeWidth={0.6}
          color={colors.black}
        />
      </Gsap>
      <Gsap
        ref={editRef}
        onClick={() =>
          activitySelected && reactToClick(editRef.current, onEditClick)
        }>
        <CustomCircleIcon
          innerIcon={Settings}
          width={iconSize}
          height={iconSize}
          strokeWidth={0.6}
          sizeRatio={0.45}
          color={colors.black}
        />
      </Gsap>
      <Gsap
        ref={deleteRef}
        onClick={() =>
          activitySelected && reactToClick(deleteRef.current, onDeleteClick)
        }>
        <XCircle
          width={iconSize}
          height={iconSize}
          strokeWidth={0.6}
          color={colors.red}
        />
      </Gsap>
    </ButtonsContainer>
  );
}
