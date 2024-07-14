import styled from "@emotion/styled";

const FlexColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Container = styled(FlexColumn)`
  margin-top: 23%;
  width: 100%;
  height: 600px;
  gap: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media(max-height: 900px){
    height: 500px;
  }
  @media(max-height: 750px){
    height: 330px;
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
  width: 80%;
  font-size: 17px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: auto;
  @media(max-height: 750px){
    font-size: 16px;
    line-height: 17px;
  }
`;