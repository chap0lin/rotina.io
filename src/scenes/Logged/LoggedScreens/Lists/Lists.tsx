import { useEffect, useRef, useState } from "react";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { listElementId } from "src/constants";
import { listType } from "src/types";
import { texts } from "./Lists.lang";
import { spawn, vanish } from "src/functions/animation";
import { ListsContent, Footer, EditPopup } from "./components";
import { Carousel, ItemInput, CarouselEdge } from "./Lists.style";
import CopyPopup from "./components/CopyPopup";

export const areEqual = (list1: listType, list2: listType) => {
    if(!list1 && !list2) return true;
    if(!list1 || !list2) return false;
    if(list1.name != list2.name) return false;
    if(list1.color != list2.color) return false;
    return true;
}

interface props {}

export default function Lists({}: props){
    const { keyPressed, language, innerWidth, showPopup, hidePopup } = useGlobalContext();
    const { lists, updateList } = useLoggedContext();
    const listsTexts = texts.get(language);

    const [currentIndex, setCurrentIndex] = useState<number>(() => -1);
    const [currentList, setCurrentList] = useState<listType>(() => null);
    const [finishedEditing, setFinishedEditing] = useState<boolean>(() => false);
    const [showingListMenu, setShowingListMenu] = useState<boolean>(() => false);

    const originalList = useRef<listType>(null);
    const newList = useRef<listType>(null);
    const isEditing = useRef<boolean>(false);
    const inputRef = useRef(null);
    const carouselRef = useRef(null);

    const confirm = (action: string) => {
        hidePopup();
        setTimeout(() => showPopup({
            text: action,
            type: "warning-success"
        },{
            timeout: 4000
        }), 200);
    }

    const createNewList = (created: listType) => {
        originalList.current = null;
        newList.current = {...created};
        confirm(listsTexts.listCreated)
    }

    const clearCurrentList = () => {
        setCurrentList((prev) => ({...prev, items: []}));
        confirm(listsTexts.listCleared);
    }

    const deleteCurrentList = () => {
        setCurrentList(null);
        confirm(listsTexts.listDeleted);
    }

    const showListSettings = (list: listType | null) => {
        isEditing.current = true;
        newList.current = null;
        originalList.current = list;
        setFinishedEditing(false);
        showPopup({type: "prompt", text: (
            <EditPopup
                editing={originalList.current}
                onUpdate={setCurrentList}
                onClear={clearCurrentList}
                onDelete={deleteCurrentList}
                onCreate={createNewList}
            />
        )},{
            blur: true,
            onHide: () => setFinishedEditing(true),
        });
    }

    const showCopyOptions = () => {
        showPopup({type: "prompt", text: (
            <CopyPopup list={currentList}/>
        )},{
            blur: true,
        });
    }

    const scrollIntoView = (index: number) => {
        const element = document.getElementById(`${listElementId}${index}`);
        element && element.scrollIntoView({behavior: "smooth"});
    }


    const onListClick = (index: number) => {
        if(index != currentIndex) return scrollIntoView(index);
        showListSettings({...lists[currentIndex]});        
    }


    const onCarouselScroll = () => {
        setCurrentIndex(Math.floor(
            (1.05 * carouselRef.current.scrollLeft) / innerWidth
        ));
    };


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
        lists &&
        lists.length &&
        keyPressed === "Enter" &&
        addItem();
    }, [keyPressed]);


    useEffect(() => {
        (lists && lists.length)
        ? spawn(inputRef.current)
        : vanish(inputRef.current);
    }, [lists]);


    useEffect(() => {
        !isEditing.current && lists && setCurrentList({...lists.at(currentIndex)});
    }, [lists, currentIndex]);


    useEffect(() => {
        isEditing.current && originalList.current && currentList &&
        updateList(currentIndex, currentList);
    }, [currentList]);


    useEffect(() => {
        if(
            (finishedEditing) &&
            (originalList.current || newList.current) &&
            (!areEqual(originalList.current, currentList))
        ){
            let index = newList.current? -1 : currentIndex;
            let list = newList.current?? currentList;
            index = updateList(index, list, true);
            setCurrentIndex(index);
            setTimeout(() => scrollIntoView(index), 100);
            isEditing.current = false;
        }
    }, [finishedEditing]);


    return (
        <>
            <Carousel
                ref={carouselRef}
                onScroll={onCarouselScroll}
                style={{opacity: showingListMenu? 0.2 : 1}}
            >
                <CarouselEdge />
                <ListsContent
                    lists={lists}
                    onEdit={() => showListSettings({...lists[currentIndex]})}
                    onMark={toggleMark}
                    onRemove={removeItem}
                />
                <CarouselEdge />
            </Carousel>
            <ItemInput
                style={{opacity: showingListMenu? 0.2 : 1}}
                placeholder={listsTexts.placeholder}
                ref={inputRef}
            />
            <Footer
                lists={lists}
                selectedIndex={currentIndex}
                showingMenu={showingListMenu}
                onListMenuToggle={setShowingListMenu}
                onListSelect={onListClick}
                onListCopy={showCopyOptions}
                onNewList={() => showListSettings(null)}
            />
        </>
    )
}