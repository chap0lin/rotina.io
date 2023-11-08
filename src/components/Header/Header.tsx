import { useRef, useState, useLayoutEffect } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { ArrowLeft, Globe, User } from "react-feather";
import { LanguageSelector, UserSelector } from "./components/index";
import { Logo, Blur } from "components/index";
import { colors } from "src/colors";
import { languageOption } from "src/types";
import { spawn, vanish } from "src/functions/animation";
import { Clickable, Container, Gsap, LeftSide, RightSide } from "./Header.style";

interface props {
  goBackArrow?: () => void;
  showGoBackArrow?: boolean;
  logo?: boolean;
  user?: boolean;
  lang?: boolean;
}

export default function Header({showGoBackArrow, logo, user, lang, goBackArrow}: props) {

  const { innerHeight, setLanguage } = useGlobalContext();
  const [showLanguagesMenu, setShowLanguagesMenu] = useState<boolean>(() => false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(() => false);
  const arrowRef = useRef(null);

  const isAnyMenuShowing = (showLanguagesMenu || showUserMenu);

  const onLanguageSelection = (newLang: languageOption) => {
    setLanguage(newLang);
    setShowLanguagesMenu(false);
  }

  const onUserSelection = (option: string) => {
    setShowUserMenu(false);
  }

  const clear = () => {
    setShowLanguagesMenu(false);
    setShowUserMenu(false);
  }

  const handleUserIconClick = () => {
    setShowUserMenu(prev => !prev);
  }

  const handleGlobeIconClick = () => {
    setShowLanguagesMenu(prev => !prev);
  }

  const handleArrowIconClick = () => {
    showGoBackArrow && goBackArrow();
  }

  useLayoutEffect(() => {
    vanish(arrowRef.current);
  }, []);

  useLayoutEffect(() => {
    (showGoBackArrow && !showLanguagesMenu)
    ? spawn(arrowRef.current, 1)
    : vanish(arrowRef.current, 1);
  }, [showGoBackArrow, showLanguagesMenu]);

  return (
    <Container>
      <Blur show={isAnyMenuShowing} onClick={clear}/>
      <LeftSide>
        { goBackArrow && 
          <Gsap ref={arrowRef}>
            <Clickable>
              <ArrowLeft
                strokeWidth={1}
                width={(innerHeight > 750)? 40 : 35}
                height={(innerHeight > 750)? 40 : 35}
                color={colors.black}
                onClick={handleArrowIconClick}
              />
            </Clickable>
          </Gsap>
        }
        { logo && 
          <Logo
            color={colors.black}
            fontSize={(innerHeight > 750)? 25 : 24}
          />
        }
      </LeftSide>
      <RightSide>
        { user && 
          <Clickable>
            <User
              strokeWidth={1}
              width={(innerHeight > 750)? 35 : 30}
              height={(innerHeight > 750)? 35 : 30}
              color={colors.black}
              onClick={handleUserIconClick}
            />
            <UserSelector show={showUserMenu} onClick={onUserSelection}/>
          </Clickable>
        }
        { lang &&
          <Clickable>
            <Globe
              strokeWidth={1}
              width={(innerHeight > 750)? 35 : 30}
              height={(innerHeight > 750)? 35 : 30}
              color={colors.black}
              onClick={handleGlobeIconClick}
            />
            <LanguageSelector show={showLanguagesMenu} onClick={onLanguageSelection}/>
          </Clickable>
        }
      </RightSide>
    </Container>
  )
}
