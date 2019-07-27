import React from 'react';
import './PlannerPopup.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

class PlannerPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainRecipes: [],
            sideRecipes: [],
            dessertRecipes: [],
            otherRecipes: [],
        }
        this.sortRecipes = this.sortRecipes.bind(this);
        this.addSelectedRecipe = this.addSelectedRecipe.bind(this);
        this.displayMainRecipes = this.displayMainRecipes.bind(this);
    }

    addSelectedRecipe(event) {
        console.log("Adding");
        var recipe = event.target.value;

        // get name and instructions
        var name = '';
        var instructions = '';
        var stillName = true;
        for (var i = 0; i < recipe.length; i++) {
            if (recipe[i] === ',') {
                stillName = false;
                i++;
            }
            if (stillName) {
                name += recipe[i];
            } else {
                instructions += recipe[i];
            }
        }

        // find that recipe in database
        var database = firebase.database();
        var ref = database.ref('users/' + firebase.auth().currentUser.uid + '/recipes/');

        var key = '';
        var databaseName = '';
        var databaseInstructions = '';
        var databaseDates = [];
        var databaseMeals = [];

        ref.on('value', ((snapshot) => {
            var objects = snapshot.val();
            if (objects !== null) {
                var keys = Object.keys(objects);
                for (var i = 0; i < keys.length; i++) {
                    var k = keys[i];
                    databaseName = objects[k].name;
                    databaseInstructions = objects[k].instructions;
                    databaseDates = objects[k].dates;
                    databaseMeals = objects[k].meals;
                    if ((name === databaseName) && (instructions === databaseInstructions || databaseInstructions === '')) {
                        key = k;
                        //console.log(k);
                        //console.log(name);
                        //console.log('found it');
                        break;
                    }
                }
            }
            
        }));

        //add the date to the recipe in database
        var currentDate = [this.props.date];
        var currentMeal = [this.props.meal];
        if (databaseDates) {
            var newDates = databaseDates.concat(currentDate);
            var newMeals = databaseMeals.concat(currentMeal);
            database.ref('users/' + firebase.auth().currentUser.uid + '/recipes/' + key + '/').update({ dates: newDates,  meals: newMeals });
        } else {
            database.ref('users/' + firebase.auth().currentUser.uid + '/recipes/' + key + '/').update({ dates: currentDate,  meals: currentMeal });
        }
        
    }

    displayMainRecipes() {
        //console.log(this.state.mainRecipes);
        if (typeof(this.state.mainRecipes) !== 'undefined') {
            return (
                <div>
                    {
                        this.state.mainRecipes.map((name, index) => (
                            <button className="recipe-item-list-button" 
                                onClick={(event)=>this.addSelectedRecipe(event)} 
                                key={index} 
                                value={[(this.state.mainRecipes[index].name), (this.state.mainRecipes[index].instructions)]}> 
                                {this.state.mainRecipes[index].name} 
                            </button>
                        ))
                    }
                </div>
            );
        }
    }

    displaySideRecipes() {
        if (typeof(this.state.sideRecipes) !== 'undefined') {
            return (
                <div>
                    {
                        this.state.sideRecipes.map((name, index) => (
                            <button className="recipe-item-list-button" onClick={(event)=>this.addSelectedRecipe(event)} key={index}> {this.state.sideRecipes[index].name} </button>
                        ))
                    }
                </div>
            );
        }
    }

    displayDessertRecipes() {
        if (typeof(this.state.dessertRecipes) !== 'undefined') {
            return (
                <div>
                    {
                        this.state.dessertRecipes.map((name, index) => (
                            <button className="recipe-item-list-button" onClick={(event)=>this.addSelectedRecipe(event)} key={index}> {this.state.dessertRecipes[index].name} </button>
                        ))
                    }
                </div>
            );        
        }
        
    }

    displayOtherRecipes() {
        if (typeof(this.state.otherRecipes) !== 'undefined') {
            return (
                <div>
                    {
                        this.state.otherRecipes.map((name, index) => (
                            <button className="recipe-item-list-button" onClick={(event)=>this.addSelectedRecipe(event)} key={index}>  {this.state.otherRecipes[index].name} </button>
                        ))
                    }
                </div>
            );
        }
    }

    sortRecipes() {
        console.log("SORTING");
        var main = [];
        var side = [];
        var dessert = [];
        var other = [];
        for (var i = 0; i < this.props.recipes.length; i++) {
            var category = this.props.recipes[i].category;
            var recipe = this.props.recipes[i];
            if (category === 'main') {
                main.push(recipe);
            } else if (category === 'side') {
                side.push(recipe);
            }else if (category === 'dessert') {
                dessert.push(recipe);
            } else {
                other.push(recipe);
            }
        }
        this.setState({ 
            mainRecipes: main,
            sideRecipes: side,
            dessertRecipes: dessert,
            otherRecipes: other,
         });
         
    }

    componentWillMount() {
        this.sortRecipes();
    }

    render() {
        
        return (
            <div className="planner-popup">
                
                <h3> Select a recipe for {this.props.meal} on {this.props.date.toDateString()}:</h3>

                <div className="planner-recipe-display">


                    <div className="planner-popup-section">
                        <h4> Mains </h4>
                        <div className="planner-popup-recipe-list">
                            {this.displayMainRecipes()}
                        </div>
                    </div>
                    
                    <div className="planner-popup-section"> 
                        <h4> Sides </h4>
                        <div className="planner-popup-recipe-list">
                            {this.displaySideRecipes()}
                        </div>
                    </div>
                    
                    <div className="planner-popup-section"> 
                        <h4> Desserts </h4>
                        <div className="planner-popup-recipe-list">
                            {this.displayDessertRecipes()}
                        </div>
                    </div>
                    
                    <div className="planner-popup-section"> 
                        <h4> Others </h4>
                        <div className="planner-popup-recipe-list">
                            {this.displayOtherRecipes()}
                        </div>
                    </div>
                </div>
            </div>

            
            
        );

    }

}

export default  PlannerPopup;