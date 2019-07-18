import React from 'react';
import './RecipeForm.css';

class RecipeForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            instructions: '',
            ingredients: [],
            dates: [],
            category: '',
            uid: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleInstructionsChange = this.handleInstructionsChange.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleNameChange(event) {
        this.setState({value: event.target.value});
       
    }

    handleInstructionsChange(event) {
        this.setState({instructions: event.target.value});
       
    }

    handleIngredientChange(event) {

    }

    handleSubmit(event) {
        if (this.state.value !== '') {
            this.setState({value: event.target.value});
            alert('A name was submitted: ' + this.state.value + ' Instructions: ' + this.state.instructions);
            
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
                    Ingredients:
                    <br />
                    <input type="text" placeholder="Ingredient" onChange={this.handleIngredientChange} />
                    <input type="text" placeholder="Amount"  onChange={this.handleIngredientChange} />
                </label>
                
                <br /><br />
                <input type="submit" value="Submit" />

            </form>
        );
    }
}


export default RecipeForm;