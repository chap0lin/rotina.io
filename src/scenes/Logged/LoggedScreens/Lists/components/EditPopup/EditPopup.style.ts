import styled from "@emotion/styled";
import { colors } from "src/colors";

export const Container = styled.div`
  border-radius: 10px;
  border: 1px solid ${colors.lightGrey};
  border: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
`;

export const Title = styled.p`
  font-family: Motley;
  text-transform: uppercase;
  font-size: 24px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

export const Text = styled.p`
  padding: 1px 5px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 700;
  color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  @media(max-height: 750px){
    font-size: 16px;
  }
`;

export const Options = styled.div` 
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

export const Input = styled.input`
  width: 100%;
  background: none;
  outline: none;
  border: none;
  border-radius: 10px;
  text-align: right;
  font-size: 18px;
  text-overflow: ellipsis;
  @media(max-height: 750px){
    font-size: 16px7
  }
`;

export const Option = styled.button`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  outline: none;
  border: none;
  background: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-height: 740px) {
    width: 27px;
    height: 27px;
  }
`;

export const InputButton = styled(Option)`
  border: 1px solid ${colors.black};
`;