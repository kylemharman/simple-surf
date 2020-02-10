import styled from 'styled-components';

export const MapContainer = styled.div`
    display: flex;
    position: relative;
    border-radius: 50%;
    height: 300px;
    width: 300px;  
`;

export const MapImage = styled.img`
    border-radius: 50%;
    position: relative;
    top: 8.5%;
    left: 10%;
    height: 250px;
    width: 250px;
    z-index: 5;
`;

export const CompassImage = styled.img`
    position: absolute;
    height: 300px;
    width: 300px;
    z-index: 10; 
`;

export const WindArrowPNG = styled.img`
    position: absolute;
    height: 30px;
    width: 30px; 
    transform-origin: center 110px;
    fill: ${(props) => props.theme.color.primary};
    top: 10%;
    left: 46.5%;
    z-index: 15;
    margin: 10px 0;
    transition: 1s ease;
    animation: rotateWindArrow 800ms linear forwards;

    @keyframes rotateWindArrow {
        from { 
            transform: rotate(0deg); 
        } to { 
            transform: ${props => `rotate(${props.windDirection}deg)`}; 
        }
    }
`;

export const SwellArrowPNG = styled.img`
    position: absolute;
    height: 30px;
    width: 30px; 
    transform-origin: center 110px;
    top: 10%;
    left: 46.5%;
    z-index: 15;
    margin: 10px 0;
    animation: rotateSwellArrow 800ms linear forwards;

    @keyframes rotateSwellArrow {
        from { 
            transform: rotate(0deg); 
        } to { 
            transform: ${props => `rotate(${props.swellDirection}deg)`}; 
        }
    }
`;
