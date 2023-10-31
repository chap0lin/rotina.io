import styled from "@emotion/styled";
import { colors } from "../../colors";

export const Container = styled.div`
    width: 100vw;
    height: 40px;
    border: 1px solid ${colors.grey};
    border-radius: 10px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    max-width: 300px;
    gap: 10px;
    @media(max-height: 750px){
        max-width: 260px;
    }
`;

export const Title = styled.p`
    color: ${colors.black};
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    margin: 0;
    opacity: 70%;
    white-space: nowrap;
    @media(max-height: 750px){
        font-size: 15px;
    }
`;

export const Input = styled.input`
    width: 100%;
    background: ${colors.white};
    outline: none;
    border: none;
    color: ${colors.black};
    font-size: 17px;
    @media(max-height: 750px){
        font-size: 16px;
    }
`;