import styled from "@emotion/styled";
import { colors } from "src/colors";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled(FlexColumn)`
  width: 100%;
  gap: 20px;
  @media (max-height: 740px) {
    gap: 10px;
  }
`;

export const UpperBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`;

export const Title = styled.p`
  left: 0;
  font-size: 22px;
  color: ${colors.black};
  @media (max-height: 750px) {
    font-size: 19px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
`;

export const Gsap = styled.div`
  transition: opacity 0.25s;
`;

export const InvalidWarning = styled.div`
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  @media(max-height: 750px){
    padding-bottom: 0px;
  }
`;

export const InvalidCause = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px; 
  background: ${colors.pink};
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;
  border-radius: 5px;
  @media(max-height: 750px){
    font-size: 15px;
  }
`;

export const InvalidText = styled.p`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background: ${colors.grey};
  min-height: 40px;
  height: 100%;
  width: 100%;
  padding: 5px 10px;
  color: ${colors.white};
  font-size: 16px;
  line-height: 18.5px;
  @media (max-height: 750px) {
    font-size: 14px;
  }
`;
