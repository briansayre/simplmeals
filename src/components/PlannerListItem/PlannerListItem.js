import React from 'react';



class PlannerListItem extends React.Component {

    render() {
        return (
            <div className="planner-list-item">
   
                {this.props.name}
               
            </div>

            

        );
    }

}


export default PlannerListItem;