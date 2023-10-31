import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { isEmailValid, isPasswordValid } from "src/functions";
import { move, moveAndVanish, spawn, spawnAndMove, vanish } from "src/functions/animation";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { colors } from "src/colors";
import { texts } from "./Login.lang";
import { api } from "src/services/api";
import { Background, Header, Credential, Button, Logo, Popup } from "components/index";
import { TopContent, Credentials, DiscreteText, BottomContent, Content, Bold, LogoDiv, Gsap, HintText, HintGsap } from "./Login.style";


const MIN_PASSWORD_SIZE = 8;
type screenType = "sign-in" | "sign-up" | "forgot-password" | "sent-sign-up-email" | "sent-recovery-email";
type serverReply = "USER_ADDED" | "USER_PENDING" | "ERROR" | "USERNAME_ALREADY_TAKEN" | "EMAIL_ALREADY_TAKEN" | "EMAIL_FOUND" | "EMAIL_NOT_FOUND" | "EMAIL_ERROR";

export default function Start(){
    const { language, innerHeight, keyPressed } = useGlobalContext();
    const loginTexts = texts.get(language); 
    const [screen, setScreen] = useState<screenType>(() => "sign-in");
    const [hintText, setHintText] = useState<string>(() => loginTexts.forgotMyPassword);
    const [buttonText, setButtonText] = useState<string>(() => loginTexts.buttonSignIn);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(() => true);
    const [waitingForServer, setWaitingForServer] = useState<boolean>(() => false);
    const [popupVisibility, setPopupVisibility] = useState<boolean>(() => false);
    const [popupText, setPopupText] = useState<string>(() => "");

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

    const showPopup = (message: string) => {
        setPopupText(message);
        setPopupVisibility(true);
        setTimeout(() => {
            setPopupVisibility(false);
        }, 3000);
    }

    const getRequest = (link: string, params: any) => {
        setWaitingForServer(true);
        api.get(link, {params}).then((resp) => {
            handleServerReply(resp.data.msg);
        }).catch((err) => {
            showPopup(loginTexts.somethingWentWrong);
            setWaitingForServer(false);
        });
    }

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
            if(!isEmailValid(email.current)){
                hint = loginTexts.invalidEmail;
            } else {
                hint = loginTexts.newPasswordHint;
                if(isPasswordValid(password.current, MIN_PASSWORD_SIZE)){
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

    const checkAllInputs = () => {
        switch(screen){
            case 'sign-in': return checkSignInInputs();
            case 'sign-up': return checkSignUpInputs();
            default: return isEmailValid(email.current);
        }
    }

    const handleButtonStatus = () => {
        setButtonDisabled(!checkAllInputs());
    }

    const handleServerReply = (reply: serverReply) => {
        switch(reply){
            case "USER_PENDING":
                setScreen("sent-sign-up-email");
            break;
            case "EMAIL_FOUND":
                setScreen('sent-recovery-email');
            break;
            case "EMAIL_NOT_FOUND":
                showPopup(loginTexts.emailNotRegistered);
            break;
            case "EMAIL_ERROR":
                showPopup(loginTexts.somethingWentWrong);
            break;
            case "EMAIL_ALREADY_TAKEN":
                showPopup(loginTexts.emailAlreadyExists);
            break;
            case "USERNAME_ALREADY_TAKEN":
                showPopup(loginTexts.nameAlreadyExists);
            break;
        }
        setWaitingForServer(false);
    }


    const onButtonClick = () => {
        switch(screen){
            case 'sign-up':
                getRequest("/new-user", {
                    name: username.current,
                    password: password.current,
                    email: email.current,
                    lang: language,
                });
            break;
            case "forgot-password":
                getRequest("/recover", {
                    email: email.current,
                    lang: language,
                });
            break;
            case "sent-recovery-email":
            case "sent-sign-up-email":
                setScreen("sign-in");
            break;
        }
    }

    useEffect(() => {
        if (keyPressed === 'Enter' && checkAllInputs()){
            onButtonClick();
        }
    }, [keyPressed]);

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

    useLayoutEffect(() => {
        const lang = texts.get(language);
        switch(screen){
            case 'sign-in':
                setHintText(lang.forgotMyPassword);
                setButtonText(lang.buttonSignIn);
                spawnAndMove([nameRef.current], 90, 1);
                spawnAndMove([passRef.current], 150, 1);
                move([logoRef.current], 0, 1);
                move([hintRef.current], 220, 1);
                move([buttonRef.current], 300, 1);
                moveAndVanish([emailRef.current, repPassRef.current], 90, 1);
                spawn([signUpRef.current], 1);
            break;
            case 'sign-up':
                setHintText(lang.signUpHint);
                setButtonText(lang.buttonSignUp);
                move([logoRef.current], -75, 1);
                move([nameRef.current], 0, 1);
                spawnAndMove([emailRef.current], 60, 1);
                move([passRef.current], 120, 1);
                spawnAndMove([repPassRef.current], 180, 1);
                move([hintRef.current], 260, 1);
                move([buttonRef.current], 340, 1);
                vanish([signUpRef.current], 1);
            break;
            case 'forgot-password':
                setHintText(lang.enterEmail);
                setButtonText(lang.buttonSend);
                spawn([emailRef.current], 1);
                vanish([nameRef.current], 1);
                moveAndVanish([passRef.current], 90, 1);
                move([hintRef.current], 160, 1);
                move([buttonRef.current], 240, 1);
                vanish([signUpRef.current], 1);
            break;
            case 'sent-sign-up-email':
            case 'sent-recovery-email':
                const text = (screen === 'sent-sign-up-email')
                ? lang.willSendSignUpEmail
                : lang.willSendRecoverEmail; 
                setHintText(text);
                setButtonText(lang.goBack);
                moveAndVanish([
                    nameRef.current,
                    emailRef.current,
                    passRef.current,
                    repPassRef.current,
                ], 0, 1);
                move([logoRef.current], 0, 1);
                move([hintRef.current], 90, 1);
                move([buttonRef.current], 190, 1);
            break;
        }
        handleButtonStatus();
    }, [screen, language]);
    

    return (
        <Background>
            <Header
                lang
                showGoBackArrow={(!waitingForServer) && (screen === 'sign-up' || screen === 'forgot-password')}
                goBackArrow={() => setScreen('sign-in')}
            />
            <Content>
                <TopContent>
                    <LogoDiv ref={logoRef}>
                        <Logo color={colors.black} fontSize={innerHeight > 750? '50px' : '45px'}/>
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
                    <HintGsap ref={hintRef}>
                        <HintText onClick={() => {
                            (!waitingForServer) &&
                            (screen === 'sign-in') &&
                            setScreen('forgot-password')
                        }}>
                            {hintText}
                        </HintText>
                    </HintGsap>
                    <Gsap ref={buttonRef}>
                        <Button disabled={buttonDisabled} loading={waitingForServer} onClick={onButtonClick}>
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
            <Popup
                description={popupText}
                show={popupVisibility}
                type='warning'
                warningType="failure"
                exitIconColor={colors.black}
                descriptionColor={colors.black}
                backgroundColor={colors.white}
                border={`2px solid ${colors.red}`}
            />
        </Background>
    )
}