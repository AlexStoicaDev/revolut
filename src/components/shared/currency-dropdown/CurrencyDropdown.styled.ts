import styled from 'styled-components';

export const DropDownContainer = styled.div`
    width: 100px;
`;

export const DropDownHeader = styled.div`
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.main};
    text-align: left;

    & > * {
        vertical-align: middle;
    }
    & > svg {
        margin-top: 4px;
    }
`;

export const DropDownListContainer = styled.div`
    position: absolute;
    text-align: left;
    width: 100px;
`;

export const DropDownList = styled.ul`
    padding: 0 0 0 12px;
    margin: 10px 0 0 0;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 2px 2px 4px rgb(228, 228, 228);
    border-radius: 10px;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.grey};
    font-size: 20px;
    font-weight: 500;
    &:first-child {
        padding-top: 12px;
    }
`;

export const ListItem = styled.li`
    list-style: none;
    margin-bottom: 12px;
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colors.main};
    }
`;
