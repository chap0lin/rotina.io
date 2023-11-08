import styled from "@emotion/styled";
import { colors } from "src/colors";

export const Section = styled.div`
    flex: 1;
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const ButtonText = styled.p`
    font-size: 18px;
    color: ${colors.darkWhite};
    @media(max-height: 750px){
        font-size: 16px;
    }
`;