import React from 'react';
import './Recipes.css';
import Popup from "reactjs-popup";
import RecipeForm from '../RecipeForm/RecipeForm';

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
        this.sortRecipes();
        console.log(this.state.mainRecipes);
        
        
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
                            <p key={index}>{name}</p>
                        ))
                    }
                </div>
            );
        } else if (category === 'side') {
            return (
                <div>
                    {
                        this.state.sideRecipes.map((name, index) => (
                            <p key={index}><a href="https://www.google.com" >{name}</a></p>
                        ))
                    }
                </div>
            );
        } else if (category === 'dessert') {
            return (
                <div>
                    {
                        this.state.dessertRecipes.map((name, index) => (
                            <p key={index}>{name}</p>
                        ))
                    }
                </div>
            );
        } else {
            return (
                <div>
                    {
                        this.state.otherRecipes.map((name, index) => (
                            <p key={index}>{name}</p>
                        ))
                    }
                </div>
            );
        }
    }

    sortRecipes() {
        console.log("sorting");
        console.log(this.props.recipes.length);
        for (var i = 0; i < this.props.recipes.length; i++) {
            var category = this.props.recipes[i].category;
            var name = this.props.recipes[i].name;
            console.log(name);
            if (category === 'main') {
                this.setState({ mainRecipes: [...this.state.mainRecipes, name] });
            } else if (category === 'side') {
                this.setState({ sideRecipes: [...this.state.sideRecipes, name] });
            }else if (category === 'dessert') {
                this.setState({ dessertRecipes: [...this.state.dessertRecipes, name] });
            } else {
                this.setState({ otherRecipes: [...this.state.otherRecipes, name] });
            }
        }
    }

    componentWillMount() {
        if (this.props.recipes.length > 0)
            this.sortRecipes();
    }

    componentDidMount() {
        
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