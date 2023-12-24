import styled from "@emotion/styled";
import { colors } from "src/colors";

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Background = styled(FlexColumn)`
    flex-shrink: 0;
    width: 100%;
    padding: 0 10%;
`;

export const Edit = styled(FlexColumn)`
    width: 100%;
    flex: 1;
    margin-bottom: 60px;
    @media (max-height: 750px) {
      margin-bottom: 30px;
    }
`;

export const Hint = styled.p`
    margin: 10px 0;
    width: 100%;
    font-size: 22px;
    color: ${colors.black};
    @media(max-height: 750px){
        font-size: 19px;
        margin: 0;
    }
`;

export const ColorPalette = styled.div`
    width: 100%:
    flex-shrink: 0;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
`;

export const Inputs = styled(FlexColumn)`
    width: 100%;
    flex-shrink: 0;
    gap: 15px;
    @media(max-height: 750px){
        gap: 5px;
    }
`;

export const Input = styled.input`
    border: none;
    color: ${colors.black};
    border-bottom: 1px solid ${colors.grey};
    outline: none;
    font-size: 18px;
    background: none;
    width: 100%;
    max-width: 300px;
    height: 40px;
    @media (max-height: 750px) {
      font-size: 16px;
      max-width: 260px;
    }
`;

export const HourInputs = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    max-width: 300px;
    @media (max-height: 750px) {
      max-width: 260px;
    }
`;

export const HourInput = styled(Input)`
    text-align: center;
`;

export const HourInputText = styled.p`
    color: ${colors.black};
    font-size: 18px;
    @media (max-height: 750px) {
      font-size: 16px;
    }
`;

export const Weekdays = styled.select`
    border: none;
    color: ${colors.black};
    border-bottom: 1px solid ${colors.grey};
    outline: none;
    font-size: 18px;
    background: none;
    width: 100%;
    max-width: 300px;
    height: 40px;
    @media (max-height: 750px) {
      font-size: 16px;
      max-width: 260px;
    }
`;

export const DayOption = styled.option`
    cursor: pointer;
`;