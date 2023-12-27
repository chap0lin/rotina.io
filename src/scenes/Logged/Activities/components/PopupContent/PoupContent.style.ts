import styled from "@emotion/styled";
import { colors } from "src/colors";

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Button = styled.div`
    flex-shrink: 0;
    font-size: 16px;
    font-weight: 400;
    border-radius: 20px;
    cursor: pointer;
    @media(max-height: 740px){
        font-size: 15px;
    }
`;

export const Container = styled(FlexColumn)`
    gap: 5px;
`;

export const Title = styled.p`
    padding: 0;
    margin: 0;
    font-size: 21px;
    font-family: "Motley";
    color: ${colors.black};
`;

export const Text = styled.p`
    padding: 0;
    margin: 0;
    font-size: 16px;
    color: ${colors.black};
    @media(max-height: 740px){
        font-size: 15px;
    }
`;

export const ActivityPreview = styled(FlexColumn)`
    width: 320px;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    gap: 15px;
    @media(max-height: 740px){
        width: 290px;
        gap: 15px;
    }
`;

export const CardPreview = styled.div`
    width: 330px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const FocusDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const Slot = styled.div`
    width: 50px;
    height: 25px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    background: ${colors.black};
    position: relative;
`;

export const Ball = styled.div`
    background: ${colors.white};
    width: 21px;
    height: 21px;
    border-radius: 13px;
    position: absolute;
    right: 2px;
`;

export const Buttons = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    gap: 20px;
    @media(max-height: 740px){
        margin-top: 15px;
        gap: 15px;
    }
`;

export const YesButton = styled(Button)`
    color: ${colors.white};
    background: ${colors.red};
    padding: 10px 25px;
    @media(max-height: 740px){
        padding: 10px 15px;
    }
`;

export const NoButton = styled(Button)`
    color: ${colors.black};
    background: ${colors.white};
`;