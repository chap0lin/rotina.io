import styled from "@emotion/styled";
import { colors } from "src/colors";

const Full = styled.div`
  width: 100%;
  height: 100%;
`;

const FlexColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled(FlexColumn)`
  position: relative;
  height: 100%;
  align-items: center;
`;

export const Carousel = styled.div`
  width: 100%;
  display: flex;
  gap: 15%;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CarouselEdge = styled.div`
  width: 20px;
  height: 100%;
  flex-shrink: 0;
  @media(max-height: 750px){
      width: 32px;
  }
`;

export const ListContainer = styled(Full)`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  scroll-snap-align: center;
  width: 85%;
`;

export const ListSection = styled.div`
  width: 100%;
  height: 100%;
`;

export const TitleSection = styled.div`
  margin-top: 5%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
`;

export const Title = styled.p`
  text-align: left;
  border-radius: 10px;
  color: ${colors.white};
  font-size: 28px;
  line-height: 35px;
  padding: 10px 15px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: background 0.25s;
  @media (max-height: 750px) {
    font-size: 24px;
    line-height: 28px;
  }
`;

export const Icon = styled.div`
  flex-shrink: 0;
  width: 10px;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  @media(max-height: 750px){
    width: 35px;
    height: 35px;
  }
`;

export const ItemInput = styled.input`
  position: absolute;
  width: 83%;
  padding: 10px 10px 10px 0;
  background: none;
  top: 12%;
  border: none;
  outline: none;
  border-bottom: 1px solid ${colors.black};
  font-size: 16px;
  @media(max-height: 750px){
    top: 75px;
    font-size: 15px;
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

