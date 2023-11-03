import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    width: 90%;
    height: 140px;
    padding: 5px 10px;
    @media(max-height: 750px){
        height: 110px;
    }
`;

export const Placeholder = styled(Container)`
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    gap: 10px;
    @media(max-height: 750px){
        padding: 10px;
        gap: 5px;
    }
`;

export const PlaceText = styled.p`
    text-align: center;
    font-size: 16px;
    @media(max-height: 750px){
        font-size: 15px;
    }
`;