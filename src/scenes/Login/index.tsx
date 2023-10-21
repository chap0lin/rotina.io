import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { move, moveAndVanish, spawn, spawnAndMove, vanish } from "../../functions/animation";
import { useGlobalContext } from "../../contexts/GlobalContextProvider";
import { checkEmail, checkPassword } from "../../functions";
import { colors } from "../../colors";
import { texts } from "./Login.lang";
import Background from "../../components/Background";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import Credential from "./components/Credential";
import Button from "../../components/Button";
import { TopContent, Credentials, DiscreteText, BottomContent, Content, Bold, LogoDiv, Gsap, HintText } from "./Login.style";

const MIN_PASSWORD_SIZE = 8;
type screenType = "sign-in" | "sign-up" | "forgot-password";

export default function Start(){
    const { language } = useGlobalContext();
    const loginTexts = texts.get(language); 
    const [screen, setScreen] = useState<screenType>(() => "sign-in");
    const [hintText, setHintText] = useState<string>(() => loginTexts.forgotMyPassword);
    const [buttonText, setButtonText] = useState<string>(() => loginTexts.buttonSignIn);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(() => true);
    const [waitingForServer, setWaitingForServer] = useState<boolean>(() => false);

    const username = useRef<string>('');
    const email = useRef<string>('');
    const password = useRef<string>('');
    const repPassword = useRef<string>('');

    const logoRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const repPassRef = useRef(null);
    const hintRef = useRef(null);
    const signUpRef = useRef(null);
    const buttonRef = useRef(null);


    const checkSignInInputs = () => {
        return (
            username.current.length > 0 &&
            password.current.length > 0
        );
    }

    const checkSignUpInputs = () => {
        if(screen !== "sign-up") return false;
        let status = false;
        let hint = loginTexts.signUpHint;

        if( username.current.length > 0 &&
            email.current.length > 0 &&
            password.current.length > 0
        ) {
            if(!checkEmail(email.current)){
                hint = loginTexts.invalidEmail;
            } else {
                hint = loginTexts.newPasswordHint;
                if(checkPassword(password.current, MIN_PASSWORD_SIZE)){
                    if(repPassword.current.length > 0){
                        if(password.current === repPassword.current){
                            hint = loginTexts.goodToGo;
                            status = true;
                        } else {
                            hint = loginTexts.passwordsDontMatch;
                        }
                    }
                }
            }
        }
        setHintText(hint);
        return status;
    }


    const handleButtonStatus = () => {
        let status = true;
        switch(screen){
            case 'sign-in': status = !checkSignInInputs();
                break;
            case 'sign-up': status = !checkSignUpInputs();
                break;
            default: status = !checkEmail(email.current);
        }
        setButtonDisabled(status);
    }


    useEffect(() => {
        if(waitingForServer){
            setTimeout(() => {
                setWaitingForServer(false);
            }, 2000);
        }
    }, [waitingForServer]);


    useLayoutEffect(() => {
        vanish([emailRef.current, repPassRef.current]);
        move([
            nameRef.current,
            emailRef.current,
            passRef.current,
            repPassRef.current,
            hintRef.current, 
            buttonRef.current
        ], 90);
    }, []);

    
    useEffect(() => {
        switch(screen){
            case 'sign-in':
                setHintText(texts.get(language).forgotMyPassword);
                setButtonText(texts.get(language).buttonSignIn);
                spawnAndMove([nameRef.current], 90, 1);
                spawnAndMove([passRef.current], 150, 1);
                move([logoRef.current], 0, 1);
                move([hintRef.current], 200, 1);
                move([buttonRef.current], 300, 1);
                moveAndVanish([emailRef.current, repPassRef.current], 90, 1);
                spawn([signUpRef.current], 1);
            break;
            case 'forgot-password':
                setHintText(texts.get(language).willSendEmail);
                setButtonText(texts.get(language).buttonSend);
                spawn([emailRef.current], 1);
                vanish([nameRef.current], 1);
                moveAndVanish([passRef.current], 90, 1);
                move([hintRef.current], 140, 1);
                move([buttonRef.current], 240, 1);
                vanish([signUpRef.current], 1);
            break;
            case 'sign-up':
                setHintText(texts.get(language).signUpHint);
                setButtonText(texts.get(language).buttonSignUp);
                move([logoRef.current], -90, 1);
                move([nameRef.current], 0, 1);
                spawnAndMove([emailRef.current], 60, 1);
                move([passRef.current], 120, 1);
                spawnAndMove([repPassRef.current], 180, 1);
                move([hintRef.current], 240, 1);
                move([buttonRef.current], 340, 1);
                vanish([signUpRef.current], 1);
            break;
        }
        handleButtonStatus();
    }, [screen, language]);

    
    return (
        <Background>
            <Header
                lang
                showGoBackArrow={(!waitingForServer) && (screen !== 'sign-in')}
                goBackArrow={() => setScreen('sign-in')}
            />
            <Content>
                <TopContent>
                    <LogoDiv ref={logoRef}>
                        <Logo color={colors.black} fontSize='50px'/>
                    </LogoDiv>
                    <Credentials>
                        <Gsap ref={nameRef}>
                            <Credential
                                zIndex={10}
                                title={loginTexts.user}
                                disabled={waitingForServer}
                                onChange={(e) => {
                                    username.current = e;
                                    handleButtonStatus();
                                }}
                            />
                        </Gsap>
                        <Gsap ref={emailRef}>
                            <Credential
                                zIndex={8}
                                title={loginTexts.email}
                                disabled={waitingForServer}
                                onChange={(e) => {
                                    email.current = e;
                                    handleButtonStatus();
                                }}
                            />
                        </Gsap>
                        <Gsap ref={passRef}>
                            <Credential
                                safe
                                zIndex={10}
                                title={loginTexts.password}
                                disabled={waitingForServer}
                                onChange={(e) => {
                                    password.current = e;
                                    handleButtonStatus();
                                }}
                            />
                        </Gsap>
                        <Gsap ref={repPassRef}>
                            <Credential
                                safe
                                zIndex={8}
                                title={loginTexts.repeatPassword}
                                disabled={waitingForServer}
                                onChange={(e) => {
                                    repPassword.current = e;
                                    handleButtonStatus();
                                }}
                            />
                        </Gsap>
                    </Credentials>
                    <Gsap ref={hintRef}>
                        <HintText onClick={() => {
                            (!waitingForServer) &&
                            (screen === 'sign-in') &&
                            setScreen('forgot-password')
                        }}>
                            {hintText}
                        </HintText>
                    </Gsap>
                    <Gsap ref={buttonRef}>
                        <Button disabled={buttonDisabled} loading={waitingForServer} onClick={() => setWaitingForServer(true)}>
                            {buttonText}
                        </Button>
                    </Gsap>
                </TopContent>
                <BottomContent>
                    <DiscreteText ref={signUpRef}>
                        {loginTexts.haventSignedUpYet}&nbsp;
                        <Bold onClick={() => (!waitingForServer && setScreen('sign-up'))}>
                            {loginTexts.buttonSignUp}
                        </Bold>
                    </DiscreteText>
                </BottomContent>
            </Content>
        </Background>
    )
}