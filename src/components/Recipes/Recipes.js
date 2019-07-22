import React from 'react';
import './Recipes.css';
import Popup from "reactjs-popup";
import RecipeForm from '../RecipeForm/RecipeForm';
//import Recipe from '../Recipe/Recipe';

import * as firebase from 'firebase';



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
        this.getRecipes = this.getRecipes.bind(this);
    }

    handleLeftArrowClick() {
        var newIndex = (this.state.categoryIndex - 1);
        if (newIndex === -1) 
            newIndex = 3;
        var newCategory = this.state.categories[newIndex].toLowerCase();
        this.setState({categoryIndex: newIndex});
        this.setState({category: newCategory});
        
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

    getRecipes() {
        var database = firebase.database();
        var ref = database.ref('users/' + firebase.auth().currentUser.uid + '/recipes/');
        ref.on('value', (snapshot) => {
            var objects = snapshot.val();
            if (objects !== null) {
                var keys = Object.keys(objects);
                //console.log(keys);
                
                for (var i = 0; i < keys.length; i++) {
                    var k = keys[i];
                    var name = objects[k].name;
                    var category = objects[k].category;

                    console.log(objects[k]);

                    this.setState(prevState => ({
                        allRecipes: [...prevState.allRecipes, objects[k]]
                    }))

                    if (category === 'main') {
                        this.setState(prevState => ({
                            mainRecipes: [...prevState.mainRecipes, name]
                        }))
                    } else if (category === 'side') {
                        this.setState(prevState => ({
                            sideRecipes: [...prevState.sideRecipes, name]
                        }))
                    } else if (category === 'dessert') {
                        this.setState(prevState => ({
                            dessertRecipes: [...prevState.dessertRecipes, name]
                        }))
                    } else {
                        this.setState(prevState => ({
                            otherRecipes: [...prevState.otherRecipes, name]
                        }))
                    }
                    //console.log(name, category);
                }

            }

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


    componentDidMount() {
        this.getRecipes();
        console.log(this.state.allRecipes);
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