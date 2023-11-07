import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { spawn, vanish } from "src/functions/animation";
import { texts } from "./Activate.lang";
import { api } from "src/services/api";
import { Loading, Header, Background, Button } from "components/index";
import { Bold, Gsap, HintText, Texts, TopContent, WelcomeText } from "./Activate.style";

type serverReply = 
    "SUCCESS_REGISTERED_USER" |
    "SUCCESS_VALID_PURPOSE" |
    "ERROR_INVALID_PURPOSE" |
    "ERROR_DUPLICATE_USER" |
    "ERROR_NO_ACTIVATING_USER"
;

const getQueryString = () => {
    const query = useSearchParams();
    const id = query[0].get("id");
    const lang = query[0].get("lang");
    return ({ id, lang });
}

export default function Activate(){
    const navigate = useNavigate();
    const { language, setLanguage } = useGlobalContext();
    const [username, setUsername] = useState<string>();
    const [waitingForServer, setWaitingForServer] = useState(() => true);
    const { id, lang } = getQueryString();
    const activateTexts = texts.get(language); 
    const contentRef = useRef(null);
    const loadingRef = useRef(null);


    const handleServerReply = (reply: serverReply) => {
        switch(reply){
            case "SUCCESS_VALID_PURPOSE":
                getRequest("/finish-signup", {id: id});
            break;
            case "ERROR_INVALID_PURPOSE":
            case "ERROR_DUPLICATE_USER":
            case "ERROR_NO_ACTIVATING_USER":
                setWaitingForServer(false);
            break;
            default:
                if(reply.includes("SUCCESS_REGISTERED_USER")){
                    const name = reply.split("==").at(-1);
                    if(name.length > 0){
                        setUsername(name);
                    }
                }
            break;
        }
    }

    const getRequest = (link: string, params: any, catchCall?: () => void) => {
        setWaitingForServer(true);
        api.get(link, {params}).then((resp) => {
            handleServerReply(resp.data.msg);
        }).catch(() => {
            catchCall && catchCall();
            setWaitingForServer(false);
        });
    }

    useLayoutEffect(() => {
        if(waitingForServer){
            spawn(loadingRef.current, 0.5);
            vanish(contentRef.current);
        } else {
            vanish(loadingRef.current, 0.5);
            spawn(contentRef.current, 1, 'flex');
        }
    }, [waitingForServer]);

    useEffect(() => {
        setLanguage((lang && lang === "en-us")? lang : "pt-br");
        if(!id || id === ""){
            navigate("/");
        } else {
            getRequest("/validate", {id: id, purpose: "activate"});
        }
    }, []);

    return (
        <Background>
            <Header logo lang/>
            <TopContent ref={contentRef}>
                <Texts>
                    <WelcomeText>
                        {username? activateTexts.welcome : activateTexts.hmmm}
                    </WelcomeText>
                    <HintText>
                        {username
                            ? <> 
                                {activateTexts.hello}
                                <Bold>
                                    {`, ${username.length > 0? username : "Fulano"}! `}    
                                </Bold>
                                {activateTexts.activationWasSuccessful}
                            </>
                            : activateTexts.somethingWentWrong
                        }
                    </HintText>
                </Texts>
                <Button onClick={() => navigate("/")}>
                    {username? activateTexts.ok : activateTexts.goBack}
                </Button>
            </TopContent>
            <Gsap ref={loadingRef}>
                <Loading />
            </Gsap>
        </Background>
    )
}