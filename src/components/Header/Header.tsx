import { useRef, useState, useLayoutEffect } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { ArrowLeft, Globe, User } from "react-feather";
import { LanguageSelector, UserSelector } from "./components/index";
import { Logo, Blur, BlurFix } from "src/components";
import { colors } from "src/colors";
import { languageOption } from "src/types";
import { fade, fadeIn, fadeOut, move } from "src/functions/animation";
import {
  Clickable,
  Container,
  Gsap,
  LeftSide,
  RightSide,
} from "./Header.style";

interface props {
  show?: boolean;
  logo?: boolean;
  user?: boolean;
  lang?: boolean;
  arrow?: () => void;
}

export default function Header({
  show,
  logo,
  user,
  lang,
  arrow,
}: props) {
  const { innerHeight, blur, setLanguage, hidePopup, showBlur, hideBlur } = useGlobalContext();
  const [showLanguagesMenu, setShowLanguagesMenu] = useState<boolean>(() => false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(() => false);

  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const arrowRef = useRef(null);
  const userRef = useRef(null);
  const globeRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  const moveIfNecessary = (what: any, condition: boolean, howMuch: number) => { //TODO isso é realmente necessário? não dá só pra botar o move direto onde isso é chamado? kkkk
    move(what, { x: condition ? howMuch : 0 }, {duration: 1});
  };

  const handleLanguageSelection = (newLang: languageOption) => {
    setLanguage(newLang);
    setShowLanguagesMenu(false);
  };

  const handleUserSelection = (option: string) => {
    setShowUserMenu(false);
  };

  const handleUserIconClick = () => {
    user && setShowUserMenu((prev) => !prev);
  };

  const handleGlobeIconClick = () => {
    lang && setShowLanguagesMenu((prev) => !prev);
  };

  const handleArrowIconClick = () => {
    arrow && arrow();
  };

  useLayoutEffect(() => {
    fadeOut([
      arrowRef.current,
      logoRef.current,
      userRef.current,
      globeRef.current,
    ]);

    typeof show === "boolean" && fade(containerRef.current, 0);
  }, []);

  useLayoutEffect(() => {
    if (typeof show === "boolean") {
      fade(containerRef.current, show ? 1 : 0, 1);
    }
  }, [show]);

  useLayoutEffect(() => {
    (showLanguagesMenu || showUserMenu)
    ? showBlur() : hideBlur();
  }, [showUserMenu, showLanguagesMenu]);

  useLayoutEffect(() => {
    if(!blur){
      setShowLanguagesMenu(false);
      setShowUserMenu(false);
    }
  }, [blur]);

  useLayoutEffect(() => {
    arrow ? fadeIn(arrowRef.current, 1) : fadeOut(arrowRef.current, 1);
    logo ? fadeIn(logoRef.current, 1) : fadeOut(logoRef.current, 1);
    user ? fadeIn(userRef.current, 1) : fadeOut(userRef.current, 1);
    lang ? fadeIn(globeRef.current, 1) : fadeOut(globeRef.current, 1);

    moveIfNecessary(leftSideRef.current, !!!arrow, innerHeight > 750 ? -40 : -35);
    moveIfNecessary(rightSideRef.current, !lang, innerHeight > 750 ? 55 : 50);
  }, [arrow, logo, user, lang]);

  return (
    <>
      <Container ref={containerRef}>
        <LeftSide ref={leftSideRef}>
          <Gsap ref={arrowRef}>
            <Clickable>
              <ArrowLeft
                strokeWidth={1}
                width={innerHeight > 750 ? 40 : 35}
                height={innerHeight > 750 ? 40 : 35}
                color={colors.black}
                onClick={handleArrowIconClick}
              />
            </Clickable>
            <BlurFix show={blur} onClick={hideBlur} />
          </Gsap>
          <Gsap ref={logoRef}>
            <Clickable>
              <Logo
                color={colors.black}
                fontSize={innerHeight > 750 ? 25 : 24}
              />
            </Clickable>
            <BlurFix show={blur} onClick={hideBlur} />
          </Gsap>
        </LeftSide>
        <RightSide ref={rightSideRef}>
          <Gsap ref={userRef}>
            <Clickable>
              <User
                strokeWidth={1}
                width={innerHeight > 750 ? 35 : 30}
                height={innerHeight > 750 ? 35 : 30}
                color={colors.black}
                onClick={handleUserIconClick}
              />
            </Clickable>
            <BlurFix
              show={blur && !showUserMenu}
              onClick={hideBlur}
            />
            <UserSelector show={showUserMenu} onClick={handleUserSelection} />
          </Gsap>
          <Gsap ref={globeRef}>
            <Clickable>
              <Globe
                strokeWidth={1}
                width={innerHeight > 750 ? 35 : 30}
                height={innerHeight > 750 ? 35 : 30}
                color={colors.black}
                onClick={handleGlobeIconClick}
              />
            </Clickable>
            <BlurFix
              show={blur && !showLanguagesMenu}
              onClick={hideBlur}
            />
            <LanguageSelector
              show={showLanguagesMenu}
              onClick={handleLanguageSelection}
            />
          </Gsap>
        </RightSide>
      </Container>
    </>
  );
}
