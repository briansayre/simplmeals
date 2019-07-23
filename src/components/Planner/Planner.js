import React from 'react';
import './Planner.css';
import Calendar from 'react-calendar';
import Popup from "reactjs-popup";
import PlannerPopup from '../PlannerPopup/PlannerPopup';



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

            <div className="meal-plan" id="breakfast" >
                <div className="module-title-secondary-dark">
                    &nbsp; Breakfast
                    <Popup trigger={<button className="button" id = "add-food-button"> + </button>} modal>
                        {close => (

                            <div className="modal">

                                <PlannerPopup recipes={this.props.recipes} meal="breakfast" date={this.state.date}/>

                                <center>
                                <button
                                    className="button"
                                    id="modal-button"
                                    onClick={() => {
                                    close();
                                    }}
                                >
                                    Close
                                    
                                </button>
                                </center>

                            </div>

                        )}
                    </Popup>
                </div>
            </div>

            <div className="meal-plan" id="lunch" >
                <div className="module-title-secondary-dark">
                    &nbsp; Lunch
                    <Popup trigger={<button className="button" id = "add-food-button"> + </button>} modal>
                        {close => (

                            <div className="modal">

                                <PlannerPopup recipes={this.props.recipes} meal="lunch" date={this.state.date}/>

                                <center>
                                <button
                                    className="button"
                                    id="modal-button"
                                    onClick={() => {
                                    close();
                                    }}
                                >
                                    Close
                                    
                                </button>
                                </center>

                            </div>

                        )}
                    </Popup>
                </div>
            </div>

            <div className="meal-plan" id="dinner" >
                <div className="module-title-secondary-dark">
                    &nbsp; Dinner
                    <Popup trigger={<button className="button" id = "add-food-button"> + </button>} modal>
                        {close => (

                            <div className="modal">

                                <PlannerPopup recipes={this.props.recipes} meal="dinner" date={this.state.date}/>

                                <br /><br />
                                <center>
                                <button
                                    className="button"
                                    id="modal-button"
                                    onClick={() => {
                                    close();
                                    }}
                                >
                                    Close
                                </button>
                                </center>

                            </div>

                        )}
                    </Popup>
                </div>
            </div>
            
        </div>
        );
    }
}


export default Planner;