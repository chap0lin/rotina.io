import styled from "@emotion/styled";
import { colors } from "../../colors";

export const FlexColumn = styled.div`
    width: 100%;
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
    padding-top: 50%;
    position: relative;
    @media(max-height: 750px){
        padding-top: 25%;
        gap: 30px;
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
`;

export const HintText = styled(DiscreteText)`
    cursor: pointer;
    width: 100%;
    max-width: 300px;
    text-align: center;
    @media(max-height: 750px){
        margin-top: 0;
    }
`;

export const Bold = styled.span`
    color: ${colors.black};
    font-weight: bold;
    cursor: pointer;
`;

export const LogoDiv = styled.div``;

export const Gsap = styled.div`
    position: absolute;
`;
