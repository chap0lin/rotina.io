import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { moveAndVanish, spawnAndMove } from "src/functions/animation";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Background } from "src/components";
import { texts } from "./Lists.lang";
import catYarn from "src/assets/images/cat-yarn.png";
import bags from "src/assets/images/bags.png";
import julius from "src/assets/images/julius.png";
import List from "./components/List";
import Slot from "./components/Slot";
import { Title, MainContent, Section, ItemInput, ListSection, PlaceholderImage, PlaceholderContainer, PlaceholderText } from "./Lists.style";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";


interface props {}

export default function Lists({}: props){
    const { keyPressed, language, innerWidth, innerHeight } = useGlobalContext();
    const {todoList, shoppingList, setTodoList, setShoppingList} = useLoggedContext();
    const listsTexts = texts.get(language);

    const [toggled, setToggled] = useState<boolean>(() => false);
    const [juliusMode, setJuliusMode] = useState<boolean>(() => false);

    const shoppingListTitleRef = useRef(null);
    const todoListTitleRef = useRef(null);
    const shoppingListRef = useRef(null);
    const todoListRef = useRef(null);
    const inputRef = useRef(null);
    const outOfScreenX = (innerWidth * 1.1);

    const addItem = () => {
        const content = inputRef.current.value.trim();
        if (content.length === 0) return;
        const setList = (toggled)? setTodoList: setShoppingList;
        setList((previous) => [{content, marked: false}, ...previous]);
        inputRef.current.value = "";
    };

    const removeItem = (i: number) => {
        const setList = (toggled)? setTodoList: setShoppingList;
        setList((previous) => {
            const updated = [...previous];
            updated.splice(i, 1);
            return updated;
        });
    };

    const toggleMark = (i: number) => {
        const setList = (toggled)? setTodoList: setShoppingList;
        setList((previous) => {
            const updated = [...previous];
            updated[i] = {
                ...updated[i],
                marked: !updated[i].marked 
            };
            return updated;
        });
    }

    const toggleJulius = () => {
        setJuliusMode(prev => !prev);
    }


    const shoppingPlaceholder = (
        <PlaceholderContainer>
            <PlaceholderImage src={juliusMode? julius : bags} onClick={toggleJulius}/>
            <PlaceholderText>
                {juliusMode? listsTexts.juliusPhrase : listsTexts.nothingToShop}
            </PlaceholderText>
        </PlaceholderContainer>
    )

    const todoPlaceholder = (
        <PlaceholderContainer>
            <PlaceholderImage src={catYarn}/>
            <PlaceholderText>
                {listsTexts.nothingToDo}
            </PlaceholderText>
        </PlaceholderContainer>
    )


    useEffect(() => {
        (keyPressed === "Enter") && addItem();
    }, [keyPressed]);


    useLayoutEffect(() => {
        spawnAndMove(shoppingListTitleRef.current, {x: 0});
        spawnAndMove(shoppingListRef.current, {x: 0});
        moveAndVanish(todoListTitleRef.current, {x: outOfScreenX});
        moveAndVanish(todoListRef.current, {x: outOfScreenX});
    }, []);

    
    useLayoutEffect(() => {
        if(toggled){
            moveAndVanish(shoppingListTitleRef.current, {x: -outOfScreenX}, 1);
            moveAndVanish(shoppingListRef.current, {x: -outOfScreenX}, 1);
            spawnAndMove(todoListTitleRef.current, {x: 0}, 1);
            spawnAndMove(todoListRef.current, {x: 0}, 1);
        } else {
            spawnAndMove(shoppingListTitleRef.current, {x: 0}, 1);
            spawnAndMove(shoppingListRef.current, {x: 0}, 1);
            moveAndVanish(todoListTitleRef.current, {x: outOfScreenX}, 1);
            moveAndVanish(todoListRef.current, {x: outOfScreenX}, 1);
        }
    }, [toggled, innerWidth]);


    return (
        <Background >
            <MainContent>
                <Section>
                    <Section>
                        <Title ref={shoppingListTitleRef}>
                            {listsTexts.shoppingListTitle}
                        </Title>
                        <Title ref={todoListTitleRef}>
                            {listsTexts.todoListTitle}
                        </Title>
                    </Section>
                    <ItemInput placeholder={listsTexts.placeholder} ref={inputRef}/>
                    <ListSection style={{height:(0.57 * innerHeight)}} ref={shoppingListRef}>
                        <List
                            placeholder={shoppingPlaceholder}
                            source={shoppingList}
                            onMark={toggleMark}
                            onRemove={removeItem}
                        />
                    </ListSection>
                    <ListSection style={{height:(0.57 * innerHeight)}} ref={todoListRef}>
                        <List
                            placeholder={todoPlaceholder}
                            source={todoList}
                            onMark={toggleMark}
                            onRemove={removeItem}
                        />
                    </ListSection>
                </Section>
                <Section>
                    <Slot
                        isToggled={toggled}
                        option1={listsTexts.shopping}
                        option2={listsTexts.todo}
                        onToggle={() => setToggled(prev => !prev)}
                    />
                </Section>
            </MainContent>
        </Background>
    )
}