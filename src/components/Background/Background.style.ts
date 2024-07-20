import styled from "@emotion/styled";
import yarn from "src/assets/images/yarn.png";
import { colors } from "src/colors";

export const Outer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.white};
`;

export const OuterImg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  background-size: cover;
  background-image: url(${yarn});
  display: none;
  @media(min-width: 510px){
    display: block;
  }
`;

export const Inner = styled.div`
  position: absolute;
  flex-shrink: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  -webkit-transition: width 0.25s linear, height 0.25s linear;
  -ms-transition: width 0.25s linear, height 0.25s linear;
  transition: width 0.25s linear, height 0.25s linear;
  background-color: ${colors.white};
  @media(min-width: 510px){
    height: 95%;
    border-radius: 15px;
    border: 1px solid ${colors.grey};
  }
`;