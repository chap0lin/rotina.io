import styled from "@emotion/styled";
import { colors } from "../../colors";

export const Gsap = styled.div`
    position: absolute;
`;

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Content = styled(FlexColumn)`
    flex: 1;
    justify-content: space-between;
`;

export const TopContent = styled(FlexColumn)`
    padding-top: 180px;
    position: relative;
    @media(max-height: 750px){
        padding-top: 90px;
    }
`;

export const BottomContent = styled(FlexColumn)`
    margin-bottom: 20px;
`;

export const Credentials = styled(FlexColumn)`
    position: absolute;
`;

export const DiscreteText = styled.p`
    font-size: 16px;
    color: ${colors.black};
    @media(max-height: 750px){
        font-size: 15px;
    }
`;

export const HintGsap = styled(Gsap)`
    height: 80px;
`;

export const HintText = styled(DiscreteText)`
    cursor: pointer;
    width: 100vw;
    max-width: 320px;
    text-align: center;
    @media(max-height: 750px){
        margin-top: 0;
        max-width: 280px;
    }
`;

export const Bold = styled.span`
    color: ${colors.black};
    font-weight: bold;
    cursor: pointer;
`;

export const LogoDiv = styled.div``;

