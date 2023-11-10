import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 0 20px;
  position: relative;
  z-index: 100;
  @media(max-height: 750px){
    height: 72px;
  }
`;

export const Side = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LeftSide = styled(Side)`
  gap: 10px;
`;
export const RightSide = styled(Side)`
  gap: 20px;
`;

export const Gsap = styled.div`
  position: relative;
`;

export const Clickable = styled(Side)`
  cursor: pointer;
`;