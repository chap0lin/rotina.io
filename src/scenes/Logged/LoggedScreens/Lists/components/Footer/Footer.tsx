import { useRef, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Container, Text, Left, Right, Icon, Lists, ListName, NewListSection } from "./Footer.style";
import { RotatingButton} from "../index";
import { Plus, Share2 } from "react-feather";
import { colors } from "src/colors";
import { listType } from "src/types";
import { Button } from "src/components";
import { texts } from "./Footer.lang";
import { moveAndVanish, reactToClick, spawnAndMove } from "src/functions/animation";

const maxLists = import.meta.env.VITE_MAX_LISTS;

const iconProps = {
    fill: colors.white,
    strokeWidth: 1,
    color: colors.white,
    width: "40%",
    height: "40%",
}

interface props {
    lists: listType[],
    selectedIndex: number,
    showingMenu: boolean,
    onListMenuToggle: (state: boolean) => void;
    onListSelect: (index: number) => void;
    onListCopy: () => void;
    onNewList: () => void;
}

export default function Footer({lists, selectedIndex, showingMenu, onListMenuToggle, onListCopy, onListSelect, onNewList}: props){
    const {language} = useGlobalContext();
    

    const editButtonRef = useRef(null);
    const listsButtonRef = useRef(null);
    const listsRef = useRef(null);
    const iconRef = useRef(null);

    const hasLists = (lists && lists.length);
    const canCreateNewLists = (lists && lists.length < maxLists);
    const footerTexts = texts.get(language);

    const showLists = () => {
        onListMenuToggle(true);
        spawnAndMove(listsRef.current, {x: -300}, 0.5);
        setTimeout(() => window.addEventListener("click", onOutsideClick), 100);
    }

    const hideLists = () => {
        onListMenuToggle(false);
        moveAndVanish(listsRef.current, {x: 0}, 0.5);
        window.removeEventListener("click", onOutsideClick);
    }

    const createNewList = () => {
        hideLists();
        onNewList();
    }

    const copyList = () => {
        onListCopy();
    }

    const onOutsideClick = (event) => {
        if (!listsRef.current.contains(event.target)){
            hideLists();
        }
    }

    if(hasLists) return (
        <Container>
            <Left ref={editButtonRef} style={{opacity: showingMenu? 0.2 : 1}}>
                <RotatingButton
                    background={lists[selectedIndex]? lists[selectedIndex].color : colors.black}
                    onClick={copyList}
                >
                    <Share2 {...iconProps}/>
                </RotatingButton>
            </Left>
            <Right ref={listsButtonRef}>
                <RotatingButton
                    rotateDirection={(showingMenu)? "left" : "right"}
                    rotateOnCondition={showingMenu}
                    border={`1px solid ${colors.black}`}
                    background={colors.white}
                    onClick={showingMenu? hideLists : showLists}
                >
                    {`${selectedIndex + 1}/${lists.length}`}
                </RotatingButton>
            </Right> 
            <Text style={{opacity: showingMenu? 0.2 : 1}}>
                {`${lists[selectedIndex].items && lists[selectedIndex].items.length} ${footerTexts.items}`}
            </Text>
            <Lists ref={listsRef}>                  
                {lists.map((list, index) => (
                    <ListName
                        key={index}
                        style={{background: list.color}}
                        onClick={() => {
                            if(index === selectedIndex) hideLists();
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
                        padding={"2px 0"}
                        width={"auto"}
                        height={"auto"}
                        onClick={() => reactToClick(iconRef.current, createNewList, 1)}
                    >
                       <Icon ref={iconRef}>
                            <Plus
                                width={"100%"}
                                height={"100%"}
                                strokeWidth={3}
                                color={colors.white}
                            />
                        </Icon>
                    </Button>
                </NewListSection>
            </Lists>
        </Container>
    )

    return (
        <Container>
            <Right ref={listsButtonRef}>
                <RotatingButton
                    rotateDirection={"left"}
                    background={colors.black}
                    onClick={createNewList}
                >
                    <Plus
                        width={"55%"}
                        height={"55%"}
                        color={colors.white}
                    />
                </RotatingButton>
            </Right>
        </Container>
    )
}