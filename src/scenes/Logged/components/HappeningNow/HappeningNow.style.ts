import styled from "@emotion/styled";
import { colors } from "src/colors";

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 5px;
`;

export const Section = styled.div`
    flex: 1;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    overflow-x: visible;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const Activities = styled(FlexColumn)`
    position: relative;
`;

export const GsapCard = styled(FlexColumn)`
    position: absolute;
`;

export const ButtonText = styled.p`
    font-size: 18px;
    color: ${colors.darkWhite};
    @media(max-height: 750px){
        font-size: 16px;
    }
`;