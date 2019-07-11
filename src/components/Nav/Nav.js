import React from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import './Nav.css';
import Planner from '../Planner/Planner';
import List from '../List/List';
import Recipes from '../Recipes/Recipes';
import Landing from '../Landing/Landing';


firebase.initializeApp({
    apiKey: "AIzaSyARbJURIqskPfndvo57b3Ac8xuHdbS8kGo",
    authDomain: "simplmeals-1561736691951.firebaseapp.com"
})

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            loginError: false,
        }
    }

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult : () => false
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
          this.setState({ loggedIn: !!user })
          console.log("user", user)
        })
    }

    render() {

        return (
            <div>
                <div className="nav">

                    <div className="nav-container">

                        <span className="name"><b>simpl</b>meals</span>
                        {this.state.loggedIn ? 
                        (
                        <button className="sign-out" onClick={() => firebase.auth().signOut()}>Sign out</button>
                        ) : ( 
                            <StyledFirebaseAuth
                            className="login"
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                        )}
                        
                    </div>

                </div>
            
                {this.state.loggedIn ? ( 

                    <div className="module-container">
                    
                        <Planner/>
                        <List/>
                        <Recipes />

                    </div> 

                    ) : ( 

                    <Landing /> 

                )}
                <footer>
                    <div className="footer-content">
                        &copy; Brian Sayre 2019
                    </div>
                </footer>
            </div>

        );
    }
}


export default Nav;