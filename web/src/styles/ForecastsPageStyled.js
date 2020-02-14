import styled from 'styled-components';
import { Link } from "@reach/router";

export const LocationLink = styled(Link)`

    font-weight: 700;
    transition: 0.3s ease-in;
    margin: 5px 0;
    &:hover {
        color: ${(props) => props.theme.color.primary };
    }
`

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;


`
export const MapContainer = styled.div`
    margin: 0 0 0 50px;
    width: 100%;
    height: 90vh;

`
export const MapViewButton = styled.h2`
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSize.md }; 
    margin: 10px 20px 10px 0;
    color: ${(props) => ( !props.active ? props.theme.color.lightGrey : props.theme.color.primary )}; 
    transition: 0.3s ease-in;
`