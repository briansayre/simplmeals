import React from 'react';
import './Nav.css';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import {PostData} from '../../services/PostData';

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginError: false,
            redirect: false
        }
        this.signUp = this.signUp.bind(this);
    }

    signUp(res, type) {

        let postData;

        if (type === 'google' && res.w3.U3) {
            postData = {
                name: res.w3.ig,
                provider: type,
                email: res.w3.U3,
                provider_id: res.El,
                token: res.Zi.access_token,
                provider_pic: res.w3.Paa
            };
            console.log(postData.provider_pic);
        }

        if (postData) {
            PostData('signup', postData).then((result) => {
               let responseJson = result;
               sessionStorage.setItem("userData", JSON.stringify(responseJson));
               this.setState({redirect: true});
            });
        }
    }

    render() {

        if (this.state.redirect || sessionStorage.getItem('userData')) {
        }

        const responseGoogle = (response) => {
            //console.log(response);
            this.signUp(response, 'google')
        }

        return (
        <div className="nav">

            <div className="nav-container">

                <span className="name"><b>simpl</b>meals</span>
                <GoogleLogin
                    className="login"
                    clientId="32448678336-3p0c6aaorlp18h4q478t3kfnf3uecuh3.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>

        </div>
        );
    }
}


export default Nav;