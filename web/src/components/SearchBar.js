import React from 'react'

// styles
import { SearchBarContainer } from '../styles/SearchBarStyled';


const SearchBar = () => {
    return (
        <SearchBarContainer>
            <input type="text" placeholder="Search Locations"/>
        </SearchBarContainer>
    )
}

export default SearchBar
