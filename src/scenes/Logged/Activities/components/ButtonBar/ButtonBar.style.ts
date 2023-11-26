import styled from "@emotion/styled";
import { colors } from "src/colors";

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    padding: 0 10px;
    margin-top: 10px;
    border-radius: 20px;
    position: relative;
    @media(max-height: 750px){
        height: 50px;
    }
`;

export const Gsap = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
`;

export const AddButton = styled(Gsap)`
    left: unset;
    right: 0;
    height: 50px;
    margin: 5px 0;
    background: black;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

export const AddText = styled.p`
    color: ${colors.white};
    font-size: 18px;
`;

export const AddIcon = styled.div``;