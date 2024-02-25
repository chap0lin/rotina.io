import styled from "@emotion/styled";
import { colors } from "src/colors";


const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Gsap = styled.div`
  position: absolute;
`;

export const Content = styled(FlexColumn)`
  margin-top: 180px;
  position: relative;
  flex: 1;
  width: 100%;
  @media (max-height: 750px) {
    margin-top: 90px;
  }
`;

export const WelcomeText = styled.p`
  font-size: 26px;
  color: ${colors.black};
  text-transform: uppercase;
  font-family: "Motley";
`;

export const HintGsap = styled(Gsap)`
  height: 80px;
`;

export const HintText = styled.p`
  font-size: 16px;
  color: ${colors.black};
  width: 100vw;
  max-width: 310px;
  text-align: center;
  @media (max-height: 750px) {
    margin-top: 0;
    max-width: 280px;
  }
`;

export const Bold = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: ${colors.black};
`;
