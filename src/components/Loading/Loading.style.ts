import { keyframes } from "@emotion/react";
import { colors } from "src/colors";
import styled from "@emotion/styled";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Background = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: ${colors.white}AA;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

export const Text = styled.div`
  font-size: 30px;
  color: ${colors.black};
  font-family: "Motley";
  text-transform: uppercase;
  @media (max-width: 500px) {
    font-size: 26px;
  }
  @media (max-height: 750px) {
    font-size: 22px;
  }
`;

export const AnimatedLoader = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotate} 2s linear infinite;
  @media (max-width: 750px) {
    width: 90px;
    height: 90px;
  }
  @media (max-height: 750px) {
    width: 80px;
    height: 80px;
  }
`;
