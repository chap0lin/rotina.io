import styled from "@emotion/styled";

export const Section = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 75%, transparent 100%);
  scroll-snap-type: y mandatory;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const EmptyFooter = styled.div`
  flex-shrink: 0;
`;

export const Snap = styled.div`
  scroll-snap-align: start;
  width: 100%;
  display: flex;
  justify-content: center;
`;