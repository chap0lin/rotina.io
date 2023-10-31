import { colors } from "../../../../colors";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  botttom: 0;
  border-radius: 10px 0 10px 10px;
  background: ${colors.black};
  padding: 10px;
  right: 0;
  cursor: default;
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
    text-transform: uppercase;
    cursor: pointer;
    :hover{
        color: ${colors.lightBlue};
    }
`;