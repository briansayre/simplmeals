import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

import './Dashboard.css';
import Planner from '../Planner/Planner';
import List from '../List/List';
import Recipes from '../Recipes/Recipes';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allRecipes: [],
            loaded: false,
        };
        
        this.getRecipes = this.getRecipes.bind(this);
    }

    componentDidMount() {
        this.getRecipes();
    }

    getRecipes() {
        var database = firebase.database();
        var ref = database.ref('users/' + firebase.auth().currentUser.uid + '/recipes/');
        var recipes = [];
        ref.on('value', ((snapshot) => {
            var objects = snapshot.val();
            if (objects !== null) {
                var keys = Object.keys(objects);
                for (var i = 0; i < keys.length; i++) {
                    var k = keys[i];
                    //var name = objects[k].name;
                    //var category = objects[k].category;
                    recipes.push(objects[k]);
                    //this.setState({ allRecipes: [...this.state.allRecipes, objects[k]] });

                }

            }
            this.setState({ 
                allRecipes: recipes,
                loaded: true,
             });
        }));
    }

    render() {     
        
        return (

            <div>

                {this.state.loaded ? (
                    
                    <div className="module-container"> 

                        <Planner  recipes={this.state.allRecipes} />
                        <List />
                        <Recipes recipes={this.state.allRecipes} />

                    </div> 

                ) : (

                    <div className="loading">

                        <h1 > Loading... </h1>

                    </div>
                
                )}

            </div>

        )
    }

    
}

export default Dashboard;