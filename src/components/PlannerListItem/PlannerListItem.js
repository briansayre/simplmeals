import React from 'react';



class PlannerListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div className="planner-list-item">
   
                {this.props.name}
               
            </div>

            

        );
    }

}


export default PlannerListItem;