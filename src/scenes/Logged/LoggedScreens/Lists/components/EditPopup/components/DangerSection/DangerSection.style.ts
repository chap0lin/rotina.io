import styled from "@emotion/styled";
import { colors } from "src/colors";

const Container = styled.div`
  border-radius: 10px;
  border: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DangerTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.pink};
  padding-left: 5px;
  @media(max-height: 750px){
    font-size: 18px;
  }
`;

export const DangerContainer = styled(Container)`
  border: 1px solid ${colors.pink};
  overflow: hidden;
  padding: 15px 20px;
  gap: 15px;
  transition: opacity 0.5s;
  position: relative;
  @media(max-height: 750px){
    padding: 15px;
  }
`;

export const ButtonSection = styled(Container)`
  flex-direction: row;
  gap: 20px;
  position: relative;
`;

export const Row = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  position: relative;
  z-index: 100;
`;

export const DangerButton = styled.button`
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
  padding: 4px;
  @media (max-height: 740px) {
    width: 27px;
    height: 27px;
  }
`;

export const DangerConfirm = styled.div`
  position: absolute;
  background: ${colors.white};
  width: 100%;
  height: 85px;
  bottom: -85px;
  left: 0;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
`;

export const DangerText = styled.p`
  padding: 1px 5px;
  border-radius: 5px;
  color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 500;
  margin-left: 20px;
  @media(max-height: 750px){
    font-size: 16px;
  }
`;

export const ConfirmButtons = styled.div`
  flex: 0;
  width: 50%;
  display: flex;
  align-items: center;
  margin-right: 20px;
  gap: 5px;
`;