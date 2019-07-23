import React from 'react';
import './PlannerPopup.css';
import firebase from 'firebase/app';


class PlannerPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainRecipes: [],
            sideRecipes: [],
            dessertRecipes: [],
            otherRecipes: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sortRecipes = this.sortRecipes.bind(this);
        this.addSelectedRecipe = this.addSelectedRecipe.bind(this);
        
    }

    addSelectedRecipe(event) {
        var recipe = event.target.value;

        console.log(recipe);
        
    }

    displayMainRecipes() {
        if (typeof(this.state.mainRecipes) !== 'undefined') {
            return (
                <div>
                    {
                        this.state.mainRecipes.map((name, index) => (
                            <button className="recipe-item-list-button" stuff="yeet" onClick={(event)=>this.addSelectedRecipe(event)} key={index} value={this.state.mainRecipes[index]}> {this.state.mainRecipes[index].name} </button>
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


    handleSubmit(event) {
        if (this.state.value !== '') {
            var database = firebase.database();
            var ref = database.ref('users/' + firebase.auth().currentUser.uid + '/recipes/');
            var recipeData = {
            }
            ref.push(recipeData);
        } else {
            alert('Please enter a name');
        }
        event.preventDefault();
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