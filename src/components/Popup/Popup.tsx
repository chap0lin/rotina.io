import { useEffect, useRef } from "react";
import { CheckCircle, AlertTriangle, XCircle } from "react-feather";
import { popupType } from "src/types";
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
  WarningContainer,
  WarningDescription,
} from "./Popup.style";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";

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
  descriptionColor,
  backgroundColor,
  border,
}: PopupProps) {
  const { innerHeight } = useGlobalContext();
  const infoRef = useRef();
  const warningRef = useRef();
  const cookieRef = useRef();

  const releaseProps = comesFromTop
    ? {
        scale: 1,
        top: 0,
        duration: 0.6,
        ease: "power2",
      }
    : {
        scale: 1,
        bottom: (innerHeight > 750)? 20 : 10,
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
    switch (type) {
      case "cookies":
      case "info":
      case "prompt":
        return `none`;
      case "warning-alert":
        return `2px solid ${colors.white}`;
      case "warning-failure":
        return `2px solid ${colors.red}`;
      case "warning-success":
        return `2px solid ${colors.lime}`;
    }
  };

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
  };

  const getPopupType = () => {
    let ref = infoRef;
    switch (type) {
      case null:
        break;
      case "prompt":
        ref = warningRef;
        break;
      case "cookies":
        ref = cookieRef;
        break;
      default:
        type.includes("warning") && (ref = warningRef);
    }
    return ref;
  };

  useEffect(() => {
    const ref = getPopupType();
    gsap.to(ref.current, show ? releaseProps : hideProps);
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
    case "warning-alert":
    case "warning-failure":
    case "warning-success":
      return (
        <BottomContainer ref={warningRef}>
          <WarningContainer style={popupStyle}>
            <WarningDescription
              style={descriptionColor ? { color: descriptionColor } : {}}>
              {description}
              {getIcon()}
            </WarningDescription>
          </WarningContainer>
        </BottomContainer>
      );
    case "prompt":
      return (
        <BottomContainer ref={warningRef}>
          <PopupContainer style={popupStyle}>
            <Description
              style={descriptionColor ? { color: descriptionColor } : {}}>
              {description}
            </Description>
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
