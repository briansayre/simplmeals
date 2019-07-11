import React from 'react';
import './Nav.css';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import {PostData} from '../../services/PostData';

import Planner from '../Planner/Planner';
import List from '../List/List';
import Recipes from '../Recipes/Recipes';
import Landing from '../Landing/Landing';


var dashboard = (
    <div className="module-container">
  
      <Planner/>
      <List/>
      <Recipes />
      
    </div>
  );

  var signedIn = 0;

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginError: false,
            redirect: false,
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
               var signedIn = 1;
            });
        }
    }

    render() {

        if (this.state.redirect || sessionStorage.getItem('userData')) {
        }

        const responseGoogle = (response) => {
            //console.log(response);
            signedIn = 1;
            this.signUp(response, 'google')
        }

        return (
            <div>
                <div className="nav">

                    <div className="nav-container">

                        <span className="name"><b>simpl</b>meals</span>
                        {signedIn ? 
                        ( <GoogleLogout 
                            className="login"
                            clientId="32448678336-dkkqbf1rfahp6qa8jok1lj67hdckq3c9.apps.googleusercontent.com"
                            buttonText="Logout"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}/> ) : 
                        ( <GoogleLogin
                            className="login"
                            clientId="32448678336-dkkqbf1rfahp6qa8jok1lj67hdckq3c9.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />)}

                        
                    </div>

                </div>
            
                {signedIn ? ( dashboard ) : ( <Landing /> )}

            </div>

        );
    }
}


export default Nav;