import React from 'react';
import './Planner.css';
import Calendar from 'react-calendar';

class Planner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    render() {
        return (
        <div className="module" id="planner">

            <div className="module-title">
                Meal Planner
            </div>

            <div className="module-content">
                <Calendar className="calendar"/>
            </div>

            
        </div>
        );
    }
}


export default Planner;