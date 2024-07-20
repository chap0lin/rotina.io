import styled from "@emotion/styled";

const Full = styled.div`
  width: 100%;
  height: 100%;
`;

export const Gsap = styled(Full)`
  position: absolute;
`;

export const BigContainer = styled(Full)`
  position: relative;
  overflow: hidden;
`;

export const SmallContainer = styled(Full)`
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
`;
