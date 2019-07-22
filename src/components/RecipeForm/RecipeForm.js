import React from 'react';
import './RecipeForm.css';
import * as firebase from 'firebase';
import Popup from 'reactjs-popup';




class RecipeForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            instructions: '',
            ingredients: [],
            amounts: [],
            dates: [],
            category: 'main',
            uid: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleInstructionsChange = this.handleInstructionsChange.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
    }
    
    handleNameChange(event) {
        this.setState({value: event.target.value});
    }

    handleInstructionsChange(event) {
        this.setState({instructions: event.target.value});
       
    }

    handleCategoryChange(event) {
        this.setState({category: event.target.value});
    }

    handleIngredientChange(event, index) {
        this.state.ingredients[index] = event.target.value;
        this.setState({ingredients: this.state.ingredients});
    }

    handleAmountChange(event, index) {
        this.state.amounts[index] = event.target.value;
        this.setState({amounts: this.state.amounts});
    }

    addIngredient() {
        this.setState({ingredients: [...this.state.ingredients, ""]});
    }

    removeIngredient(index) {
        this.state.ingredients.splice(index, 1);
        this.setState({ingredients: this.state.ingredients});
    }

    handleSubmit(event) {
        if (this.state.value !== '') {
            var database = firebase.database();
            var ref = database.ref('users/' + firebase.auth().currentUser.uid + '/recipes/');
            var recipeData = {
                name: this.state.value,
                category: this.state.category,
                uid: firebase.auth().currentUser.uid,
                ingredients: this.state.ingredients,
                amounts: this.state.amounts,
                instructions: this.state.instructions,
            }
            ref.push(recipeData);
            Popup.close();
        } else {
            alert('Please enter a name');
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <label>
                    Recipe Name:
                    <br />
                    <input type="text" value={this.state.value} onChange={this.handleNameChange} />
                </label>

                <br /><br />

                <label>
                    Recipe Instuctions:
                    <br />
                    <input type="text" value={this.state.instructions} onChange={this.handleInstructionsChange} />
                </label>

                <br /><br />

                <label>
                    Category:
                    <br />
                    <select onChange={this.handleCategoryChange}>
                        <option defaultValue value="main">Main</option>
                        <option value="side">Side</option>
                        <option value="dessert">Dessert</option>
                        <option value="other">Other</option>
                    </select>
                </label>

                <br /><br />

                <label>
                    Ingredients:
                    { 
                        this.state.ingredients.map((input, index) => {
                            input = [];
                            return (
                                <div key={index} >
                                    <input type="text" placeholder="Ingredient" value={input[0]} onChange={(event)=>this.handleIngredientChange(event, index)}/>
                                    <input type="text" placeholder="Amount" value={input[1]} onChange={(event)=>this.handleAmountChange(event, index)}/>
                                    <button type="button" className="button" id="modal-button" onClick={(event)=>this.removeIngredient(index)}>Remove Ingredient</button> <br />
                                    <br />
                                </div>
                            )
                        })
                    }
                </label>

                <br /><br />

                <button type="button" className="button" id="modal-button" onClick={(event)=>this.addIngredient(event)}>Add Ingredient</button> <br />

                

                <input className="button" id="modal-button" type="submit" value="Submit" />

            </form>
        );
    }
}


export default RecipeForm;