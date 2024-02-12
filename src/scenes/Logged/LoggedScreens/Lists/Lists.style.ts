import styled from "@emotion/styled";
import { colors } from "src/colors";

const FlexColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  flex-shrink: 0;
  width: 100%;
  color: ${colors.black};
`;

export const MainContent = styled(FlexColumn)`
  position: relative;
  height: 100%;
  padding: 40px;
  justify-content: space-between;
  @media(max-height: 750px){
    padding: 20px 40px 30px 40px;
  }
`;

export const Section = styled(FlexColumn)`
  position: relative;
`;

export const Title = styled(Text)`
  position: absolute;
  text-align: left;
  font-size: 35px;
  height: 40px;
  font-weight: 400;
  white-space: nowrap;
  @media (max-height: 750px) {
    font-size: 28px;
    height: 35px;
  }
`;

export const ItemInput = styled.input`
  position: absolute;
  width: 100%;
  padding: 10px 10px 10px 0;
  background: none;
  top: 50px;
  border: none;
  outline: none;
  border-bottom: 1px solid ${colors.black};
  font-size: 16px;
  @media(max-height: 750px){
    top: 45px;
    font-size: 15px;
  }
`;

export const ListSection = styled(FlexColumn)`
  position: absolute;
  top: 120px;
  gap: 15px;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media(max-height: 750px){
    top: 108px;
  }
`;

export const PlaceholderContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  gap: 20px;
  @media(max-height: 750px){
    margin-top: 50px;
    gap: 18px;
  }
`;

export const PlaceholderImage = styled.img`
  width: 200px;
  object-fit: scale-down;
  flex: 0;
  opacity: 0.5;
  @media(max-height: 750px){
    width: 180px;
  }
`;

export const PlaceholderText = styled.p`
  font-size: 15px;
  line-height: 17px;
  font-weight: 400;
  text-align: center;
  color: ${colors.lightGrey};
  @media(max-height: 750px){
    font-size: 14px;
  }
`;