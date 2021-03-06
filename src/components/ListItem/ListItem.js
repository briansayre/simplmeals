import React from "react";

class ListItem extends React.Component {
	render() {
		return (
			<div className="planner-list-item">
				<input className="checkbox" type="checkbox" />
				<div className="list-item-ingredient">
					{this.props.ingredient}
				</div>

				<div className="list-item-amount">{this.props.amount}</div>
			</div>
		);
	}
}

export default ListItem;
