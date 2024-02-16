import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { moveAndVanish, spawn, spawnAndMove, vanish } from "src/functions/animation";
import { Background, Header, Loading } from "src/components";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";
import { useNavigate } from "react-router-dom";
import { dataType } from "src/types";
import { texts } from "./LoggedScreens.lang";
import { api } from "src/services/api";
import Dashboard from "./Dashboard";
import Activities from "./Activities";
import Lists from "./Lists";
import ActivitySettings from "./ActivitySettings";
import { BigContainer, Gsap, SmallContainer } from "./LoggedScreens.style";
import { useTime } from "src/hooks/time";

type serverReplyType = {
    status: "SUCCESS" | "SUCCESS_DATA" | "SUCCESS_UPDATE" | "ERROR" | "ERROR_NO_REGISTERED_USER" | "ERROR_MISSING_CREDENTIALS" | "ERROR_INVALID_DATA",
    data: dataType;
    content: string;
};

export default function LoggedScreens(){
    const navigate = useNavigate();
    const { minute } = useTime();
    const { language, user, innerWidth, showPopup } = useGlobalContext();
    const {screen, weekActivities, todoList, shoppingList, updateServer, selected, setUpdateServer, goBack, updateWeek, updateList } = useLoggedContext();

    const [waitingForServer, setWaitingForServer] = useState<boolean>(() => true);
    const [receivedFirstContent, setReceivedFirstContent] = useState<boolean>(() => false);

    const loadingRef = useRef(null);
    const dashboardRef = useRef(null);
    const listsRef = useRef(null);
    const activitiesRef = useRef(null);
    const newActivityRef = useRef(null);
    const loggedTexts = texts.get(language);

    //COMUNICAÇÃO COM SERVIDOR////////////////////////////////////////////////////////////////////////////////////////

    const parseServerReply = (reply: serverReplyType) => {
        if(reply.status === "SUCCESS_UPDATE"){
            return console.log("Data updated successfuly on server side.");
        }
        switch(reply.data){
            case "week": updateWeek(JSON.parse(reply.content)); break;
            case "todo": updateList("todo", JSON.parse(reply.content)); break;
            case "shopping": updateList("shopping", JSON.parse(reply.content)); break;
            default:
                console.log("error parsing data. received:", reply);
                return showPopup(loggedTexts.errorFetchingData, {
                type: "warning-failure",
                timeout: 4000,
            });
        }
        setTimeout(() => setReceivedFirstContent(true), 2000);
    };


    const handleServerReply = (reply: serverReplyType) => {
        switch (reply.status) {
        case "ERROR":
        case "ERROR_INVALID_DATA":
        case "ERROR_MISSING_CREDENTIALS":
        case "ERROR_NO_REGISTERED_USER":
            showPopup(loggedTexts.somethingWentWrong, {
                type: "warning-failure",
                timeout: 4000,
            }); break;
        default:
            parseServerReply(reply);
        }
    };


    const getRequest = (link: string, params: any, catchCall?: () => void) => {
        setWaitingForServer(true);
        api
        .get(link, { params })
        .then((resp) => {
            handleServerReply(resp.data);
            setWaitingForServer(false);
        })
        .catch(() => {
            catchCall && catchCall();
            setWaitingForServer(false);
        });
    };


    useEffect(() => {
        if (!user) navigate("/login");
    }, []);


    useEffect(() => {
        const { name, password } = user;
        if(updateServer){
            let jsonContent = [];
            switch(updateServer){
                case "week": jsonContent = [...weekActivities]; break;
                case "todo": jsonContent = [...todoList]; break;
                case "shopping": jsonContent = [...shoppingList]; break; 
            }
            const data = updateServer;
            const content = JSON.stringify(jsonContent);
            getRequest("/update-data", {data, content, name, password});
            setUpdateServer(null);
        } else if(!selected.activity) {
            getRequest("/get-data", {data: "week", name, password});
            getRequest("/get-data", {data: "shopping", name, password});
            getRequest("/get-data", {data: "todo", name, password});
        }
    }, [updateServer, selected, user, minute]);


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useLayoutEffect(() => {
        spawnAndMove(dashboardRef.current, { x: 0 });
        moveAndVanish([listsRef.current], {x: -1.4 * innerWidth});
        moveAndVanish([activitiesRef.current, newActivityRef.current], {x: 1.4 * innerWidth});
    }, []);


    useLayoutEffect(() => {
        if (!receivedFirstContent) {
            spawn(loadingRef.current, 1);
        } else {
            vanish(loadingRef.current, 1);
        }
    }, [receivedFirstContent]);


    useLayoutEffect(() => {
        switch (screen) {
        case "dashboard":
            moveAndVanish([listsRef.current], { x: -1.4 * innerWidth }, 1);
            spawnAndMove([dashboardRef.current], { x: 0 }, 1);
            moveAndVanish([
                activitiesRef.current, 
                newActivityRef.current
            ], { x: 1.4 * innerWidth }, 1);
            break;
        case "lists":
            spawnAndMove([listsRef.current], { x: 0 }, 1);
            moveAndVanish([
                dashboardRef.current,
                activitiesRef.current,
                newActivityRef.current
            ], { x: 1.4 * innerWidth }, 1);
            break;
        case "activities":
            moveAndVanish([
                dashboardRef.current,
                listsRef.current
            ], { x: -1.4 * innerWidth }, 1);
            spawnAndMove(activitiesRef.current, { x: 0 }, 1);
            moveAndVanish(newActivityRef.current, { x: 1.4 * innerWidth }, 1);
            break;
        case "activity-settings":
            moveAndVanish([
                listsRef.current,
                dashboardRef.current,
                activitiesRef.current
            ], { x: -1.4 * innerWidth }, 1);
            moveAndVanish(activitiesRef.current, { x: -1.4 * innerWidth }, 1);
            spawnAndMove(newActivityRef.current, { x: 0 }, 1);
            break;
        }
    }, [screen]);

    return (
        <Background>
            <Header 
                logo user lang show={receivedFirstContent} 
                arrow={(screen !== "dashboard") ? goBack : null}
            />
            <BigContainer>
                <SmallContainer ref={dashboardRef}>
                    <Dashboard show={receivedFirstContent}/>
                </SmallContainer>
                <SmallContainer ref={listsRef}>
                    <Lists />
                </SmallContainer>
                <SmallContainer ref={activitiesRef}>
                    <Activities />
                </SmallContainer>
                <SmallContainer ref={newActivityRef}>
                    <ActivitySettings />
                </SmallContainer>
            </BigContainer>
            <Gsap ref={loadingRef}>
                <Loading />
            </Gsap>
        </Background>
    )
}