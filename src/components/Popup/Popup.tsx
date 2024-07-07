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
  show: boolean;
  type: popupType["type"];
  description: popupType["text"];
  height?: popupType["height"];
  title?: string;
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

  const getDescriptionColor = () => {
    switch (type) {
      case "warning-alert":
      case "warning-failure":
      case "warning-success":
        return colors.white;
      default:
        return colors.black;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "warning-alert": return colors.amber;
      case "warning-failure": return colors.pink;
      case "warning-success": return colors.lime;
      default: return "none";
    }
  };

  const getIcon = () => {
    let Icon = null;
    switch (type) {
      case "warning-success": Icon = CheckCircle; break;
      case "warning-alert": Icon = AlertTriangle; break;
      case "warning-failure": Icon = XCircle; break;
      default: return null;
    }
    return (
      <Icon
        color={iconColor ?? colors.white}
        width={25}
        height={25}
        style={{ flexShrink: 0 }}
      />
    )
  };

  const popupStyle = {
    height: height?? "auto",
    backgroundColor: backgroundColor ?? getBackgroundColor(),
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
            <WarningDescription style={{
              color: descriptionColor?? getDescriptionColor()
            }}>
              {getIcon()}
              {description}
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
