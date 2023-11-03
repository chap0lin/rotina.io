import styled from "@emotion/styled";

const BLUR_LEVEL = 5;

export const Blurry = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 90;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(${BLUR_LEVEL}px);
    -webkit-backdrop-filter: blur(${BLUR_LEVEL}px);

`;