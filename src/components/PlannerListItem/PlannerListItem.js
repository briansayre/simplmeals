import React from 'react';
import {modalStyle} from '../Dashboard/Dashboard';
import Popup from "reactjs-popup";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

class PlannerListItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log('remove recipe');
        console.log(this.props.meal);
        console.log(this.props.name);

        var database = firebase.database();
        var ref = database.ref('users/' + firebase.auth().currentUser.uid + '/recipes/');
        var recipes = [];
        recipes.length = 0;
        var deleted = 0;
        ref.on('value', ((snapshot) => {
            var objects = snapshot.val();
            if (objects !== null) {
                var keys = Object.keys(objects);
                // loops trhough recipes
                for (var i = 0; i < keys.length; i++) {
                    var k = keys[i];
                    var name = objects[k].name;
                    var dates = objects[k].dates;
                    var meals = objects[k].meals;
                    if (name === this.props.name && dates) {
                        // loops through dates Aand meals
                        for (var j = 0; j < dates.length; j++) {
                            if (
                            this.props.date.getFullYear() === parseInt(dates[j].slice(0, 4)) &&
                            this.props.date.getMonth()+1 === parseInt(dates[j].slice(5, 7)) &&
                            this.props.date.getDate() === parseInt(dates[j].slice(8, 10)) &&
                            meals[j] === this.props.meal &&
                            deleted === 0
                            ) {
                                //console.log(meals[j]);
                                //console.log(this.props.meal);
                                console.log('match');
                                //console.log(k);
                                dates.splice(0);
                                meals.splice(0);
                                console.log(dates)
                                var ref = database.ref('users/' + firebase.auth().currentUser.uid + '/recipes/' + k + '/');
                                ref.update({ dates: dates,  meals: meals });
                                deleted = 1;
                
                            }
                        }
                    }
                }
            }
        }));
        


    }

    render() {
        return (
            <div className="planner-list-item">
   
                {this.props.name}
                <Popup className="modal" contentStyle={modalStyle} trigger={<button className="x" >&times;</button>} modal>
                                        {close => (
                                            <div className="modal-content">
                                                <center>
                                                <h3> Are you sure you want to remove this recipe? </h3>
                                                <button
                                                    className="button"
                                                    id="modal-button"
                                                    onClick={() => {
                                                        this.handleClick();
                                                        close();
                                                    }}>
                                                    Remove
                                                </button>
                                                <br />
                                                <button
                                                    className="button"
                                                    id="modal-button"
                                                    onClick={() => {
                                                        close();
                                                    }}>
                                                    Close
                                                </button>
                                                </center>
                                            </div>
                                        )}
                                    </Popup>
            </div>

            

        );
    }

}


export default PlannerListItem;