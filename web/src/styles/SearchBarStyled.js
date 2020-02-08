import styled from 'styled-components';

export const SearchBarContainer = styled.div`

    display: flex;
    justify-content: center;

    input {
        width: 50%;
        padding-top: 20px;
        color: ${props => props.theme.color.darkGrey};
        font-size: 2rem;
        border: none;
        border-bottom: solid 2px ${props => props.theme.color.lightGrey};

        &:focus {
            outline: none;
            border-bottom: solid 2px ${props => props.theme.color.primary};;
        }
        &::placeholder {
            color: ${props => props.theme.color.lightGrey};
            font-size: 2rem;
        }
    }


`