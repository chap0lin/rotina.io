import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 0 20px;
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

export const Gsap = styled.div``;