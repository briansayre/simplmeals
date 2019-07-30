import React from 'react';
import './List.css';
import Popup from "reactjs-popup";
import {modalStyle} from '../Dashboard/Dashboard';


class List extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            thisWeekIngredients: [],
            thisWeekAmounts: [],
            nextWeekIngredients: [],
            nextWeekAmounts: [],
        }
    }

    fillArrays() {
        var recipes = this.props.recipes;
        var date = new Date();
        var dayNumber = date.getDay();
        while (dayNumber !== 0) {
            date.setDate(date.getDate() - 1);
            console.log(date.toDateString());
            dayNumber = date.getDay();
        }
        // get ingredients for this week
        var weekCount = 0;
        //while (weekCount !== 2) {
            if (weekCount === 0) {
                
            } else {
            
            }
        //}


    }

    getThisWeek() {
        var ingredientArr = [];
        if (typeof(this.props.recipe['ingredients']) !== 'undefined' ) {
            for (var i = 0; i < this.props.recipe.ingredients.length; i++) {
                if (typeof(this.props.recipe.ingredients[i]) == 'undefined') {
                    ingredientArr.push('No ingredient');
                } else {
                    ingredientArr.push(this.props.recipe.ingredients[i]);
                }
            }
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
        }

        this.setState({
            thisWeeksIngredients: ingredientArr,
            thisWeekAmounts: amountArr,

        });


    }

    componentWillMount() {
        this.fillArrays();
    }

    render() {
        return (
        <div className="module" id="list">

            <div className="module-title">
                Grocery List
            </div>

            <div className="module-title-secondary">
                <button className="arrow" id = "cycle-left"> &lt; </button>
                This week
                <button className="arrow" id = "cycle-right"> &gt; </button>
                <Popup className="modal" contentStyle={modalStyle} trigger={<button className="button" id = "add-button"> + </button>} modal>
                    {close => (

                        <div className="modal-content">
                            
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
                
            </div>


            
        </div>
        );
    }
}


export default List;