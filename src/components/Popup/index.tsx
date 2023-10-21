import { useEffect, useRef } from 'react';
import { X, CheckCircle, AlertTriangle, XCircle } from 'react-feather';
import { colors } from '../../colors';
import cookieIcon from './assets/cookie.png';
import gsap from 'gsap';
import { BottomContainer, Cookie, Description, Header, PopupContainer, Title, TopContainer, WarningDescription } from './Popup.style';

interface PopupProps {
  type: 'info' | 'warning' | 'cookies';
  warningType?: 'success' | 'alert' | 'failure';
  height?: number;
  title?: string;
  description: JSX.Element | string;
  show: boolean;
  comesFromTop?: boolean;
  titleColor?: string;
  iconColor?: string;
  exitIconColor?: string;
  descriptionColor?: string;
  backgroundColor?: string;
  border?: string;
  exit?: () => void;
}

export default function Popup({
  type,
  warningType,
  height,
  title,
  description,
  show,
  comesFromTop,
  titleColor,
  iconColor,
  exitIconColor,
  descriptionColor,
  backgroundColor,
  border,
  exit,
}: PopupProps) {
  const infoRef = useRef();
  const warningRef = useRef();
  const cookieRef = useRef();

  const releaseProps = comesFromTop
    ? {
        scale: 1,
        top: 85,
        duration: 0.6,
        ease: 'power2',
      }
    : {
        scale: 1,
        bottom: 20,
        duration: 0.6,
        ease: 'power2',
      };

  const hideProps = comesFromTop
    ? {
        scale: 0,
        top: -280,
        duration: 0.6,
        ease: 'power2',
      }
    : {
        scale: 0,
        bottom: -280,
        duration: 0.6,
        ease: 'power2',
      };

  const releasePopup = () => {
    let ref = infoRef;
    if (type === 'warning') ref = warningRef;
    if (type === 'cookies') ref = cookieRef;
    gsap.to(ref.current, releaseProps);
  };

  const hidePopup = () => {
    let ref = infoRef;
    if (type === 'warning') ref = warningRef;
    if (type === 'cookies') ref = cookieRef;
    gsap.to(ref.current, hideProps);
  };

  useEffect(() => {
    if (show === true) {
      releasePopup();
    } else {
      hidePopup();
    }
  }, [show]);

  const popupStyle = {
    height: height ? `${height}px` : 'auto',
    backgroundColor: backgroundColor ? backgroundColor : colors.white,
    border: border ? border : 'none',
    opacity: 0.95,
  };

  const getIcon = () => {
    switch (warningType) {
      case 'success':
        return <CheckCircle color={iconColor?? colors.lime} width={24} height={24} />;
      case 'alert':
        return <AlertTriangle color={iconColor?? colors.gold} width={24} height={24} />;
      case 'failure':
        return <XCircle color={iconColor?? colors.red} width={24} height={24} />;
      default:
        return null;
    }
  };

  switch (type) {
    case 'cookies':
      return (
        <BottomContainer ref={cookieRef}>
          <PopupContainer>
            <Header>
              <Title>Nham... cookies</Title>
              <Cookie src={cookieIcon} />
            </Header>
            <Description
              style={descriptionColor ? { color: descriptionColor } : {}}>
              {description}
            </Description>
          </PopupContainer>
        </BottomContainer>
      );
    case 'warning':
      return (
        <BottomContainer ref={warningRef}>
          <PopupContainer style={popupStyle}>
            <WarningDescription
              style={descriptionColor ? { color: descriptionColor } : {}}>
              {description}
              {getIcon()}
            </WarningDescription>
          </PopupContainer>
        </BottomContainer>
      );
    default:
      const Container = comesFromTop? TopContainer : BottomContainer;

      return (
        <Container
          ref={infoRef}>
          <PopupContainer style={popupStyle}>
            <Header>
              <Title
                style={titleColor ? { color: titleColor } : {}}>
                {title}
              </Title>
              <X
                color={exitIconColor?? colors.black}
                width="24px"
                strokeWidth="5px"
                onClick={exit}
              />
            </Header>
            <Description
              style={descriptionColor ? { color: descriptionColor } : {}}>
              {description}
            </Description>
          </PopupContainer>
        </Container>
      );
  }
}
