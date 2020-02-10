import styled from 'styled-components';

export const ForcastInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;

    h5 {
        color: ${(props) => props.theme.color.darkGrey};
        font-size: ${(props) => props.theme.fontSize.lg };
        font-weight: 300;
        margin: 0px;
    }
    p {
        margin: 0;
    }

`
export const ForcastInfoIcon = styled.img`
      height: 30px;
      transform: ${props => `rotate(${props.rotate}deg)`};   
`
