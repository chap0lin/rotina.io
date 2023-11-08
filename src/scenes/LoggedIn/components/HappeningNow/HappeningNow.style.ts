import styled from "@emotion/styled";

export const Section = styled.div`
    flex: 1;
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    ::-webkit-scrollbar {
        display: none;
    }
`;