import React from 'react';
import Popup from "reactjs-popup";


const contentStyle = {
    background: "white",
    width: "100%",
};

class RecipeListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            amounts: [],
            loaded: false,
        };
        this.fillArrays = this.fillArrays.bind(this);
    }

    displayIngredients() {
        return (
            this.state.ingredients.map((name, index) => (
                <li className="recipe-list-item-ingredient" key={index} >{name} </li>
            ))
        )
    }

    displayAmounts() {
        return (
            this.state.amounts.map((name, index) => (
                <li className="recipe-list-item-ingredient" key={index} > {name} </li>
            ))
        )
    }

    fillArrays() {
        var ingredientArr = [];
        if (typeof(this.props.recipe['ingredients']) !== 'undefined' ) {
            for (var i = 0; i < this.props.recipe.ingredients.length; i++) {
                if (typeof(this.props.recipe.ingredients[i]) == 'undefined') {
                    ingredientArr.push('No ingredient');
                } else {
                    ingredientArr.push(this.props.recipe.ingredients[i]);
                }
            }
        } else {
            ingredientArr.push('No ingredients');
        }

        var amountArr = [];
        if (typeof(this.props.recipe['amounts']) !== 'undefined' ) {
            for (var j = 0; j < this.props.recipe.amounts.length; j++) {
                if (typeof(this.props.recipe.amounts[j]) == 'undefined') {
                    amountArr.push('No amount');
                } else {
                    amountArr.push(this.props.recipe.amounts[j]);
                }
            }
        } else {
            amountArr.push('No amounts');
        }

        this.setState({ 
            ingredients: ingredientArr,
            amounts: amountArr,
            loaded: true,
        });
    }

    componentWillMount() {
        this.fillArrays();
    }

    render() {
        return (
            <div>

                {this.state.loaded ? (
                        
                    <div>
                        <Popup className="modal" contentStyle={contentStyle} trigger={<button className="recipe-item-list-button" > {this.props.recipe.name} </button>} modal>
                            {close => (
        
                                <div className="modal-content">
                                    <div className="recipe-modal">
                                        <h1> {this.props.recipe.name} </h1>
                                        <h3>Instuctions:</h3>
                                        <p> {this.props.recipe.instructions} </p>
                                        <div className="ingredients-modal">
                                            <div className="ingredients-list-modal"> 
                                                <h4>Ingredients</h4>
                                                <ol>  
                                                    {this.displayIngredients()}
                                                </ol>
                                            </div>
                                            <div className="amounts-list-modal">
                                                <h4>Amounts</h4>
                                                <ol> 
                                                    {this.displayAmounts()}
                                                </ol>
                                            </div>
                                        </div>
        
        
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
        
                                </div>
        
                            )}
                        </Popup>
                    </div>

                ) : (

                    <h1 > Loading... </h1>

                
                )}
            </div>

            

        );
    }

}


export default RecipeListItem;