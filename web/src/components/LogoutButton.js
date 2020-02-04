import React, { useState } from 'react'
import axios from 'axios'
import { navigate } from "@reach/router"


const LogoutButton = (props) => {

    return (
        <React.Fragment>
            <a href="#" onClick={ props.logout }>Logout</a>
        </React.Fragment>
    
    )
}

export default LogoutButton
