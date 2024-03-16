import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Background } from "src/components";
import { texts } from "./Lists.lang";
import catYarn from "src/assets/images/cat-yarn.png";
import List from "./components/List";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";
import { listType } from "src/types";
import { Title, Carousel, ItemInput, ListSection, PlaceholderImage, PlaceholderContainer, PlaceholderText, CarouselEdge, ListContainer } from "./Lists.style";
import { colors } from "src/colors";


interface props {}

export default function Lists({}: props){
    const { keyPressed, language, innerHeight } = useGlobalContext();
    const {lists, updateList} = useLoggedContext();
    const listsTexts = texts.get(language);

    const [currentList, setCurrentList] = useState<listType>(() => ({name: "", items: []}));

    const inputRef = useRef(null);

    const addItem = () => {
        const content = inputRef.current.value.trim();
        if (content.length === 0) return;
        const updated = [{content, marked: false}, ...currentList.items];
        updateList(currentList.name, updated, true);
        inputRef.current.value = "";
    };

    const removeItem = (i: number) => {
        const updated = [...currentList.items];
        updated.splice(i, 1);
        updateList(currentList.name, updated, true);
    };

    const toggleMark = (i: number) => {
        const updated = [...currentList.items];
        updated[i] = {...updated[i], marked: !updated[i].marked };
        updateList(currentList.name, updated, true);    
    }

    const placeholder = (
        <PlaceholderContainer>
            <PlaceholderImage src={catYarn}/>
            <PlaceholderText>
                {listsTexts.nothingHere}
            </PlaceholderText>
        </PlaceholderContainer>
    )


    useEffect(() => {
        (keyPressed === "Enter") && addItem();
    }, [keyPressed]);


    return (
        <Background>
            <Carousel>
                <CarouselEdge />
                {lists.map((list, index) => (
                    <ListContainer key={index}>
                        <CarouselEdge />
                        <ListSection style={{height:(0.7 * innerHeight)}}>
                            <Title style={{background: colors.clickBlue}}>
                                {list.name}
                            </Title>
                            <List
                                top={180}
                                placeholder={placeholder}
                                source={list.items}
                                onMark={toggleMark}
                                onRemove={removeItem}
                            />
                        </ListSection>
                    </ListContainer>
                ))}
                <CarouselEdge />
            </Carousel>
            <ItemInput placeholder={listsTexts.placeholder} ref={inputRef}/>
        </Background>
    )
}