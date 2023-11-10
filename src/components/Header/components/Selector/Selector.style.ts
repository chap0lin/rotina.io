import { colors } from "src/colors";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  right: 0;
  border-radius: 10px 0 10px 10px;
  background: ${colors.black};
  padding: 10px;
  cursor: default;
  z-index: 100;
`;

export const Option = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Icon = styled.img`
    width: 20px;
    height: 20px;
    object-fit: cover;
`;

export const Text = styled.p`
    font-size: 15px;
    font-weight: 400;
    color: ${colors.white};
    margin: 0;
    padding: 0;
    white-space: nowrap;
    cursor: pointer;
    :hover{
        color: ${colors.lightBlue};
    }
`;