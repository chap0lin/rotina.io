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
    font-size: 18px;
    border: none;
    outline: none;
    cursor: pointer;
    :focus{
      outline: none;
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