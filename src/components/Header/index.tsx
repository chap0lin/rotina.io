import { useRef, useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContextProvider";
import { ArrowLeft, Globe, User } from "react-feather";
import { colors } from "../../colors";
import Logo from "../Logo";
import gsap from "gsap";
import LanguageSelector from "./components/LanguageSelector";
import { Container, Gsap, LanguageDiv, LeftSide, RightSide } from "./Header.style";
import { languageOption } from "../../types";

interface props {
  goBackArrow?: () => void;
  showGoBackArrow?: boolean;
  logo?: boolean;
  user?: boolean;
  lang?: boolean;
}

export default function Header({showGoBackArrow, logo, user, lang, goBackArrow}: props) {

  const { innerHeight, setLanguage } = useGlobalContext();
  const [showLanguages, setShowLanguages] = useState<boolean>(() => false);
  const arrowRef = useRef(null);

  const onLanguageSelection = (newLang: languageOption) => {
    setLanguage(newLang);
    setShowLanguages(false);
  }

  const onGlobeIconClick = () => {
    setShowLanguages(prev => !prev);
  }

  const handleArrowClick = () => {
    showGoBackArrow && goBackArrow();
  }

  useEffect(() => {
    gsap.to(arrowRef.current, {
      opacity: showGoBackArrow? 1 : 0,
      duration: 1,
    });
  }, [showGoBackArrow]);

  return (
    <Container>
      <LeftSide>
        { goBackArrow && 
          <Gsap ref={arrowRef}>
            <ArrowLeft
              strokeWidth={1}
              width={(innerHeight > 750)? 40 : 35}
              height={(innerHeight > 750)? 40 : 35}
              color={colors.black}
              onClick={handleArrowClick}
            />
          </Gsap>
        }
        { logo && 
          <Logo
            color={colors.black}
            fontSize={(innerHeight > 750)? 25 : 22}
          />
        }
      </LeftSide>
      <RightSide>
        { user && 
          <User
            strokeWidth={1}
            width={(innerHeight > 750)? 35 : 30}
            height={(innerHeight > 750)? 35 : 30}
            color={colors.black}
          />
        }
        { lang &&
          <LanguageDiv>
            <Globe
              strokeWidth={1}
              width={(innerHeight > 750)? 35 : 30}
              height={(innerHeight > 750)? 35 : 30}
              color={colors.black}
              onClick={onGlobeIconClick}
            />
            <LanguageSelector show={showLanguages} onClick={onLanguageSelection}/>
          </LanguageDiv>
        }
      </RightSide>
    </Container>
  )
}
