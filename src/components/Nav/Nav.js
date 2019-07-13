import React from 'react';
import * as firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import './Nav.css';
import Planner from '../Planner/Planner';
import List from '../List/List';
import Recipes from '../Recipes/Recipes';
import Landing from '../Landing/Landing';


const config = {
    apiKey: "AIzaSyARbJURIqskPfndvo57b3Ac8xuHdbS8kGo",
    authDomain: "simplmeals-1561736691951.firebaseapp.com",
    databaseURL: "https://simplmeals-1561736691951.firebaseio.com",
    projectId: "simplmeals-1561736691951",
    storageBucket: "simplmeals-1561736691951.appspot.com",
    messagingSenderId: "32448678336",
    appId: "1:32448678336:web:2d304ccc82e8b6ed"
}

firebase.initializeApp(config);
console.log(firebase)



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

    addUser() {
        var database = firebase.database();
        var ref = database.ref('users');
        var userData = {
            uid: firebase.auth().currentUser.uid,
            name: firebase.auth().currentUser.displayName,
            email: firebase.auth().currentUser.email,
            photoUrl: firebase.auth().currentUser.photoURL
        }
        ref.push(userData);
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
                        <button onClick={this.addUser}> Add me </button>

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