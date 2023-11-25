import styled from "@emotion/styled";
import { colors } from "src/colors";

const Full = styled.div`
    width: 100%;
    height: 100%;
`;

export const OuterSpacer = styled(Full)`
    padding: 0 40px;
    flex-shrink: 0;
    scroll-snap-align: center;
`;

export const Container = styled(Full)`
    flex-shrink: 0;
    border-radius: 20px;
    border: 1px solid ${colors.black};
    overflow: hidden;
`;

export const TitleContainer = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.black};
    position: relative;
`;

export const Title = styled.p`
    font-size: 24px;
    font-weight: bold;
    color: ${colors.white};
`;

export const Badge = styled.p`
    padding: 5px;
    min-width: 60px;
    border-radius: 20px 20px 5px 20px;
    color: ${colors.white};
    background: ${colors.orange};
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Activities = styled.div`
    padding: 20px 0;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const ActivityContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    scroll-snap-align: start;
`;

export const InnerSpacer = styled(Full)`
    flex-shrink: 0;
`;

