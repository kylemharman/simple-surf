import styled from 'styled-components';

export const ForcastListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat( 24, 130px );
    grid-template-rows: auto;
    grid-column-gap: 10px;
    overflow: scroll;
`
export const ForcastHourlyDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    border-radius: 4px;
    border: solid 1px ${props => props.theme.color.lightGrey};
    

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 15px 0;
    }

`
export const ForcastListWaveIcon = styled.img`
      height: 15px;
`
export const ForcastListWindIcon = styled.img`
      height: 15px;
      transform: ${props => `rotate(${props.rotateWind}deg)`};   
`
export const ForcastListSwellIcon = styled.img`
      height: 15px;
      transform: ${props => `rotate(${props.rotateSwell}deg)`};   
`
export const ForcastListP1 = styled.p`
      margin: 7px 0 0 0;

`
export const ForcastListP2 = styled.p`
      font-size: 0.8rem;
      margin: 0px;
      color: #888;

`