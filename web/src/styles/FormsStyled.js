import styled from 'styled-components';

export const FormContainer = styled.div `
    display: flex;
    flex-direction: column;
    width: 400px;
    

    input {
        padding-top: 20px;
        color: ${props => props.theme.color.darkGrey};
        font-size: ${props => props.theme.fontSize.md};
        border: none;
        border-bottom: solid 2px ${props => props.theme.color.lightGrey};
        background-color: rgba(255, 255, 255, 0.0);
        
        &:focus {
            outline: none;
            border-bottom: solid 2px ${props => props.theme.color.primary};
        }
        &::placeholder {
            color: ${props => props.theme.color.primary};
            font-size: ${props => props.theme.fontSize.md};
        }
    }

    button {
        margin: 30px 0;
        padding: 10px;
        background-color: ${props => props.theme.color.primary};
        color: white;
        cursor: pointer;
        border: none;
        font-weight: 700;
        font-size: ${props => props.theme.fontSize.sm};
        transition: .5s ease;
        border-radius: 30px;

        &:hover {
            background-color: ${props => props.theme.color.secondary};
        }
    }

`