import styled from 'styled-components';
import HeroPhoto from '../assets/hero.jpg'


export const HeroContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "overlap";
    height: 80vh;
    margin-bottom: 80px;
`;


export const HeroImage = styled.div`

    justify-self: right;
    grid-area: overlap;
    width: 80%;
    background-image: url(${HeroPhoto});
    background-position: center; 
    background-repeat: no-repeat;
    background-size: cover;
`;

export const HeroText = styled.div`
    grid-area: overlap;
    align-self: center;
    background-color: #fff;
    width: 40%;
    z-index: 1;
    height: 50%;

    div {
        margin: 50px;
    }
`;

export const HeadingOne = styled.h1`

    margin: 0px;
    font-size: 3rem;
    color: ${(props) => props.theme.color.primary };

`


