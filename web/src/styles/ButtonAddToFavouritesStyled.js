import styled from 'styled-components';

export const StyledSVG = styled.svg`

    cursor: pointer;

    & .circle {
        /* fill: red;  */
        fill: ${(props) => ( props.favourite ? "red" : "#0ABF04" )}; 
    }

    & .rotateTop {
        /* transform: rotate(90 19 4); */
        transition: 0.3s ease-in-out;
        transform: ${(props) => (props.favourite ? "translateX(35px) rotate(90deg)" : "rotate(0deg)" )}; 
        
    }
    & .rotateBottom {
        /* transform: rotate(90 19 4); */
        transition: 0.3s ease-in-out;
        transform: ${(props) => (props.favourite ? "translateX(35px)" : "rotate(0deg)" )}; 
        
    }
`