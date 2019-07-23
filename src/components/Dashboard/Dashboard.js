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
                //console.log(keys);
                for (var i = 0; i < keys.length; i++) {
                    var k = keys[i];
                    //var name = objects[k].name;
                    //var category = objects[k].category;

                    //console.log('Food Object', objects[k]);
                    recipes.push(objects[k]);
                    //this.setState({ allRecipes: [...this.state.allRecipes, objects[k]] });
                    

                    /*
                    if (category === 'main') {
                        this.setState({ mainRecipes: [...this.state.mainRecipes, name] });
                    } else if (category === 'side') {
                        this.setState({ sideRecipes: [...this.state.sideRecipes, name] });
                    } else if (category === 'dessert') {
                        this.setState({ dessertRecipes: [...this.state.dessertRecipes, name] });
                    } else {
                        this.setState({ otherRecipes: [...this.state.otherRecipes, name] });
                    }
                    */

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

                        <Planner/>
                        <List/>
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