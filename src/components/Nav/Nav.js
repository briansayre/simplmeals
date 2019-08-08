import React from 'react';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import firebase from 'firebase/app';
import Popup from "reactjs-popup";
import {modalStyle} from '../Dashboard/Dashboard';

import './Nav.css';
import Landing from '../Landing/Landing';
import Dashboard from '../Dashboard/Dashboard';
import tutorial from '../../images/tutorial.mp4';
require('dotenv').config();


const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "simplmeals.com",
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

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ loggedIn: !!user })
            if (this.state.loggedIn) {
                firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
                    uid: firebase.auth().currentUser.uid,
                    name: firebase.auth().currentUser.displayName,
                    phone: firebase.auth().currentUser.phoneNumber,
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

    signOut() {
        firebase.auth().signOut();
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
                                <img className="nav-user-img" alt="" src={firebase.auth().currentUser.photoURL}/> 
                                <span className="nav-user-name"> {firebase.auth().currentUser.displayName} </span>
                                <button className="sign-out" onClick={this.signOut}>Sign out</button>
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
                        <i><a href="mailto: contact@simplmeals.com" className="email">contact@simplmeals.com</a></i> |&nbsp;
                            <Popup className="modal" contentStyle={modalStyle} trigger={<span className="footer-button">Tutorial</span>} modal>
                            {close => (
                                <div className="modal-content">

                                    <video autoplay="autoplay" alt="Loading..." loop="loop" width="95%" height="100%" src={tutorial} />
                                    <br />
                                    <br />
                                    <button
                                        type="submit"
                                        className="button"
                                        id="modal-button"
                                        onClick={() => {
                                            close();
                                        }}>
                                        Close
                                    </button>
                                </div>
                            )}
                        </Popup>

                        {this.state.loggedIn ? 
                        (
                            <span> | <span className="footer-button" onClick={this.signOut}>Sign Out</span></span>
                        ) : ( 
                            <span></span>
                        )}
                         <br />&copy; Copyright 2019 simplmeals
                        
                    </div>
                </footer>

            </div>

        );
    }
}


export default Nav;