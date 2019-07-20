import React from 'react';
import './RecipeForm.css';
import * as firebase from 'firebase';

class RecipeForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            instructions: '',
            ingredients: [],
            dates: [],
            category: 'main',
            uid: '',
            ingredientInputList: [],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleInstructionsChange = this.handleInstructionsChange.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addIngredient();
        this.removeIngredient();
    }
    
    handleNameChange(event) {
        var database = firebase.database();
        var ref = database.ref('recipes');
        var userData = {
            uid: firebase.auth().currentUser.uid,
        }
        ref.push(userData);
        this.setState({value: event.target.value});
       
    }

    handleInstructionsChange(event) {
        this.setState({instructions: event.target.value});
       
    }

    handleIngredientChange(event) {
        var ingredient = event.target.value;
        console.log(ingredient);
    }

    handleCategoryChange(event) {
        this.setState({category: event.target.value});
    }

    addIngredient() {
        var arr = this.state.ingredientInputList;
        arr.push(
            <div>
                <input type="text" placeholder="Ingredient" onChange={this.handleIngredientNameChange} />
                <input type="text" placeholder="Amount" onChange={this.handleIngredientAmountChange} />
                <br />
            </div>
        );

        this.setState({
            ingredientInputList: arr
        });

    }

    removeIngredient() {
        var arr = this.state.ingredientInputList;
        arr.pop();
        this.setState({
            ingredientInputList: arr
        });

    }

    handleSubmit(event) {
        if (this.state.value !== '') {
            this.setState({value: event.target.value});
            alert('\nA name was submitted: ' + this.state.value + '\nInstructions: ' + this.state.instructions + '\nCategory: ' + this.state.category);
            
        } else {
            alert('Please enter a name');
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <label>
                    Name:
                    <br />
                    <input type="text" value={this.state.value} onChange={this.handleNameChange} />
                </label>

                <br /><br />

                <label>
                    Instuctions:
                    <br />
                    <input type="text" value={this.state.instructions} onChange={this.handleInstructionsChange} />
                </label>

                <br /><br />

                <label>
                    Category:
                    <br />
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
                            this.state.ingredientInputList.map(input => {
                                return (
                                    <div key={input.id} >
                                        {input}
                                    </div>
                                )
                            })
                        }
                        

                </label>

                <br /><br />

                <button type="button" className="button" id="modal-button" onClick={this.addIngredient.bind(this)}>Add Ingredient</button> <br />
                <button type="button" className="button" id="modal-button" onClick={this.removeIngredient.bind(this)}>Remove Ingredient</button> <br />
                <input className="button" id="modal-button" type="submit" value="Submit" />

            </form>
        );
    }
}


export default RecipeForm;