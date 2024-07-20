import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 18px;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :focus {
    outline: none;
  }
  :disabled {
    cursor: not-allowed;
  }
  @media (max-height: 750px) {
    font-size: 16px;
    gap: 6px;
  }
`;

export const AnimatedLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotate} 2s linear infinite;
`;
