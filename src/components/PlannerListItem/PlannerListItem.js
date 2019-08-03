import React from 'react';



class PlannerListItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log('remove recipe');
        console.log(this.props.meal);
    }

    render() {
        return (
            <div className="planner-list-item">
   
                {this.props.name}
                
                <button className="x" onClick={this.handleClick}>&times;</button>
            </div>

            

        );
    }

}


export default PlannerListItem;