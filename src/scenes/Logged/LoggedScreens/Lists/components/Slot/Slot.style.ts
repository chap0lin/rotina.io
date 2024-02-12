import styled from "@emotion/styled";
import { colors } from "src/colors";

const Text = styled.p`
    font-size: 17px;
    color: ${colors.black};
    width: 80px;
    font-weight: 500;
    overflow: hidden;
    text-transform: capitalize;
    @media(max-height: 750px){
        font-size: 16px;
    }
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
    justify-content: center;
    @media(max-height: 750px){
        gap: 10px;
    }
`;

export const LeftText = styled(Text)`
    text-align: right;
`;

export const RightText = styled(Text)`
    text-align: left;
`;

export const BallContainer = styled.div`
    background: ${colors.black};
    width: 55px;
    height: 30px;
    padding: 3px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    cursor: pointer;
    @media(max-height: 750px){
        width: 40px;
        height: 23px;
        padding: 2px;
    }
`;

export const Ball = styled.div`
    background: ${colors.white};
    width: 24px;
    height: 24px;
    border-radius: 17px;
    @media(max-height: 750px){
        width: 19px;
        height: 19px;
    }
`;