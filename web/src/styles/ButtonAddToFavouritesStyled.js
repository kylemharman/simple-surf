import styled from 'styled-components';

export const StyledSVG = styled.svg`

    & .circle {
        /* fill: red;  */
        fill: ${(props) => ( props.saved ? "red" : "#0424D9" )}; 
    }

    & .rotateTop {
        /* transform: rotate(90 19 4); */
        transition: 0.3s ease-in-out;
        transform: ${(props) => (props.saved ? "translateX(35px) rotate(90deg)" : "rotate(0deg)" )}; 
        
    }
    & .rotateBottom {
        /* transform: rotate(90 19 4); */
        transition: 0.3s ease-in-out;
        transform: ${(props) => (props.saved ? "translateX(35px)" : "rotate(0deg)" )}; 
        
    }

    
     
`