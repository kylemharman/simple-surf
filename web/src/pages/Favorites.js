import React from 'react'

const MySpots = (props) => {
    
    console.log(props)

    return (
        <div>
            <h1>{`${props.user.name} locations`}</h1>
        </div>
    )
}

export default MySpots
