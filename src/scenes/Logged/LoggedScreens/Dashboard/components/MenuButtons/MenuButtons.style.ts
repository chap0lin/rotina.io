import styled from "@emotion/styled";
import { colors } from "src/colors";

const Align = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex: 1;
  max-width: 85%;
`;

export const Text = styled.p`
  font-size: 18px;
  color: ${colors.white};
  @media (max-height: 750px) {
    font-size: 16px;
  }
`;

export const Icon = styled.div`
  width: 30px;
  height: 30px;
  overflow: hidden;
  @media (max-height: 750px) {
    width: 20px;
    height: 20px;
  }
`;

export const AlignLeft = styled(Align)`
  justify-content: flex-start;
`;

export const AlignRight = styled(Align)`
  justify-content: flex-end;
`;
