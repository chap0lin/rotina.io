import styled from "@emotion/styled";
import { colors } from "src/colors";

const Full = styled.div`
    width: 100%;
`;

export const Background = styled(Full)`
    padding: 20px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${colors.white};
`;

export const Hint = styled.p`
    margin: 10px 0;
    padding: 0 40px;
    width: 100%;
    height: 40px;
    font-size: 20px;
    color: ${colors.black};
    display: flex;
`;

export const MainContainer = styled(Full)`
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const ButtonBarContainer = styled.div`
    width: 100%;
    padding: 0 40px;
`;

