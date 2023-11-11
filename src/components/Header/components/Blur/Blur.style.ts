import styled from "@emotion/styled";

const BLUR_LEVEL = 5;

export const Blurry = styled.div`
  position: fixed;
  z-index: 90;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(${BLUR_LEVEL}px);
  -webkit-backdrop-filter: blur(${BLUR_LEVEL}px);
  -moz-backdrop-filter: blur(${BLUR_LEVEL}px);
  -o-backdrop-filter: blur(${BLUR_LEVEL}px);
  -ms-backdrop-filter: blur(${BLUR_LEVEL}px);
`;
