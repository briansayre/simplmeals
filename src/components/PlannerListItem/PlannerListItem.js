import React from 'react';



class PlannerListItem extends React.Component {

    render() {
        return (
            <div className="planner-list-item">
   
                {this.props.name}
                
                <div className="x">X</div>
            </div>

            

        );
    }

}


export default PlannerListItem;