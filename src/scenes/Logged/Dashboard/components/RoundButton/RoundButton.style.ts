import styled from "@emotion/styled";
import { colors } from "src/colors";

export const IconContainer = styled.div`
  position: fixed;
  right: 15px;
  bottom: 15px;
  width: 72px;
  height: 72px;
  padding: 17px;
  border-radius: 40px;
  background: ${colors.black};
  @media (max-height: 750px) {
    padding: 15px;
    width: 60px;
    height: 60px;
  }
`;
