import styled from "@emotion/styled";
import { colors } from "src/colors";

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
  @media (max-height: 750px) {
    gap: 12px;
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

export const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const PlaceholderText = styled.p`
  color: ${colors.grey};
  font-size: 16px;
  @media(max-height: 750px){
    font-size: 15px;
  }
`;

export const CreateDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  padding: 2px 10px;
`;

export const CreateIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 2px;
  background: ${colors.lightGrey};
`;

export const CreateText = styled(PlaceholderText)``;