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

        this.setState({ingredients: this.state.ingredients})
    }

    addIngredient() {
        this.setState({ingredients: [...this.state.ingredients, ""]}) 

    }

    removeIngredient(index) {
        this.state.ingredients.splice(index, 1);
        console.log(this.state.ingredients, "$$$$");
        this.setState({ingredients: this.state.ingredients});

    }

    handleSubmit(event) {
        if (this.state.value !== '') {
            this.setState({value: event.target.value});
            //alert('\nA name was submitted: ' + this.state.value + '\nInstructions: ' + this.state.instructions + '\nCategory: ' + this.state.category);
            var database = firebase.database();
            var ref = database.ref('recipes');
            var recipeData = {
                name: this.state.value,
                category: this.state.category,
                uid: firebase.auth().currentUser.uid,
                ingredients: this.state.ingredients,
                instructions: this.state.instructions,
                dates: this.state.dates,
            }
            console.log(this.state);
            ref.push(recipeData);
            
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
                            this.state.ingredients.map((input, index) => {
                                return (
                                    <div key={index} >
                                        <input type="text" placeholder="Ingredient" value={input} onChange={(event)=>this.handleIngredientChange(event, index)}/>
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