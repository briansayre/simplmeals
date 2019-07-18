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
            category: 'main',
            uid: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleInstructionsChange = this.handleInstructionsChange.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
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

    handleCategoryChange(event) {
        this.setState({category: event.target.value});
    }

    handleSubmit(event) {
        if (this.state.value !== '') {
            this.setState({value: event.target.value});
            alert('\nA name was submitted: ' + this.state.value + '\nInstructions: ' + this.state.instructions + '\nCategory: ' + this.state.category + '\nCategory: ' + this.props.category);
            
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
                <label>
                    Category:
                    <br />
                    <select  onChange={this.handleCategoryChange}>
                        <option selected value="main">Main</option>
                        <option value="side">Side</option>
                        <option value="dessert">Dessert</option>
                        <option value="other">Other</option>
                    </select>
                </label>

                <br /><br />

                <input className="button" id="modal-button" type="submit" value="Submit" />

            </form>
        );
    }
}


export default RecipeForm;