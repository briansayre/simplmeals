import React from 'react';
import './Planner.css';
import Calendar from 'react-calendar';
import 'react-day-picker/lib/style.css';


class Planner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            selectedDay: undefined,
        }
        
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
    }

    handleDayClick(day) {
        this.setState({ selectedDay: day });
    }

    handleLeftArrowClick() {
        console.log("Left")
        this.state.date.setDate(this.state.date.getDate() - 1)
        console.log(this.state.date.toDateString())
    }

    handleRightArrowClick() {
        console.log("Right")
        this.state.date.setDate(this.state.date.getDate() + 1)
        console.log(this.state.date.toDateString())
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
                    maxDate={new Date(2019, 12)}
                    minDate={new Date(2019, 6)}
                    tileClassName="day"
                    calendarType="US"
                    showNeighboringMonth={false}
                />
                
            </div>

            <div className="module-title-secondary">
                
                <button className="arrow" id="cycle-left" onClick={this.handleLeftArrowClick}> &lt; </button>
                {this.state.date.toDateString()} 
                <button className="arrow" id="cycle-right" onClick={this.handleRightArrowClick}> &gt; </button>
                
            </div>
            
        </div>
        );
    }
}


export default Planner;