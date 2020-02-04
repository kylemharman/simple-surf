import react from 'react'
import axios from 'axios'


const LogoutButton = () => {
    
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    
    const handleLogoutAllSessions = () => {

        axios.post('/logout', null, {
            headers : {
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then( res => {
                console.log(res)
            })
            .catch( e => {
                console.log(e);
            });
        
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userToken');
    
    }
    
    return (
        <React.Fragment>
            <a href="#" onClick={ () => handleLogoutAllSessions() }>Logout On All Devices</a>
        </React.Fragment>
    
    )
}

export default LogoutButton
