import styled from "@emotion/styled";
import { colors } from "src/colors";

export const IconContainer = styled.div`
  background: ${colors.black};  
  position: fixed;
  right: 15px;
  bottom: 15px;
  width: 72px;
  height: 72px;
  padding: 20px;
  border-radius: 40px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media (max-height: 750px) {
    padding: 17px;
    width: 60px;
    height: 60px;
  }
`;
