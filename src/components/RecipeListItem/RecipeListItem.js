import React from "react";
import Popup from "reactjs-popup";
import { modalStyle } from "../Dashboard/Dashboard";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";

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
		return this.state.ingredients.map((name, index) => (
			<li className="recipe-list-item-ingredient" key={index}>
				{name}{" "}
			</li>
		));
	}

	displayAmounts() {
		return this.state.amounts.map((name, index) => (
			<li className="recipe-list-item-ingredient" key={index}>
				{" "}
				{name}{" "}
			</li>
		));
	}

	fillArrays() {
		var ingredientArr = [];
		if (typeof this.props.recipe["ingredients"] !== "undefined") {
			for (var i = 0; i < this.props.recipe.ingredients.length; i++) {
				if (typeof this.props.recipe.ingredients[i] == "undefined") {
					ingredientArr.push("No ingredient");
				} else {
					ingredientArr.push(this.props.recipe.ingredients[i]);
				}
			}
		} else {
			ingredientArr.push("No ingredients");
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
		} else {
			amountArr.push("No amounts");
		}

		this.setState({
			ingredients: ingredientArr,
			amounts: amountArr,
			loaded: true,
		});
	}

	removeRecipe() {
		var database = firebase.database();
		var ref = database.ref(
			"users/" + firebase.auth().currentUser.uid + "/recipes/",
		);
		ref.on("value", snapshot => {
			var objects = snapshot.val();
			if (objects !== null) {
				var keys = Object.keys(objects);

				// loops through recipes
				for (var i = 0; i < keys.length; i++) {
					var k = keys[i];
					var name = objects[k].name;
					if (name === this.props.recipe.name) {
						ref.child(k).remove();
					}
				}
			}
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
						<Popup
							className="modal"
							contentStyle={modalStyle}
							trigger={
								<button className="recipe-item-list-button">
									{" "}
									{this.props.recipe.name}{" "}
								</button>
							}
							modal
						>
							{close => (
								<div className="modal-content">
									<form>
										<div className="recipe-modal">
											<h1> {this.props.recipe.name} </h1>
											<h3>Instuctions:</h3>
											<p>
												{" "}
												{
													this.props.recipe
														.instructions
												}{" "}
											</p>
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
											<br />
											<br />

											<Popup
												className="modal"
												contentStyle={modalStyle}
												trigger={
													<button
														type="button"
														className="button"
														id="modal-button"
													>
														Remove Recipe
													</button>
												}
												modal
											>
												{close => (
													<div className="modal-content">
														<form
															onSubmit={this.removeRecipe()}
														>
															<center>
																<h3>
																	{" "}
																	Are you sure
																	you want to
																	remove this
																	recipe?{" "}
																</h3>
																<button
																	type="submit"
																	value="Submit"
																	className="button"
																	id="modal-button"
																>
																	Remove
																</button>
																<br />
																<button
																	type="submit"
																	className="button"
																	id="modal-button"
																	onClick={() => {
																		close();
																	}}
																>
																	Close
																</button>
															</center>
														</form>
													</div>
												)}
											</Popup>

											<br />
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
									</form>
								</div>
							)}
						</Popup>
					</div>
				) : (
					<h1> Loading... </h1>
				)}
			</div>
		);
	}
}

export default RecipeListItem;
