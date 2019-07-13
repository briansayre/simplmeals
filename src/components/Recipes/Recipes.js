import React from 'react';
import './Recipes.css';
import Popup from "reactjs-popup";

let addRecipeButton = (
    <Popup trigger={<button className="button" id = "add-button"> + </button>} modal>
        {close => (

            <div className="modal">
                <form>
                    <h3 className="modal-labels">Name of Recipe:</h3>
                    <input type="text" name="recipeName" /><br />
                    <h3 className="modal-labels">Instuctions:</h3>
                    <input type="text" name="instructions"  /><br />
                    <h3 className="modal-labels">Ingredients:</h3>
                    <div id="ingredient">
                        <input type="text" name="ingredientName" placeholder=" Ingredient Name"/>
                        <input type="text" name="amount" placeholder=" Amount"/>
                    </div>
                    <br />
                </form>

                <button
                    className="button"
                    id="modal-button"
                    onClick={() => {
                    console.log("modal closed ");
                    close();
                    }}
                >
                    Close
                </button>

                <button
                    className="button"
                    id="modal-button"
                    onClick={() => {
                    console.log("modal closed ");
                    close();
                    }}
                >
                    Add Ingredient
                </button>

                <button
                    className="button"
                    id="modal-button"
                    onClick={() => {
                    console.log("modal closed ");
                    close();
                    }}
                >
                    Submit
                </button>

            </div>

        )}
    </Popup>
);

let cycleLeft = (
    <button className="arrow" id = "cycle-left"> &lt; </button>
);

let cycleRight = (
    <button className="arrow" id = "cycle-right"> &gt; </button>
);


class Recipes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    render() {
        return (
        <div className="module" id="recipes">

            <div className="module-title">
                Recipes
            </div>

            <div className="module-title-secondary">
                {cycleLeft} Main Courses {cycleRight} {addRecipeButton}
            </div>

            <div className="module-content">
            
            </div>
            
            
        </div>
        );
    }
}


export default Recipes;