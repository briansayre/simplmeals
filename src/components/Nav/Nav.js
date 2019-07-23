import React from 'react';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

import './Nav.css';
import Landing from '../Landing/Landing';
import Dashboard from '../Dashboard/Dashboard';
require('dotenv').config();


const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "simplmeals-1561736691951.firebaseapp.com",
    databaseURL: "https://simplmeals-1561736691951.firebaseio.com",
    projectId: "simplmeals-1561736691951",
    storageBucket: "simplmeals-1561736691951.appspot.com",
    messagingSenderId: "32448678336",
    appId: "1:32448678336:web:2d304ccc82e8b6ed"
}


firebase.initializeApp(config);


class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
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
            if (this.state.loggedIn) {
                firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
                    uid: firebase.auth().currentUser.uid,
                    name: firebase.auth().currentUser.displayName,
                    email: firebase.auth().currentUser.email,
                    photoUrl: firebase.auth().currentUser.photoURL,
                }, function(error) {
                if (error) {
                    // The write failed...
                    //console.log('failed');
                } else {
                    // Data saved successfully!
                    //console.log('saved');
                }
                });    
                //this.getRecipes();
            }
        })
    }

    render() {

        return (
            <div>
                <div className="nav">

                    <div className="nav-container">

                        <div className="name"><b>simpl</b>meals</div>
                        {this.state.loggedIn ? 
                        (
                            <div className="right-side">
                                <img className="nav-user-img" src={firebase.auth().currentUser.photoURL}/> 
                                <span className="nav-user-name"> {firebase.auth().currentUser.displayName} </span>
                                <button className="sign-out" onClick={() => firebase.auth().signOut()}>Sign out</button>
                            </div>

                        ) : ( 
                            <StyledFirebaseAuth
                            className="login"
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}/>
                        )}
                        
                    </div>

                </div>
            
                {!this.state.loggedIn ? ( <Landing /> ) : ( <Dashboard /> ) }

                <footer>
                    <div className="footer-content">
                        simplmeals created by Brian Sayre
                    </div>
                </footer>

            </div>
        );
    }
}


export default Nav;