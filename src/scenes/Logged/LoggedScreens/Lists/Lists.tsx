import { useEffect, useRef, useState } from "react";
import { listViewerElementId } from "src/constants";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { AddList, NoList, List, Footer, EditPopup } from "./components";
import { listType } from "src/types";
import { texts } from "./Lists.lang";
import { Title, Carousel, ItemInput, ListSection, CarouselEdge, ListContainer, TitleSection } from "./Lists.style";

const maxLists = import.meta.env.VITE_MAX_LISTS;

interface props {}

export default function Lists({}: props){
    const { keyPressed, language, innerWidth, showPopup, hidePopup } = useGlobalContext();
    const { lists, updateList } = useLoggedContext();
    const listsTexts = texts.get(language);

    const [currentIndex, setCurrentIndex] = useState<number>(() => (lists.length - 1));
    const [currentList, setCurrentList] = useState<listType>(() => null);
    const [finishedEditing, setFinishedEditing] = useState<boolean>(() => false);

    const isEditing = useRef<boolean>(false);
    const inputRef = useRef(null);
    const carouselRef = useRef(null);

    const scrollIntoView = (index: number) => {
        const element = document.getElementById(`${listViewerElementId}${index}`);
        element && element.scrollIntoView({behavior: "smooth"});
    }

    const onCarouselScroll = () => {
        setCurrentIndex(Math.floor(
            (1.05 * carouselRef.current.scrollLeft) / innerWidth
        ));
    };

    const clearCurrentList = () => {
        setCurrentList((prev) => ({...prev, items: []}));
        hidePopup();
        setTimeout(() => showPopup({
            text: listsTexts.listCleared,
            type: "warning-success"
        },{
            timeout: 4000
        }), 200);
    }

    const deleteCurrentList = () => {
        setCurrentList(null);
        hidePopup();
        setTimeout(() => showPopup({
            text: listsTexts.listDeleted,
            type: "warning-success"
        },{
            timeout: 4000
        }), 200);
    }

    const editCurrentList = () => {
        isEditing.current = true;
        showPopup({type: "prompt", text: (
            <EditPopup
                editing={{...lists[currentIndex]}}
                onUpdate={setCurrentList}
                onClear={clearCurrentList}
                onDelete={deleteCurrentList}
            />
        )},{
            blur: true,
            onHide: () => setFinishedEditing(true),
        });
    }

    const addItem = () => {
        const content = inputRef.current.value.trim();
        if (content.length === 0) return;
        const updated: listType = {
            ...lists[currentIndex],
            items: [
                {content, marked: false},
                ...lists[currentIndex].items
            ]
        };
        updateList(currentIndex, updated, true);
        inputRef.current.value = "";
    }

    const removeItem = (index: number) => {
        const updated = {...lists[currentIndex]};
        updated.items.splice(index, 1);
        updateList(currentIndex, updated, true);
    }

    const toggleMark = (index: number) => {
        const updated = {...lists[currentIndex]};
        updated.items[index] = {...updated.items[index], marked: !updated.items[index].marked };
        updateList(currentIndex, updated, true);
    }

    useEffect(() => {
        (keyPressed === "Enter") && addItem();
    }, [keyPressed]);


    useEffect(() => {
        if(currentIndex < lists.length) setCurrentList({...lists[currentIndex]});
    }, [currentIndex]);

    useEffect(() => {
        isEditing.current && currentList &&
        updateList(currentIndex, currentList);
    }, [currentList]);

    useEffect(() => {
        if(finishedEditing){
            console.log("final:", currentList);
            const newIndex = updateList(currentIndex, currentList, true);
            setCurrentIndex(newIndex);
            scrollIntoView(newIndex);
            setFinishedEditing(false);
            isEditing.current = false;
        }
    }, [finishedEditing]);

    return (
        <>
            <Carousel ref={carouselRef} onScroll={onCarouselScroll}>
                <CarouselEdge />
                {!lists.length && <NoList/>}
                {lists.length && lists.map((list, index) => (
                    <ListContainer
                        key={index}
                        id={`${listViewerElementId}${index}`}
                    >
                        <ListSection>
                            <TitleSection onClick={editCurrentList}>
                                <Title style={{background: list.color}} onClick={editCurrentList}>
                                    {list.name}
                                </Title>
                            </TitleSection>
                            <List
                                source={list.items}
                                onMark={toggleMark}
                                markColor={list.color}
                                onRemove={removeItem}
                            />
                        </ListSection>
                    </ListContainer>
                ))}
                {(lists.length < maxLists) && <AddList/>}
                <CarouselEdge />
            </Carousel>
            <ItemInput
                placeholder={listsTexts.placeholder}
                ref={inputRef}
            />
            <Footer
                lists={lists}
                selectedIndex={currentIndex}
                onListSelect={scrollIntoView}
                onListCopy={() => null}
                onNewList={() => null}
            />
        </>
    )
}