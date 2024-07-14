import { useLayoutEffect, useRef } from "react";
import { colors } from "src/colors";
import { Loader } from "react-feather";
import { fade } from "src/functions/animation";
import { Container, AnimatedLoader } from "./Button.style";

interface props {
  onClick: () => void;
  children: JSX.Element | JSX.Element[] | string;
  background?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
  loading?: boolean;
  border?: string;
  borderRadius?: number | string;
  padding?: number | string;
}

export default function Button({
  onClick,
  children,
  background,
  color,
  width,
  height,
  disabled,
  loading,
  border,
  borderRadius,
  padding,
}: props) {
  const buttonRef = useRef(null);

  const buttonStyle = {
    width: width ?? "180px",
    height: height ?? "50px",
    color: color ?? colors.white,
    backgroundColor: background ?? colors.black,
    border: border ?? "none",
    borderRadius: borderRadius ?? "20px",
    padding: padding ?? "10px 20px",
  };

  const handleClick = () => {
    onClick();
  };

  useLayoutEffect(() => {
    fade(buttonRef.current, disabled ? 0.4 : 1, 0.5);
  }, [disabled]);

  const content = loading ? (
    <AnimatedLoader>
      <Loader width={"100%"} height={"100%"} color={colors.white} />
    </AnimatedLoader>
  ) : (
    children
  );

  return (
    <Container
      ref={buttonRef}
      disabled={disabled}
      style={buttonStyle}
      onClick={handleClick}
    >
      {content}
    </Container>
  );
}
