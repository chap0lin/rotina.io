import { useEffect, useRef } from "react";
import { X, CheckCircle, AlertTriangle, XCircle } from "react-feather";
import { colors } from "src/colors";
import cookieIcon from "./assets/cookie.png";
import gsap from "gsap";
import {
  BottomContainer,
  Cookie,
  Description,
  Header,
  PopupContainer,
  Title,
  TopContainer,
  WarningDescription,
} from "./Popup.style";
import { popupType } from "src/types";

interface PopupProps {
  type: popupType;
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
        ease: "power2",
      }
    : {
        scale: 1,
        bottom: 20,
        duration: 0.6,
        ease: "power2",
      };

  const hideProps = comesFromTop
  ? {
      scale: 0,
      top: -280,
      duration: 0.6,
      ease: "power2",
    }
  : {
      scale: 0,
      bottom: -280,
      duration: 0.6,
      ease: "power2",
  };

  const getBorder = () => {
    switch(type) {
      case "cookies":
      case "info":
      case "prompt":
        return `2px solid ${colors.white}`;
      case "warning-alert":
        return `2px solid ${colors.white}`;
      case "warning-failure":
        return `2px solid ${colors.red}`;
      case "warning-success":
        return `2px solid ${colors.lime}`;
    }
  }

  const getIcon = () => {
    switch (type) {
      case "warning-success":
        return (
          <CheckCircle
            color={iconColor ?? colors.lime}
            width={30}
            height={30}
            style={{ flexShrink: 0 }}
          />
        );
      case "warning-alert":
        return (
          <AlertTriangle
            color={iconColor ?? colors.yellow}
            width={30}
            height={30}
            style={{ flexShrink: 0 }}
          />
        );
      case "warning-failure":
        return (
          <XCircle
            color={iconColor ?? colors.red}
            width={30}
            height={30}
            style={{ flexShrink: 0 }}
          />
        );
      default:
        return null;
    }
  };

  const popupStyle = {
    height: height ?? "auto",
    backgroundColor: backgroundColor ?? colors.white,
    border: border ?? getBorder(),
    paddingTop: (exit || title) ? "20px" : 0,
  };

  const getPopupType = () => {
    let ref = infoRef;
    switch(type){
      case(null):
      break;
      case ("prompt"):
        ref = warningRef;
      break;
      case("cookies"):
        ref = cookieRef;
      break;
      default:
        type.includes("warning") && (ref = warningRef);
    }
    return ref;
  }

  useEffect(() => {
    const ref = getPopupType();
    gsap.to(ref.current, show? releaseProps : hideProps);
  }, [show]);

  switch (type) {
    case "cookies":
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
    case "prompt":
    case "warning-alert":
    case "warning-failure":
    case "warning-success":
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
      const Container = comesFromTop ? TopContainer : BottomContainer;
      return (
        <Container ref={infoRef}>
          <PopupContainer style={popupStyle}>
            <Header>
              <Title style={titleColor ? { color: titleColor } : {}}>
                {title}
              </Title>
              <X
                color={exitIconColor ?? colors.black}
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
