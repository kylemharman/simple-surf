import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-wrap: ${(props) => (props.wrap ? "wrap" : null)}; 
    flex-direction: ${(props) => (props.col ? "column" : null)}; 
    align-items: ${(props) => (props.center ? "center" : "left")};
    justify-content: ${(props) => (props.justify ? "center" : null)};
    margin: ${(props) => (props.margin ? "20px 50px" : null)};
    background-image: ${(props) => (props.img ? `url('https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')` : null)};
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    height: ${(props) => (props.vh ? "calc(100vh - 55px)" : null)};
`;


export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    margin-top: 70px;
    padding: 30px 30px 10px 30px;
    border-radius: 6px;

    
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