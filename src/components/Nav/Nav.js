import React from 'react';
import './Nav.css';
import GoogleLogin from 'react-google-login';


const responseGoogle = (response) => {
    console.log(response);
}

const loginButton = (<GoogleLogin
    className="log-in"
    clientId="32448678336-3p0c6aaorlp18h4q478t3kfnf3uecuh3.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
/>);

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    

    render() {
        return (
        <div className="bar">

            <span className="name"><b>simpl</b>meals</span>
            {loginButton}
            
        </div>
        );
    }
}


export default Nav;