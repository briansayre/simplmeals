import React from 'react';
import './Nav.css';
import GoogleLogin, { GoogleLogout } from 'react-google-login';


const responseGoogle = (response) => {
    console.log(response);
}

var loginButton;

if (1) {
    loginButton = <GoogleLogin
        className="login"
        clientId="32448678336-3p0c6aaorlp18h4q478t3kfnf3uecuh3.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    />;
} else {
    loginButton = (
    <div>
    <GoogleLogout
        className="login"
        clientId="32448678336-3p0c6aaorlp18h4q478t3kfnf3uecuh3.apps.googleusercontent.com"
        buttonText="Logout"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    />
    </div>);
}


class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    render() {
        return (
        <div className="nav">

            <div className="nav-container">

                <span className="name"><b>simpl</b>meals</span>
                {loginButton}

            </div>

        </div>
        );
    }
}


export default Nav;