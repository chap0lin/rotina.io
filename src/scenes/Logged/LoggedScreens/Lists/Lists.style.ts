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
  position: absolute;
  width: 100%;
  display: flex;
  gap: 20px;
  overflow-x: scroll;
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
  width: calc(100% - 40px);
`;

export const Title = styled.p` 
  max-width: calc(100% - 20px);
  position: absolute;
  left: 0;
  top: 30px;
  border-radius: 10px;
  color: ${colors.white};
  text-align: left;
  font-size: 32px;
  line-height: 35px;
  padding: 12px 15px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-height: 750px) {
    font-size: 28px;
    line-height: 28px;
  }
`;

export const ItemInput = styled.input`
  position: absolute;
  width: calc(100% - 60px);
  padding: 10px 10px 10px 0;
  background: none;
  top: 110px;
  border: none;
  outline: none;
  border-bottom: 1px solid ${colors.black};
  font-size: 16px;
  @media(max-height: 750px){
    top: 45px;
    font-size: 15px;
  }
`;

export const ListSection = styled.div`
  width: 100%;
  position: relative;
  flex-shrink: 0;
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