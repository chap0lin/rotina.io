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
  width: 145px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  @media (max-height: 740px) {
    font-size: 15px;
    width: 130px;
    height: 40px;
  }
`;

export const Container = styled(FlexColumn)`
  gap: 5px;
  overflow: hidden;
  border-radius: 0 20px;
  margin-bottom: 20px;
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const OffCircle = styled.div`
  position: absolute;
  background: ${colors.pink};
  right: -35px;
  top: -35px;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  transform: rotate(45deg);
  z-index: 0;
`;

export const Title = styled.p`
  padding: 0 20px;
  margin-top: 20px;
  font-size: 21px;
  font-family: "Motley";
  color: ${colors.black};
`;

export const Text = styled.p`
  padding: 0 20px;
  font-size: 16px;
  color: ${colors.black};
  @media (max-height: 740px) {
    font-size: 15px;
  }
`;

export const ActivityPreview = styled(FlexColumn)`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
  @media (max-height: 740px) {
    gap: 10px;
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
  width: 45px;
  height: 25px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  background: ${colors.black};
  position: relative;
  cursor: pointer;
`;

export const FocusText = styled(Text)`
  padding: 0;
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
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
  @media (max-height: 740px) {
    margin-top: 15px;
  }
`;

export const YesButton = styled(Button)`
  color: ${colors.white};
  background: ${colors.black};
`;

export const NoButton = styled(Button)`
  color: ${colors.black};
  border: 1px solid ${colors.darkWhite};
`;
