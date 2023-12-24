import styled from "@emotion/styled";
import { colors } from "src/colors";

const Full = styled.div`
    width: 100%;
    height: 100%;
`;

export const OuterSpacer = styled(Full)`
    flex-shrink: 0;
    scroll-snap-align: center;
    display: flex;
    justify-content: center;
`;

export const Container = styled(Full)`
    flex-shrink: 0;
    border-radius: 20px;
    border: 1px solid ${colors.black};
    overflow: hidden;
    max-width: calc(100% - 80px);
`;

export const TitleContainer = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.black};
    position: relative;
    @media(max-height: 750px){
        height: 50px;
    }
`;

export const Title = styled.p`
    font-size: 24px;
    font-weight: bold;
    color: ${colors.white};
    @media(max-height: 750px){
        font-size: 22px;
    }
`;

export const Badge = styled.p`
    background: linear-gradient(110deg, ${colors.blue} 8%, ${colors.lightBlue} 18%, ${colors.blue} 33%);
    background-size: 300% 100%;
    padding: 5px 12px;
    border-radius: 20px 20px 5px 20px;
    font-size: 15px;
    font-weight: bold;
    color: ${colors.white};
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: 7s shine linear infinite;
    @keyframes shine {
      to {
        background-position-x: -300%;
      }
    }
    @media(max-height: 740px){
        font-size: 12px;
        padding: 3px 10px;
    }
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
