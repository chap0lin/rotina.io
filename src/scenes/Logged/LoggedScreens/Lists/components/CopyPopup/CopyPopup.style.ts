import styled from "@emotion/styled";
import { colors } from "src/colors";

export const Container = styled.div`
  border-radius: 10px;
  border: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
  @media(max-height: 750px){
    padding-top: 10px;
  }
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.black};
  @media(max-height: 750px){
    font-size: 19px;
  }
`;

export const Subtitle = styled(Title)`
  font-size: 18px;
  @media(max-height: 750px){
    font-size: 17px;
  }
`;

export const Text = styled.p`
  border-radius: 5px;
  font-size: 17px;
  font-weight: 400;
  color: ${colors.black};
  @media(max-height: 750px){
    font-size: 16px;
  }
`;

export const Options = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  padding-top: 10px;
`;

export const InfoSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  width: 50%;
  border: 1px dashed ${colors.lightGrey};
  border-radius: 10px;
  gap: 20px;
  padding: 10px;
`;


export const Brief = styled(Text)`
  font-size: 16px;
  text-align: justify;
  padding: 5px;
  @media(max-height: 750px){
    font-size: 15px;
  }
`;

