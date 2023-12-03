import styled from "@emotion/styled";

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Container = styled(FlexColumn)`
    width: 100%;
    padding: 20px 0;
    gap: 20px;
`;

export const Buttons = styled.div`
    width: 85%;
    display: flex;
    justify-content: center;
    gap: 20px;
`;