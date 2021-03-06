import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";
import "./Dashboard.css";
import Planner from "../Planner/Planner";
import List from "../List/List";
import Recipes from "../Recipes/Recipes";

export const modalStyle = {
	background: "white",
	width: "100%",
	maxHeight: "80vh",
	borderRadius: ".25rem",
	backgroundColor: "#FAFAFA",
};

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allRecipes: [],
			loaded: false,
		};
		this.getRecipes = this.getRecipes.bind(this);
	}

	componentWillMount() {
		this.getRecipes();
	}

	getRecipes() {
		var database = firebase.database();
		var ref = database.ref(
			"users/" + firebase.auth().currentUser.uid + "/recipes/",
		);
		var recipes = [];
		recipes.length = 0;
		ref.on("value", snapshot => {
			var objects = snapshot.val();
			if (objects !== null) {
				var keys = Object.keys(objects);
				for (var i = 0; i < keys.length; i++) {
					var k = keys[i];
					//var name = objects[k].name;
					//var category = objects[k].category;
					recipes.push(objects[k]);
				}
				recipes = recipes.slice(0, keys.length);
			}
			this.setState({
				allRecipes: recipes,
				loaded: true,
			});
		});
	}

	render() {
		return (
			<div>
				{this.state.loaded ? (
					<div className="module-container">
						<Recipes recipes={this.state.allRecipes} />
						<Planner recipes={this.state.allRecipes} />
						<List recipes={this.state.allRecipes} />
					</div>
				) : (
					<div className="loading">
						<h1> Loading... </h1>
					</div>
				)}
			</div>
		);
	}
}

export default Dashboard;
