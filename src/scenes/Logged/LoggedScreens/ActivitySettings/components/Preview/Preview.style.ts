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
  position: absolute;
  bottom: 10px;
  border: 1px solid ${colors.pink};
  border-radius: 5px;
  padding: 2px 5px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const InvalidCause = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; 
  background: ${colors.pink};
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;
  border-radius: 5px;
  padding: 5px 10px;
  @media(max-height: 750px){
    height: auto;
    font-size: 15px;
  }
`;

export const InvalidText = styled.p`
  border-radius: 5px;
  width: auto;
  color: ${colors.black};
  font-size: 16px;
  line-height: 18.5px;
  @media (max-height: 750px) {
    font-size: 14px;
  }
`;
