import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { moveAndVanish, spawn, spawnAndMove, vanish } from "src/functions/animation";
import { Background, Header, Loading } from "src/components";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";
import { useNavigate } from "react-router-dom";
import { texts } from "./LoggedScreens.lang";
import { api } from "src/services/api";
import Dashboard from "./Dashboard";
import Activities from "./Activities";
import Lists from "./Lists";
import ActivitySettings from "./ActivitySettings";
import { BigContainer, Gsap, SmallContainer } from "./LoggedScreens.style";

type serverReplyType =
  | "SUCCESS"
  | "SUCCESS_DATA"
  | "ERROR"
  | "ERROR_NO_REGISTERED_USER"
  | "ERROR_MISSING_CREDENTIALS"
;

export default function LoggedScreens(){
    const navigate = useNavigate();
    const { language, user, innerWidth, showPopup } = useGlobalContext();
    const {screen, weekActivities, todoList, shoppingList, goBack, setWeekActivities, setTodoList, setShoppingList } = useLoggedContext();

    const [waitingForServer, setWaitingForServer] = useState<boolean>(() => true);
    const [receivedUserData, setReceivedUserData] = useState<boolean>(() => false);

    const loadingRef = useRef(null);
    const dashboardRef = useRef(null);
    const listsRef = useRef(null);
    const activitiesRef = useRef(null);
    const newActivityRef = useRef(null);
    const loggedTexts = texts.get(language);

    //COMUNICAÇÃO COM SERVIDOR////////////////////////////////////////////////////////////////////////////////////////

    const getRequest = (link: string, params: any, catchCall?: () => void) => {
        setWaitingForServer(true);
        api
        .get(link, { params })
        .then((resp) => {
            handleServerReply(resp.data.msg);
            setWaitingForServer(false);
        })
        .catch(() => {
            catchCall && catchCall();
            setWaitingForServer(false);
        });
    };

    const getDataFromServerReply = (reply: serverReplyType) => {
        const stringifiedData = reply.split("==");
        if (!stringifiedData || stringifiedData.length < 4) {
            return showPopup(loggedTexts.errorFetchingData, {
                type: "warning-failure",
                timeout: 4000,
            });
        }
        setWeekActivities(JSON.parse(stringifiedData.at(1)));
        setTodoList(JSON.parse(stringifiedData.at(2)));
        setShoppingList(JSON.parse(stringifiedData.at(3)));
        setTimeout(() => setReceivedUserData(true), 2000);
    };

    const handleServerReply = (reply: serverReplyType) => {
        switch (reply) {
        case "ERROR":
        case "ERROR_MISSING_CREDENTIALS":
        case "ERROR_NO_REGISTERED_USER":
            showPopup(loggedTexts.somethingWentWrong, {
                type: "warning-failure",
                timeout: 4000,
            }); break;
        default:
            if (reply.includes("SUCCESS_DATA")) {
                getDataFromServerReply(reply);
            } break;
        }
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (!user) {
        navigate("/login");
        } else {
        getRequest("/get-user-data", { ...user });
        }
    }, []);


    useLayoutEffect(() => {
        spawnAndMove(dashboardRef.current, { x: 0 });
        moveAndVanish([listsRef.current], {x: -1.4 * innerWidth});
        moveAndVanish([activitiesRef.current, newActivityRef.current], {x: 1.4 * innerWidth});
    }, []);


    useLayoutEffect(() => {
        if (!receivedUserData) {
            spawn(loadingRef.current, 1);
        } else {
            vanish(loadingRef.current, 1);
        }
    }, [receivedUserData]);


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
                logo user lang show={receivedUserData} 
                arrow={(screen === "lists" || screen ===  "activities") ? goBack : null}
            />
            <BigContainer>
                <SmallContainer ref={dashboardRef}>
                    <Dashboard show={receivedUserData}/>
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