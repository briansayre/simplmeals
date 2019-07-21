import React from 'react';
import './Recipes.css';
import Popup from "reactjs-popup";
import RecipeForm from '../RecipeForm/RecipeForm';
import Recipe from '../Recipe/Recipe';

import * as firebase from 'firebase';



class Recipes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           categories: ['Main', 'Side', 'Dessert', 'Other'],
           categoryIndex: 0,
        }
        
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
        this.gotData = this.gotData.bind(this);
        this.errData = this.errData.bind(this);
    }

    handleLeftArrowClick() {
        var newIndex = (this.state.categoryIndex - 1);
        if (newIndex === -1) 
            newIndex = 3;
        this.setState({categoryIndex: newIndex});
        this.setState({category: (this.state.categories[newIndex]).toLowerCase()});
    }

    handleRightArrowClick() {
        var newIndex = (this.state.categoryIndex + 1);
        if (newIndex === 4) 
            newIndex = 0;
        this.setState({categoryIndex: newIndex});
    }

    getRecipes() {
        var database = firebase.database();
        var ref = database.ref('users/' + firebase.auth().currentUser.uid + '/recipes/');
        ref.on('value', (snapshot) => {
            let recipes = snapshot.val();
            console.log(recipes);
        });

    }

    gotData(data) {
        console.log(data.val());
    }

    errData(err) {
        console.log('Error:');
        console.log(err);
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
            <button onClick={this.getRecipes}> Recipes </button>
                < Recipe />
            </div>
            
            
        </div>
        );
    }
}


export default Recipes;