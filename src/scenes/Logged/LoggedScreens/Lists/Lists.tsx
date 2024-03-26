import { useEffect, useRef, useState } from "react";
import { listViewerElementId } from "src/constants";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { List, Footer, EditPopup } from "./components";
import { Background } from "src/components";
import { listType } from "src/types";
import { texts } from "./Lists.lang";
import { Title, Carousel, ItemInput, ListSection, CarouselEdge, ListContainer, TitleSection } from "./Lists.style";

interface props {}

export default function Lists({}: props){
    const { keyPressed, language, innerHeight, innerWidth, showPopup } = useGlobalContext();
    const { lists, updateList } = useLoggedContext();
    const listsTexts = texts.get(language);

    const [currentList, setCurrentList] = useState<number>(() => 0);
    const [editingList, setEditingList] = useState<listType>(() => null);
    const [blurred, setBlurred] = useState<boolean>(() => false);

    const inputRef = useRef(null);
    const carouselRef = useRef(null);

    const scrollIntoView = (index: number) => {
        document.getElementById(`${listViewerElementId}${index}`).scrollIntoView({behavior: "smooth"});
    }

    const onCarouselScroll = () => {
        setCurrentList(Math.floor(
            (1.05 * carouselRef.current.scrollLeft) / innerWidth
        ));
    };

    const editCurrentList = () => {
        showPopup(
            <EditPopup
                originalList={lists[currentList]}
                onUpdate={setEditingList}
            />, 
            {
                type: "prompt",
                onBlur: () => setBlurred(true),
            }
        );
    }

    const addItem = () => {
        const content = inputRef.current.value.trim();
        if (content.length === 0) return;
        const updated: listType = {
            ...lists[currentList],
            items: [
                {content, marked: false},
                ...lists[currentList].items
            ] 
        };
        updateList(currentList, updated, true);
        inputRef.current.value = "";
    };

    const removeItem = (index: number) => {
        const updated = {...lists[currentList]};
        updated.items.splice(index, 1);
        updateList(currentList, updated, true);
    };

    const toggleMark = (index: number) => {
        const updated = {...lists[currentList]};
        console.log();
        updated.items[index] = {...updated.items[index], marked: !updated.items[index].marked };
        updateList(currentList, updated, true);
    }

    useEffect(() => {
        if(blurred){
            console.log("list after editing:", editingList);
            updateList(currentList, editingList, true);
            setEditingList(null);
            setBlurred(false);
        }
    }, [blurred]);

    useEffect(() => {
        (keyPressed === "Enter") && addItem();
    }, [keyPressed, editingList]);


    return (
        <Background>
            <Carousel ref={carouselRef} onScroll={onCarouselScroll}>
                <CarouselEdge />
                {lists.map((list, index) => (
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
                <CarouselEdge />
            </Carousel>
            <ItemInput
                placeholder={listsTexts.placeholder}
                ref={inputRef}
            />
            <Footer
                lists={lists}
                selectedIndex={currentList}
                onListSelect={scrollIntoView}
                onListCopy={() => null}
                onNewList={() => null}
            />
        </Background>
    )
}