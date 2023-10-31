import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { spawn, vanish } from "src/functions/animation";
import { texts } from "./Activate.lang";
import { api } from "src/services/api";
import { Loading, Header, Background, Button } from "components/index";
import { Bold, Gsap, HintText, Texts, TopContent, WelcomeText } from "./Activate.style";

type serverReply = "ERROR_DUPLICATE" | "ERROR_NO_PENDING_USER" | "USER_REGISTERED";

export default function Activate(){
    const navigate = useNavigate();
    const { language, setLanguage } = useGlobalContext();
    const [username, setUsername] = useState<string>();
    const [waitingForServer, setWaitingForServer] = useState(() => true);
    const [queryString, setQueryString] = useSearchParams();
    const id = queryString.get("id");
    const lang = queryString.get("lang");
    const activateTexts = texts.get(language); 

    const contentRef = useRef(null);
    const loadingRef = useRef(null);

    useEffect(() => {
        if(waitingForServer){
            spawn(loadingRef.current);
            vanish(contentRef.current);
        } else {
            vanish(loadingRef.current, 0.5);
            spawn(contentRef.current, 1, 'flex');
        }
    }, [waitingForServer]);


    const handleServerReply = (reply: serverReply) => {
        if(reply.includes("USER_REGISTERED")){
            const name = reply.split("=").at(-1);
            if(name.length > 0){
                setUsername(name);
            }
        } else {

        }
        setWaitingForServer(false);
    }

    const getRequest = (link: string, params: any) => {
        setWaitingForServer(true);
        api.get(link, {params}).then((resp) => {
            handleServerReply(resp.data.msg);
        }).catch((err) => {
            setWaitingForServer(false);
        });
    }

    useEffect(() => {
        setLanguage((lang && lang === "en-us")? lang : "pt-br");
        if(!id || id === ""){
            navigate("/");
        } else {
            getRequest("/finish-signup", {id: id});
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
                <Loading lang={language}/>
            </Gsap>
        </Background>
    )
}