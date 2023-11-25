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
    overflow: hidden;
    @media(max-height: 750px){
        height: 50px;
    }
`;

export const Gsap = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
`;
