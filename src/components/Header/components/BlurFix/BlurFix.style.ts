import styled from "@emotion/styled";

//TODO gambiarra. Consertar quando puder

const BLUR_LEVEL = 5;
export const Blurry = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  z-index: 90;
  backdrop-filter: blur(${BLUR_LEVEL}px);
  -webkit-backdrop-filter: blur(${BLUR_LEVEL}px);
  -moz-backdrop-filter: blur(${BLUR_LEVEL}px);
  -o-backdrop-filter: blur(${BLUR_LEVEL}px);
  -ms-backdrop-filter: blur(${BLUR_LEVEL}px);
`;
