import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { moveAndVanish, spawn, spawnAndMove, vanish } from "src/functions/animation";
import { emptyStorage, getFromStorage, saveOnStorage } from "src/functions/storage";
import { Background, Header, Loading } from "src/components";
import { serverReplyType } from "src/types";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { useLoggedContext } from "src/contexts/LoggedContextProvider";
import { postRequest } from "src/functions/connection";
import { useNavigate } from "react-router-dom";
import { tokenKey } from "src/constants";
import { useTime } from "src/hooks/time";
import { texts } from "./LoggedScreens.lang";
import Dashboard from "./Dashboard";
import Activities from "./Activities";
import Lists from "./Lists";
import ActivitySettings from "./ActivitySettings";
import { BigContainer, Gsap, SmallContainer } from "./LoggedScreens.style";

export default function LoggedScreens(){
    const navigate = useNavigate();
    const { minute } = useTime();
    const { language, user, innerWidth, rollingCode, showPopup, setUser, setRollingCode } = useGlobalContext();
    const {screen, weekActivities, lists, updateServer, selected, setUpdateServer, goBack, updateWeek, setLists } = useLoggedContext();
    const [receivedFirstContent, setReceivedFirstContent] = useState<boolean>(() => false);

    const loadingRef = useRef(null);
    const dashboardRef = useRef(null);
    const listsRef = useRef(null);
    const activitiesRef = useRef(null);
    const newActivityRef = useRef(null);
    const loggedTexts = texts.get(language);

    //COMUNICAÇÃO COM SERVIDOR////////////////////////////////////////////////////////////////////////////////////////

    const request = (link: string, params: any, alternativeToken?: string) => {
        if((!user || !user.token) && !alternativeToken) return onError({ status: "ERROR_NO_TOKENS_FOUND" });
        const token = alternativeToken?? user.token;
        postRequest({link, params, token, onSuccess, onError});
    }

    const onSuccess = (reply: serverReplyType) => {
        reply.rollingCode && setRollingCode(reply.rollingCode);
        if(!reply || !reply.status) return;
        switch(reply.status){
            case "SUCCESS_CODE":
                break;
            case "SUCCESS_TOKEN":
                if(!reply.token) return onError({status: "ERROR_NO_TOKEN_PROVIDED_BY_SERVER"});
                saveOnStorage(tokenKey, reply.token);
                setUser({token: reply.token});
                request("/get-data", {rollingCode, data: "week"}, reply.token);
                request("/get-data", {rollingCode, data: "lists"}, reply.token);
                break;
            default:
                if(reply.token) saveOnStorage(tokenKey, reply.token);
                if(!reply.data || !reply.content) return;
                switch(reply.data){
                    case "week": updateWeek(JSON.parse(reply.content)); break;
                    case "lists": setLists(JSON.parse(reply.content)); break;
                    default:
                    return showPopup({
                        text: loggedTexts.errorFetchingData,
                        type: "warning-failure"
                    },{
                        timeout: 4000,
                    });
                }
                setTimeout(() => setReceivedFirstContent(true), 2000);
                break;
        }
    };


    const onError = (reply: serverReplyType) => {
        let errorMsg = loggedTexts.errorFetchingData;
        switch (reply.status) {
            case "ERROR_INVALID_TOKEN":
                errorMsg = loggedTexts.sessionExpired;
                break;
            case "ERROR":
            case "ERROR_INVALID_DATA":
            case "ERROR_MISSING_CREDENTIALS":
            case "ERROR_NO_REGISTERED_USER":
                errorMsg = loggedTexts.somethingWentWrong;
                break;
        }
        showPopup({
            text: errorMsg,
            type: "warning-failure" 
        },{
            timeout: 4000
        });
        emptyStorage();
        navigate("/login");
    };


    useEffect(() => {
        if(!rollingCode){
          postRequest({link: "/rolling-code", onSuccess, onError});
        } else {
          const token = getFromStorage(tokenKey);
          if(token){
            const link = "/token";
            const params = { rollingCode };
            postRequest({link, token, params, onSuccess, onError});
          } else {
            onError({ status: "ERROR_NO_TOKENS_FOUND" });
          }
        }
    }, [rollingCode]);


    useEffect(() => {
        if(user && user.token && !selected.activity) {
            request("/get-data", {rollingCode, data: "week"});      //TODO criar fluxo unificado de pedidos
            request("/get-data", {rollingCode, data: "lists"});
        }
    }, [minute]);

    useEffect(() => {
        if(updateServer){
            let jsonContent = [];
            switch(updateServer){
                case "week": jsonContent = [...weekActivities]; break;
                case "lists": jsonContent = [...lists]; break;
            }
            const data = updateServer;
            const content = JSON.stringify(jsonContent);
            request("/update-data", {rollingCode, data, content});
            setUpdateServer(null);
        }
    }, [updateServer, user]);

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