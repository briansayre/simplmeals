import React from 'react';
import './List.css';
import Popup from "reactjs-popup";
import {modalStyle} from '../Dashboard/Dashboard';
import ListItem from '../ListItem/ListItem';


class List extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            thisWeekIngredients: [],
            thisWeekAmounts: [],
            nextWeekIngredients: [],
            nextWeekAmounts: [],
            addIngredientName: '',
            addAmoutName: '',
            thisWeek: true,
        }
        this.changeDisplay = this.changeDisplay.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIngredientChange(event) {
        this.setState({addIngredientName: event.target.value});
    }

    handleAmountChange(event) {
        this.setState({addAmoutName: event.target.value});
    }

    handleSubmit(event) {
        if (this.state.addIngredientName !== '') {
            if (this.state.addAmoutName === '' || !this.state.addAmoutName) {
                this.setState({addAmoutName: 'No amount'});
            }
            if (this.state.thisWeek) {
                this.setState({thisWeekIngredients: [...this.state.thisWeekIngredients, this.state.addIngredientName]});
                this.setState({thisWeekAmounts: [...this.state.thisWeekAmounts, this.state.addAmoutName]});
            } else {
                this.setState({nextWeekIngredients: [...this.state.nextWeekIngredients, this.state.addIngredientName]});
                this.setState({nextWeekAmounts: [...this.state.nextWeekIngredients, this.state.addAmoutName]});
            }
        } else {
            alert('Please enter a name');
        }
        event.preventDefault();
    }

    changeDisplay() {
        this.setState({ thisWeek: !this.state.thisWeek});
    }

    displayThis() {
        return (
            this.state.thisWeekIngredients.map((name, index) => (
                <ListItem key={index} ingredient={name} amount={this.state.thisWeekAmounts[index]} />
            ))
        )
    }

    displayNext() {
        return (
            this.state.nextWeekIngredients.map((name, index) => (
                <ListItem key={index} ingredient={name} amount={this.state.nextWeekAmounts[index]} />
            ))
        )
    }

    fillArrays() {
        var recipes = this.props.recipes;
        var date = new Date();
        var dayNumber = date.getDay();
        while (dayNumber !== 0) {
            date.setDate(date.getDate() - 1);
            dayNumber = date.getDay();
        }
        // get ingredients for this week

        // Fill in this weeks and next weeks array with the dates
        var thisWeekDates = [];
        var nextWeekDates = [];
        for (var i= 0; i < 14; i++) {
            if (i < 7) {
                var newDate = new Date(date);
                thisWeekDates.push(newDate);
            } else {
                var newDate2 = new Date(date);
                nextWeekDates.push(newDate2);
            }
            date.setDate(date.getDate() + 1);
        }

        var thisWeekIngredients = [];
        var thisWeekAmounts = [];
        var nextWeekIngredients = [];
        var nextWeekAmounts = [];

        for (var j = 0; j < recipes.length; j++) {
            // j = recipes index
            if (recipes[j].dates) {
                for (var k = 0; k < recipes[j].dates.length; k++) {
                    // k = dates index
                    for (var l = 0; l < 7; l++) {
                        // l = this weeks index
                        if (thisWeekDates[l].getFullYear() === parseInt(recipes[j].dates[k].slice(0, 4)) &&
                            thisWeekDates[l].getMonth()+1 === parseInt(recipes[j].dates[k].slice(5, 7)) &&
                            thisWeekDates[l].getDate() === parseInt(recipes[j].dates[k].slice(8, 10))) {

                            thisWeekIngredients = thisWeekIngredients.concat(recipes[j].ingredients).slice(0);
                            thisWeekAmounts = thisWeekAmounts.concat(recipes[j].amounts).slice(0);

                        }

                        if (nextWeekDates[l].getFullYear() === parseInt(recipes[j].dates[k].slice(0, 4)) &&
                            nextWeekDates[l].getMonth()+1 === parseInt(recipes[j].dates[k].slice(5, 7)) &&
                            nextWeekDates[l].getDate() === parseInt(recipes[j].dates[k].slice(8, 10))) {

                            nextWeekIngredients = nextWeekIngredients.concat(recipes[j].ingredients).slice(0);
                            nextWeekAmounts = nextWeekAmounts.concat(recipes[j].amounts).slice(0);

                        }
                        
                    }

                }
            }
        }

        var filteredThisWeekIngredients = thisWeekIngredients.filter(function (el) {
            return el !== undefined;
        });
        var filteredThisWeekAmounts = thisWeekAmounts.filter(function (el) {
            return el !== undefined;
        });
        var filteredNextWeekIngredients = nextWeekIngredients.filter(function (el) {
            return el !== undefined;
        });
        var filteredNextWeekAmounts = nextWeekAmounts.filter(function (el) {
            return el !== undefined;
        });

        //var uniqueThisWeekIngredients = thisWeekIngredients.filter(function(item, index){ return thisWeekIngredients.indexOf(item) >= index; });

        this.setState({
            thisWeekIngredients: filteredThisWeekIngredients,
            thisWeekAmounts: filteredThisWeekAmounts,
            nextWeekIngredients: filteredNextWeekIngredients,
            nextWeekAmounts: filteredNextWeekAmounts,
        })

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
                <button className="arrow" id = "cycle-left" onClick={this.changeDisplay}> &lt; </button>
                {this.state.thisWeek ? "This Week" : "Next Week" }
                <button className="arrow" id = "cycle-right" onClick={this.changeDisplay} > &gt; </button>
                <Popup className="modal" contentStyle={modalStyle} trigger={<button className="button" id = "add-button"> + </button>} modal>
                    {close => (

                        <div className="modal-content">
                            
                            <form onSubmit={this.handleSubmit}>

                                <label>
                                    <h3>Add item to list:</h3>
                                    <input type="text" placeholder="Ingredient" value={this.state.addIngredientName} onChange={(event)=>this.handleIngredientChange(event)}/>
                                    <input type="text" placeholder="Amount" value={this.state.addAmountName} onChange={(event)=>this.handleAmountChange(event)}/>
                                </label>

                                <br /><br />

                                <input className="button" id="modal-button" type="submit" value="Submit" />

                            </form>

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
                {this.state.thisWeek ? (this.displayThis()) : (this.displayNext()) }
            </div>


            
        </div>
        );
    }
}


export default List;