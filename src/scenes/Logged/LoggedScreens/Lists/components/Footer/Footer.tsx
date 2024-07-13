import { useLayoutEffect, useRef, useState } from "react";
import { Container, Text, Left, Right, Icon, Lists, ListName, NewListSection } from "./Footer.style";
import { RotatingButton} from "../index";
import { Copy, Plus } from "react-feather";
import { colors } from "src/colors";
import { listType } from "src/types";
import { Button } from "src/components";
import { moveAndVanish, reactToClick, spawnAndMove } from "src/functions/animation";

const maxLists = import.meta.env.VITE_MAX_LISTS;

const iconProps = {
    color: colors.white,
    width: "40%",
    height: "40%",
}

interface props {
    lists: listType[],
    selectedIndex: number,
    onListSelect: (index: number) => void;
    onListCopy: () => void;
    onNewList: () => void;
}

export default function Footer({lists, selectedIndex, onListCopy, onListSelect, onNewList}: props){
    const [ showingLists, setShowingLists ] = useState<boolean>(() => false);

    const editButtonRef = useRef(null);
    const listsButtonRef = useRef(null);
    const listsRef = useRef(null);
    const iconRef = useRef(null);

    const canCreateNewLists = (lists.length < maxLists);

    const toggleLists = () => {
        setShowingLists((prev) => !prev);
    }

    const copyList = () => {
        showingLists && setShowingLists(false);
        onListCopy();
    }

    const onOutsideClick = (event) => {
        if (!listsRef.current.contains(event.target)){
            setShowingLists(false);
            window.removeEventListener("click", onOutsideClick);
        }
    }

    useLayoutEffect(() => {                                             
        if(showingLists){
            spawnAndMove(listsRef.current, {x: 0}, 0.5);
            setTimeout(() => window.addEventListener("click", onOutsideClick), 100);
        } else {
            moveAndVanish(listsRef.current, {x: 200}, 0.5);
        }
    }, [showingLists]);

    return (
        <Container>
            <Left ref={editButtonRef}>
                <RotatingButton
                    background={lists[selectedIndex]? lists[selectedIndex].color : colors.black}
                    onClick={copyList}
                >
                    <Copy {...iconProps}/>
                </RotatingButton>
            </Left>
            <Right ref={listsButtonRef}>
                <RotatingButton
                    rotateDirection={(showingLists)? "left" : "right"}
                    rotateOnCondition={showingLists}
                    border={`1px solid ${colors.black}`}
                    background={colors.white}
                    onClick={() => toggleLists()}
                >
                    {lists[selectedIndex]? `${selectedIndex + 1}/${lists.length}` : `-/-`}
                </RotatingButton>
            </Right> 
            <Text>
                {lists[selectedIndex] && `${lists[selectedIndex].items.length} items`}
            </Text>
            <Lists ref={listsRef}>                  
                {lists.map((list, index) => (
                    <ListName
                        key={index}
                        style={{background: list.color}}
                        onClick={() => {
                            onListSelect(index);
                        }}
                    >
                        {list.name}
                    </ListName>
                ))}
                <NewListSection>
                    {lists.length}/{maxLists}
                    <Button
                        disabled={!canCreateNewLists}
                        borderRadius={5}
                        padding={0}
                        width={"auto"}
                        height={"auto"}
                        onClick={() => reactToClick(iconRef.current, onNewList, 1)}
                    >
                        <Icon ref={iconRef}>
                            <Plus
                                width={"100%"}
                                height={"100%"}
                                color={colors.white}
                            />
                        </Icon>
                    </Button>
                </NewListSection>
            </Lists>
        </Container>
    )
}