import styled from "@emotion/styled";

const Text = styled.p`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
`;

export const Container = styled.div`
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    width: 85%;
    height: 140px;
    padding: 10px;
    scroll-snap-align: start;
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
        padding: 5px;
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

export const WhatAndWho = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
    @media(max-height: 750px){
        gap: 2px;
    }
`;

export const What = styled(Text)`
    font-size: 18px;
    font-weight: 500;
    @media(max-height: 750px){
        font-size: 16px;
    }
`;

export const Who = styled(Text)`
    font-size: 16px;
    font-weight: 400;
    @media(max-height: 750px){
        font-size: 15px;
    }
`;

export const WhenAndWhere = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    @media(max-height: 750px){
        height: 32px;
    }
`;

export const When = styled(Text)`
    width: auto;
    font-size: 16px;
    font-weight: 600;
    @media(max-height: 750px){
        font-size: 15px;
    }
`;

export const Where = styled(Text)`
    width: auto;
    font-size: 16px;
    font-weight: 400;
    @media(max-height: 750px){
        font-size: 15px;
    }
`;