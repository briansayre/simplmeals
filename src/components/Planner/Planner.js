import React from 'react';
import './Planner.css';
import Calendar from 'react-calendar';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

let cycleLeft = (
    <button className="arrow" id = "cycle-left"> &lt; </button>
);

let cycleRight = (
    <button className="arrow" id = "cycle-right"> &gt; </button>
);


class Planner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            selectedDay: undefined,
        }

        this.handleDayClick = this.handleDayClick.bind(this);
    }

    handleDayClick(day) {
        this.setState({ selectedDay: day });
    }

    onChange = date => this.setState({ date })

    render() {
        return (
        <div className="module" id="planner">

            <div className="module-title">
                Meal Planner
            </div>

            <div className="module-content">
                <Calendar 
                    className={["calendar"]}
                    onChange={this.onChange}
                    value={this.state.date}
                    maxDate={new Date(2019, 12, 31,)}
                    minDate={new Date(2019, 1, 1,)}
                    tileClassName="day"
                />
                
                
            </div>

            <div className="module-title-secondary">
                {cycleLeft} {this.state.date.toDateString()} {cycleRight}
            </div>
            
        </div>
        );
    }
}


export default Planner;

/*
react-calendar__tile--active react-calendar__tile--rangeStart react-calendar__tile--rangeEnd react-calendar__tile--rangeBothEnds 

*/