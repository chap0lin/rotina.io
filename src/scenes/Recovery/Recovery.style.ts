import styled from "@emotion/styled";
import { colors } from "src/colors";

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Content = styled(FlexColumn)`
    padding-top: 180px;
    width: 100%;
    @media(max-height: 750px){
        padding-top: 90px;
    }
`;

export const Gsap = styled.div`
    position: absolute;
`;

export const LoadingDiv = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
`;

export const Title = styled.p`
    font-size: 26px;
    color: ${colors.black};
    text-transform: uppercase;
    font-family: 'Motley';
    white-space: nowrap;
`;

export const HintText = styled.p`
    font-size: 16px;
    color: ${colors.black};
    width: 100vw;
    max-width: 310px;
    text-align: center;
    @media(max-height: 750px){
        margin-top: 0;
        max-width: 270px;
    }
`;

export const Bold = styled.span`
    font-weight: bold;
    font-size: 16px;
    color: ${colors.black};
`;


