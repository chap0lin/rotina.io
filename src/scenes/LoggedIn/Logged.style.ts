import styled from "@emotion/styled";
import { colors } from "src/colors";

const FlexColumn = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const Text = styled.p`
    flex-shrink: 0;
    width: 100%;
    color: ${colors.black};
`;

const Bold = styled.span`
    font-weight: 700;
    color: ${colors.black};
`;

export const Gsap = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
`;

export const MainContent = styled(FlexColumn)`
    padding: 30px;
    position: relative;
    flex: 1;
`;

export const TopTexts = styled(FlexColumn)`
    gap: 20px;
    @media(max-height: 750px){
        gap: 16px;
    }
`;

export const BigTitle = styled(Text)`
    text-align: left;
    font-size: 35px;
    font-weight: 400;
    @media(max-height: 750px){
        font-size: 30px;
    }
`;  

export const SubTitle = styled(Text)`
    text-align: left;
    font-size: 17px;
    height: 80px;
    opacity: 0.8;
    @media(max-height: 750px){
        font-size: 15px;
        height: 70px;
    }
`;

export const BigBold = styled(Bold)`
    font-size: 35px;
    @media(max-height: 750px){
        font-size: 30px;
    }
`;

export const Section = styled(FlexColumn)`
    flex-shrink: 0;
    width: 100%;
    flex: 1;
    gap: 20px;
    align-items: center;
    max-height: 250px;
    overflow-x: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    @media(max-height: 750px){
        max-height: 200px;
        gap: 12px;
    }
`;

export const SectionTitle = styled(Text)`
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    @media(max-height: 750px){
        font-size: 18px;
    }
`;


export const BottomContent = styled.div`
    position: fixed;
    width: 100%;
    height: 80px;
    padding: 0 15px;
    z-index: 50;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
    background: linear-gradient(180deg, #FFFFFF00 30%, #FFFFFFFF 100%);
    @media(max-height: 750px){
        height: 70px;
    }
`;  