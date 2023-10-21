import { useRef, useEffect } from 'react';
import { colors } from '../../colors';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import { Container, Gsap, LeftSide, RightSide } from './Header.style';
import { ArrowLeft, Globe, User } from 'react-feather';
import Logo from '../Logo';
import gsap from 'gsap';

interface props {
  showGoBackArrow?: boolean;
  goBackArrow?: () => void;
  logo?: boolean;
  user?: boolean;
  lang?: boolean;
}

export default function Header({showGoBackArrow, logo, user, lang, goBackArrow}: props) {

  const { setLanguage } = useGlobalContext();
  const arrowRef = useRef(null);

  const toggleLanguage = () => {
    setLanguage(prev => {
      return (prev === 'en-us')
      ? 'pt-br'
      : 'en-us'
    });
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
              width={40}
              height={40}
              color={colors.black}
              onClick={handleArrowClick}
            />
          </Gsap>
        }
        { logo && 
          <Logo
            color={colors.black}
            fontSize={25}
          />
        }
      </LeftSide>
      <RightSide>
        { user && 
          <User
            strokeWidth={1}
            width={35}
            height={35}
            color={colors.black}
          />
        }
        { lang &&
          <Globe
            strokeWidth={1}
            width={35}
            height={35}
            color={colors.black}
            onClick={toggleLanguage}
          />
        }
      </RightSide>
    </Container>
  )
}
