import React from 'react';
import { HeroImage, HeroText, HeroContainer, HeadingOne } from '../styles/HomeStyled';
import { Container } from '../styles/GlobalStyles';
import appImage from '../assets/app-snap-shot.png'
import appFav from '../assets/app-fav.png'

const Landing = (props) => {
    
    return (
        <React.Fragment>

            <HeroContainer>
                <HeroText>
                    <div>
                        <HeadingOne>Surf Forecasts, Simplified.</HeadingOne>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                    </div>
                </HeroText>
                <HeroImage />
            </HeroContainer>
            
            <Container margin center>
                <Container margin col>
                    <HeadingOne>Find The Best </HeadingOne>
                    <HeadingOne>Time To Surf</HeadingOne>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </Container>
                <Container margin>
                    <img alt="app preview" src={appImage} style={{height: "500px"}}/>
                </Container>
            </Container>

            <Container margin center vh>
               
                <Container margin>
                    <img alt="app preview favourite spots" src={appFav} style={{height: "300px"}}/>
                </Container>
                <Container margin col>
                    <HeadingOne>Save Your Favourite Spots</HeadingOne>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </Container>
            </Container>

        </React.Fragment>
    )
}

export default Landing


