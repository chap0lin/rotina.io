import styled from "@emotion/styled";
import { colors } from "../../colors";

export const Background = styled.div`
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: ${colors.white}FF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
`;

export const Gsap = styled.div`
    width: 100px;
    height: 100px;
`;

export const Text = styled.div`
    font-size: 30px;
    color: ${colors.black};
    font-family: 'Motley';
`;