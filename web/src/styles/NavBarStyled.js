import styled from 'styled-components';

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 50px;

    a {
        margin-right: 30px;

        &:last-child {
            margin-right: 0;
        }
    }
`;