import styled from "@emotion/styled";
import { colors } from "../../colors";

export const Gsap = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
`;

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const TopContent = styled(FlexColumn)`
    padding-top: 180px;
    position: relative;
    gap: 40px;
    @media(max-height: 750px){
        padding-top: 90px;
    }
`;

export const Texts = styled(FlexColumn)`
    gap: 20px;
    height: 160px;
    justify-content: flex-start;
`;

export const WelcomeText = styled.p`
    font-size: 26px;
    color: ${colors.black};
    text-transform: uppercase;
    font-family: 'Motley';
`;

export const HintGsap = styled(Gsap)`
    height: 80px;
`;

export const HintText = styled.p`
    font-size: 16px;
    color: ${colors.black};
    width: 100vw;
    max-width: 340px;
    text-align: center;
    @media(max-height: 750px){
        margin-top: 0;
        max-width: 280px;
    }
`;

export const Bold = styled.span`
    font-weight: bold;
    font-size: 16px;
    color: ${colors.black};
`;


