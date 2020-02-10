import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-wrap: ${(props) => (props.wrap ? "wrap" : null)}; 
    flex-direction: ${(props) => (props.col ? "column" : null)}; 
    align-items: ${(props) => (props.center ? "center" : "left")};
    justify-content: ${(props) => (props.justify ? "center" : null)};
    margin: ${(props) => (props.margin ? "20px 50px" : null)};
`;

export const BackgroundOverlay = styled.div `
    display: flex;
    background-color: ${(props) => props.theme.color.lightGrey };
    height: 100vh;
`

export const H1 = styled.h1`
    font-size: ${(props) => props.theme.fontSize.lg };
    margin: 10px 20px 10px 0; 
`;

export const H2 = styled.h2`
    font-size: ${(props) => props.theme.fontSize.md }; 
    margin: 10px 20px 10px 0;
`;