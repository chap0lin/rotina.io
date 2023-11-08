import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ActivityType, languageOption } from "src/types";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { useNavigate } from "react-router-dom";
import { spawn, vanish } from "src/functions/animation";
import { api } from "src/services/api";
import { texts } from "./Logged.lang";
import { useTime } from "src/hooks/time";
import { isAfter, isBefore } from "src/functions/time";
import { Background, Header, Loading } from "src/components";
import { HappeningNow, HappeningLater, RoundButton } from "./components/index";
import { BigBold, SubTitle, BigTitle, MainContent, TopTexts, Section, SectionTitle, Gsap } from "./Logged.style";


type serverReplyType = 
    "SUCCESS" |
    "SUCCESS_ACTIVITIES" |
    "ERROR" |
    "ERROR_NO_REGISTERED_USER" |
    "ERROR_MISSING_CREDENTIALS"
;


export default function LoggedIn(){
    const navigate = useNavigate();
    const { language, innerHeight, user, setUser, showPopup } = useGlobalContext();
    const [ hour, minute ] = useTime();
    const [ activities, setActivities ] = useState<ActivityType[]>([]);
    const [ happeningNow, setHappeningNow ] = useState<ActivityType | undefined>();
    const [waitingForServer, setWaitingForServer] = useState<boolean>(() => false);

    const date = new Date();
    const dayIndex = date.getDay();
    const mainContentRef = useRef(null);
    const loadingRef = useRef(null);
    const loggedTexts = texts.get(language);


    const getRequest = (link: string, params: any, catchCall?: () => void) => {
        setWaitingForServer(true);
        api.get(link, {params}).then((resp) => {
            handleServerReply(resp.data.msg);
            setWaitingForServer(false);
        }).catch(() => {
            catchCall && catchCall();
            setWaitingForServer(false);
        });
    }


    const getActivitiesFromServerReply = (reply: serverReplyType) => {
        const stringifiedActivities = reply.split("==").at(1);
        if(!stringifiedActivities){
            showPopup(loggedTexts.errorFetchingActivities);
            return;
        }
        setActivities(JSON.parse(stringifiedActivities));
    }


    const handleServerReply = (reply: serverReplyType) => {
        switch(reply){
            case "ERROR":
            case "ERROR_MISSING_CREDENTIALS":
            case "ERROR_NO_REGISTERED_USER":
                showPopup(loggedTexts.somethingWentWrong);
            break;
            default:
                if(reply.includes("SUCCESS_ACTIVITIES")){
                    getActivitiesFromServerReply(reply);
                }
            break;
        }
    }


    useEffect(() => {
        if(!user){
            navigate("/login");
        } else {
            getRequest("/get-activities", {...user});   
        }
    }, []);


    useLayoutEffect(() => {
        if(waitingForServer === true){
            vanish([mainContentRef.current, loadingRef.current]);
            spawn(loadingRef.current, 1);
        } else {
            vanish(loadingRef.current, 1);
            spawn(mainContentRef.current, 1);
        }
    }, [waitingForServer]);


    useEffect(() => {
        setHappeningNow(activities.filter((act) => {
            return (
                isBefore(act.startsAt, {hour, minute}) &&
                isAfter(act.endsAt, {hour, minute})
            )
        }).at(0));
    }, [activities, hour, minute]);


    return (
        <Background>
            <Header logo user/>
            <MainContent ref={mainContentRef}>
                <TopTexts>
                    <BigTitle>
                        {loggedTexts.todayIs}
                        &nbsp;
                        <BigBold>
                            {loggedTexts.days[dayIndex]}
                        </BigBold>
                    </BigTitle>
                    <SubTitle>
                        {loggedTexts.placeholders[dayIndex]}
                    </SubTitle>
                </TopTexts>
                <Section style={{height: (innerHeight / 3)}}>
                    <SectionTitle>
                        {loggedTexts.happeningNow}
                    </SectionTitle>
                    <HappeningNow
                        happeningNow={happeningNow}
                        onNotesClick={() => null}
                    />
                </Section>
                <Section>
                    <SectionTitle>
                        {loggedTexts.whatsNext}
                    </SectionTitle>
                    <HappeningLater activities={activities}/>
                </Section>
            </MainContent>
            <RoundButton onClick={() => null}/>
            <Gsap ref={loadingRef}>
                <Loading />
            </Gsap>
        </Background>
    )
}