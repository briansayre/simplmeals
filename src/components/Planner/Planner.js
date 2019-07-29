import React from 'react';
import './Planner.css';
import Calendar from 'react-calendar';
import Popup from "reactjs-popup";
import PlannerPopup from '../PlannerPopup/PlannerPopup';
import PlannerListItem from '../PlannerListItem/PlannerListItem';
import {modalStyle} from '../Dashboard/Dashboard';


class Planner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            todaysDate: new Date(),
            selectedDay: undefined,
            breakfast: [],
            lunch: [],
            dinner: [],
            loaded: false,
        }
        
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
    }

    handleDayClick(day) {
        this.setState({ selectedDay: day });
    }

    handleLeftArrowClick() {
        var d = new Date(this.state.date);
        d.setDate(this.state.date.getDate() - 1);
        this.setState({ date: d });
        this.fillArrays();
    }

    handleRightArrowClick() {
        var d = new Date(this.state.date);
        d.setDate(this.state.date.getDate() + 1);
        this.setState({ date: d });
        this.fillArrays();
    }

    onChange = date => this.setState({ date })

    fillArrays() {
        var tempBreakfast = [];
        var tempLunch = [];
        var tempDinner = [];
        console.log(this.state.date);

        for (var i = 0; i < this.props.recipes.length; i++) {
            var dates = this.props.recipes[i].dates;
            if (dates) {
                var recipe = this.props.recipes[i];
                for (var j = 0; j < dates.length; j++) {
                    if (this.state.date.getFullYear() === parseInt(dates[j].slice(0, 4)) &&
                        this.state.date.getMonth()+1 === parseInt(dates[j].slice(5, 7)) &&
                        this.state.date.getDate() === parseInt(dates[j].slice(8, 10))) {
                        var meal = this.props.recipes[i].meals[j];
                        if (meal === 'breakfast') {
                            tempBreakfast.push(recipe.name);
                        } else if (meal === 'lunch') {
                            tempLunch.push(recipe.name);
                        } else if (meal === 'dinner') {
                            tempDinner.push(recipe.name);
                        }
                    } 
                }
            }
            
        }

        this.setState({ 
            breakfast: tempBreakfast,
            lunch: tempLunch,
            dinner: tempDinner,
            loaded: true,
        });

    }

    displayBreakfast() {
        return (
            this.state.breakfast.map((name, index) => (
                < PlannerListItem key={index} name={name} />
            ))
        );
    }

    displayLunch() {
        return (
            this.state.lunch.map((name, index) => (
                < PlannerListItem key={index} name={name} />
            ))
        );
    }

    displayDinner() {
        return (
            this.state.dinner.map((name, index) => (
                < PlannerListItem key={index} name={name} />
            ))
        );
    }

    componentWillMount() {
        this.setState({date: new Date()})
        this.fillArrays();
    }

    componentDidMount() {
        this.fillArrays();
    }

    render() {
        console.log(this.state.date);
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
                        maxDate={new Date(this.state.todaysDate.getFullYear(), this.state.todaysDate.getMonth() + 3)}
                        minDate={new Date(this.state.todaysDate.getFullYear(), this.state.todaysDate.getMonth(), this.state.todaysDate.getDate() -7)}
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

                <div className="planned-section">

                <div className="meal-plan" id="breakfast" >
                    <div className="module-title-secondary-dark">
                        &nbsp; Breakfast
                        <Popup className="modal" contentStyle={modalStyle} trigger={<button className="button" id = "add-food-button"> + </button>} modal>
                            {close => (

                                <div className="modal-content">

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

                    {this.displayBreakfast()}

                </div>

                <div className="meal-plan" id="lunch" >
                    <div className="module-title-secondary-dark">
                        &nbsp; Lunch
                        <Popup className="modal" contentStyle={modalStyle} trigger={<button className="button" id = "add-food-button"> + </button>} modal>
                            {close => (

                                <div className="modal-content">

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

                    
                    {this.displayLunch()}

                </div>

                <div className="meal-plan" id="dinner" >
                    <div className="module-title-secondary-dark">
                        &nbsp; Dinner
                        <Popup className="modal" contentStyle={modalStyle} trigger={<button className="button" id = "add-food-button"> + </button>} modal>
                            {close => (

                                <div className="modal-content">

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

                    {this.displayDinner()}

                </div>

                </div>

            </div>
        );
    }
}


export default Planner;