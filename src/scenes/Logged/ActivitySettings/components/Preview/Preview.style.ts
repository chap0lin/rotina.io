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
    @media(max-height: 740px){
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
    @media(max-height: 750px){
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
    height: 100%;
`;

export const Invalid = styled.p`
    width: 100%;
    color: ${colors.red};
    padding: 0 20px;
    text-align: center;
    font-size: 16px;
    line-height: 19px;
    @media(max-height: 750px){
        font-size: 15px;
        padding: 0 5px;
    }
`;