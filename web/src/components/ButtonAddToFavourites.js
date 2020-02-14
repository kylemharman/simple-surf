import React from 'react'
import ReactTooltip from 'react-tooltip'
import { toast } from 'react-toastify';
// styles
import { StyledSVG } from '../styles/ButtonAddToFavouritesStyled';


const ButtonAddToFavourites = (props) => {
    
    const notify = () => toast.info(!props.favourite ? "Added To Favorites" : "Removed From Favorites");
    
    const handleMultipleClickActions = () => {
        props.clicked()
        notify()
    }

    return (
        <React.Fragment>
            <StyledSVG 
                width="35" 
                height="35" 
                viewBox="0 0 35 35" 
                favourite={props.favourite} 
                onClick={() => handleMultipleClickActions()}   
                data-tip={`${!props.favourite ? "Add To Favorites" : "Remove From Favorites" }`}
            >
                <circle className="circle" cx="17.5" cy="17.5" r="17.5" fill="#0424D9"/>
                <rect className="rotateBottom" x="4" y="16" width="27" height="3" rx="1.5" fill="white"/>
                <rect className="rotateTop" x="16" y="4" width="3" height="27" rx="1.5" fill="white"/>
            </StyledSVG>

            <ReactTooltip effect="solid"/>
        </React.Fragment>





    )
}

export default ButtonAddToFavourites
