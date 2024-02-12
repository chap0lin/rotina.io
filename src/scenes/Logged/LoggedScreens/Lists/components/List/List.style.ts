import styled from "@emotion/styled";
import { colors } from "src/colors";

const FlexColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Items = styled(FlexColumn)`
  flex: 1;
  gap: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media(max-height: 750px){
    top: 100px;
  }
`;

export const Line = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const Number = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const Content = styled.p`
  cursor: pointer;
  width: calc(100% - 30px);
  font-size: 16px;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: auto;
  @media(max-height: 750px){
    font-size: 15px;
    line-height: 17px;
  }
`;