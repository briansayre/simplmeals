import React from 'react';
import './Recipes.css';
import Popup from "reactjs-popup";
import RecipeForm from '../RecipeForm/RecipeForm';
import RecipeListItem from '../RecipeListItem/RecipeListItem';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/functions';



class Recipes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           categories: ['Main', 'Side', 'Dessert', 'Other'],
           categoryIndex: 0,
           category: 'main',
           allRecipes: [],
           mainRecipes: [],
           sideRecipes: [],
           dessertRecipes: [],
           otherRecipes: [],
        }
        
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
        this.sortRecipes = this.sortRecipes.bind(this);
    }

    handleLeftArrowClick() {
        var newIndex = (this.state.categoryIndex - 1);
        if (newIndex === -1) 
            newIndex = 3;
        var newCategory = this.state.categories[newIndex].toLowerCase();
        this.setState({
            categoryIndex: newIndex,
            category: newCategory,
        });
    }

    handleRightArrowClick() {
        var newIndex = (this.state.categoryIndex + 1);
        if (newIndex === 4) 
            newIndex = 0;
        var newCategory = this.state.categories[newIndex].toLowerCase();
        this.setState({
            categoryIndex: newIndex,
            category: newCategory,
        });

    }

    
    displayRecipes() {
        var category = this.state.category.toLowerCase();
        if (category === 'main') {
            return (
                <div>
                    {
                        this.state.mainRecipes.map((name, index) => (
                            < RecipeListItem key={index} recipe={this.state.mainRecipes[index]} />
                        ))
                    }
                </div>
            );
        } else if (category === 'side') {
            return (
                <div>
                    {
                        this.state.sideRecipes.map((name, index) => (
                            < RecipeListItem key={index} recipe={this.state.sideRecipes[index]} />
                        ))
                    }
                </div>
            );
        } else if (category === 'dessert') {
            return (
                <div>
                    {
                        this.state.dessertRecipes.map((name, index) => (
                            < RecipeListItem key={index} recipe={this.state.dessertRecipes[index]} />
                        ))
                    }
                </div>
            );
        } else {
            return (
                <div>
                    {
                        this.state.otherRecipes.map((name, index) => (
                            < RecipeListItem key={index} recipe={this.state.otherRecipes[index]} />
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

    render() {
        return (
        <div className="module" id="recipes">

            <div className="module-title">
                Recipes
            </div>

            <div className="module-title-secondary">
                <button className="arrow" id = "cycle-left" onClick={this.handleLeftArrowClick}> &lt; </button>
                {this.state.categories[this.state.categoryIndex]}s 
                <button className="arrow" id = "cycle-right" onClick={this.handleRightArrowClick}> &gt; </button>
                
                <Popup className="popup" trigger={<button className="button" id = "add-button"> + </button>} modal>
                    {close => (
                        <div className="modal">

                            <RecipeForm className="form" />

                            <button
                                className="button"
                                id="modal-button"
                                onClick={() => {
                                close();
                                }}
                            >
                                Close
                            </button>
                        </div>

                    )}
                </Popup>

            </div>

            <div className="module-content">
            
                {this.displayRecipes()}

            </div>
            
        </div>

        );
    }
}


export default Recipes;