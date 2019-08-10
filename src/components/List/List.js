import React from "react";
import "./List.css";
//import Popup from "reactjs-popup";
//import {modalStyle} from '../Dashboard/Dashboard';
import ListItem from "../ListItem/ListItem"

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			thisWeekIngredients: [],
			thisWeekAmounts: [],
			nextWeekIngredients: [],
			nextWeekAmounts: [],
			weekAfterNextIngredients: [],
			weekAfterNextAmounts: [],
			addIngredientName: "",
			addAmoutName: "",
			whichWeek: 0,
			weeks: ["This Week", "Next Week", "Week After Next"],
		};
		this.changeDisplayRight = this.changeDisplayRight.bind(this);
		this.changeDisplayLeft = this.changeDisplayLeft.bind(this);
		this.display = this.display.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleIngredientChange(event) {
		this.setState({ addIngredientName: event.target.value });
	}

	handleAmountChange(event) {
		this.setState({ addAmoutName: event.target.value });
	}

	handleSubmit(event) {
		if (this.state.addIngredientName !== "") {
			if (this.state.addAmoutName === "" || !this.state.addAmoutName) {
				this.setState({ addAmoutName: "No amount" });
			}
			if (this.state.whichWeek === 0) {
				this.setState({
					thisWeekIngredients: [
						...this.state.thisWeekIngredients,
						this.state.addIngredientName,
					],
				});
				this.setState({
					thisWeekAmounts: [
						...this.state.thisWeekAmounts,
						this.state.addAmoutName,
					],
				});
			} else if (this.state.whichWeek === 1) {
				this.setState({
					nextWeekIngredients: [
						...this.state.nextWeekIngredients,
						this.state.addIngredientName,
					],
				});
				this.setState({
					nextWeekAmounts: [
						...this.state.nextWeekIngredients,
						this.state.addAmoutName,
					],
				});
			} else if (this.state.whichWeek === 2) {
				this.setState({
					weekAfterNextIngredients: [
						...this.state.weekAfterNextIngredients,
						this.state.addIngredientName,
					],
				});
				this.setState({
					weekAfterNextAmounts: [
						...this.state.weekAfterNextAmounts,
						this.state.addAmoutName,
					],
				});
			}
		} else {
			alert("Please enter a name");
		}
		event.preventDefault();
	}

	changeDisplayRight() {
		var display = this.state.whichWeek + 1;
		if (display === 3) {
			display = 0;
		}
		this.setState({ whichWeek: display});
	}

	changeDisplayLeft() {
		var display = this.state.whichWeek - 1;
		if (display === -1) {
			display = 2;
		}
		this.setState({ whichWeek: display});
	}

	display() {
		if (this.state.whichWeek === 0) {
			return (
				<div>
					{this.state.thisWeekIngredients.map((name, index) => (
						<ListItem
							key={index}
							ingredient={name}
							amount={this.state.thisWeekAmounts[index]}
						/>
					))}
				</div>
			);
		} else if (this.state.whichWeek === 1) {
			return (
				<div>
					{this.state.nextWeekIngredients.map((name, index) => (
						<ListItem
							key={index}
							ingredient={name}
							amount={this.state.nextWeekAmounts[index]}
						/>
					))}
				</div>
			);
		} else if (this.state.whichWeek === 2) {
			return (
				<div>
					{this.state.weekAfterNextIngredients.map((name, index) => (
						<ListItem
							key={index}
							ingredient={name}
							amount={this.state.weekAfterNextAmounts[index]}
						/>
					))}
				</div>
			);
		}
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

		// Fill in this weeks, next weeks, and week after next array with the dates
		var thisWeekDates = [];
		var nextWeekDates = [];
		var weekAfterNextDates = [];
		for (var i = 0; i < 21; i++) {
			if (i < 7) {
				var newDate = new Date(date);
				thisWeekDates.push(newDate);
			} else if (i < 14) {
				var newDate2 = new Date(date);
				nextWeekDates.push(newDate2);
			} else {
				var newDate3 = new Date(date);
				weekAfterNextDates.push(newDate3);
			}
			date.setDate(date.getDate() + 1);
		}

		var thisWeekIngredients = [];
		var thisWeekAmounts = [];
		var nextWeekIngredients = [];
		var nextWeekAmounts = [];
		var weekAfterNextIngredients = [];
		var weekAfterNextAmounts = [];

		for (var j = 0; j < recipes.length; j++) {
			// j = recipes index
			if (recipes[j].dates) {
				for (var k = 0; k < recipes[j].dates.length; k++) {
					// k = dates index
					for (var l = 0; l < 7; l++) {
						// l = this weeks index
						if (
							thisWeekDates[l].getFullYear() ===
								parseInt(recipes[j].dates[k].slice(0, 4)) &&
							thisWeekDates[l].getMonth() + 1 ===
								parseInt(recipes[j].dates[k].slice(5, 7)) &&
							thisWeekDates[l].getDate() ===
								parseInt(recipes[j].dates[k].slice(8, 10))
						) {
							thisWeekIngredients = thisWeekIngredients
								.concat(recipes[j].ingredients)
								.slice(0);
							thisWeekAmounts = thisWeekAmounts
								.concat(recipes[j].amounts)
								.slice(0);
						}

						if (
							nextWeekDates[l].getFullYear() ===
								parseInt(recipes[j].dates[k].slice(0, 4)) &&
							nextWeekDates[l].getMonth() + 1 ===
								parseInt(recipes[j].dates[k].slice(5, 7)) &&
							nextWeekDates[l].getDate() ===
								parseInt(recipes[j].dates[k].slice(8, 10))
						) {
							nextWeekIngredients = nextWeekIngredients
								.concat(recipes[j].ingredients)
								.slice(0);
							nextWeekAmounts = nextWeekAmounts
								.concat(recipes[j].amounts)
								.slice(0);
						}

						if (
							weekAfterNextDates[l].getFullYear() ===
								parseInt(recipes[j].dates[k].slice(0, 4)) &&
							weekAfterNextDates[l].getMonth() + 1 ===
								parseInt(recipes[j].dates[k].slice(5, 7)) &&
							weekAfterNextDates[l].getDate() ===
								parseInt(recipes[j].dates[k].slice(8, 10))
						) {
							weekAfterNextIngredients = weekAfterNextIngredients
								.concat(recipes[j].ingredients)
								.slice(0);
							weekAfterNextAmounts = weekAfterNextAmounts
								.concat(recipes[j].amounts)
								.slice(0);
						}
					}
				}
			}
		}

		var filteredThisWeekIngredients = thisWeekIngredients.filter(function(
			el,
		) {
			return el !== undefined;
		});
		var filteredThisWeekAmounts = thisWeekAmounts.filter(function(el) {
			return el !== undefined;
		});
		var filteredNextWeekIngredients = nextWeekIngredients.filter(function(
			el,
		) {
			return el !== undefined;
		});
		var filteredNextWeekAmounts = nextWeekAmounts.filter(function(el) {
			return el !== undefined;
		});
		var filteredWeekAfterNextIngredients = weekAfterNextIngredients.filter(function(
			el,
		) {
			return el !== undefined;
		});
		var filteredWeekAfterNextAmounts = weekAfterNextAmounts.filter(function(el) {
			return el !== undefined;
		});

		//var uniqueThisWeekIngredients = thisWeekIngredients.filter(function(item, index){ return thisWeekIngredients.indexOf(item) >= index; });

		this.setState({
			thisWeekIngredients: filteredThisWeekIngredients,
			thisWeekAmounts: filteredThisWeekAmounts,
			nextWeekIngredients: filteredNextWeekIngredients,
			nextWeekAmounts: filteredNextWeekAmounts,
			weekAfterNextIngredients: filteredWeekAfterNextIngredients,
			weekAfterNextAmounts: filteredWeekAfterNextAmounts,
		});
	}

	getThisWeek() {
		var ingredientArr = [];
		if (typeof this.props.recipe["ingredients"] !== "undefined") {
			for (var i = 0; i < this.props.recipe.ingredients.length; i++) {
				if (typeof this.props.recipe.ingredients[i] == "undefined") {
					ingredientArr.push("No ingredient");
				} else {
					ingredientArr.push(this.props.recipe.ingredients[i]);
				}
			}
		}

		var amountArr = [];
		if (typeof this.props.recipe["amounts"] !== "undefined") {
			for (var j = 0; j < this.props.recipe.amounts.length; j++) {
				if (typeof this.props.recipe.amounts[j] == "undefined") {
					amountArr.push("No amount");
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
				<div className="module-title">Grocery List</div>

				<div className="module-title-secondary">
					<button
						className="arrow"
						id="cycle-left"
						onClick={this.changeDisplayLeft}
					>
						{" "}
						&#x276E;{" "}
					</button>
					{this.state.weeks[this.state.whichWeek]}
					<button
						className="arrow"
						id="cycle-right"
						onClick={this.changeDisplayRight}
					>
						{" "}
						&#x276F;{" "}
					</button>
					{/*<Popup className="modal" contentStyle={modalStyle} trigger={<button className="button" id = "add-button"> + </button>} modal>
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
                            </Popup>*/}
				</div>
				<div className="overflow-control">
					<div className="module-content">
						{this.display()}
					</div>
				</div>
			</div>
		);
	}
}

export default List;
