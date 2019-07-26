import React from 'react';
import './List.css';
import Popup from "reactjs-popup";

const contentStyle = {
    background: "white",
    width: "100%",
};

let addRecipeButton = (
    <Popup className="modal" contentStyle={contentStyle} trigger={<button className="button" id = "add-button"> + </button>} modal>
        {close => (

            <div className="modal-content">
                 
                <button
                    className="button"
                    id="modal-button"
                    onClick={() => {
                        close();
                    }}
                >
                    Close
                </button>

            </div>

        )}
    </Popup>
);


class List extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    render() {
        return (
        <div className="module" id="list">

            <div className="module-title">
                Grocery List
            </div>

            <div className="module-title-secondary">
                <button className="arrow" id = "cycle-left"> &lt; </button>
                June 1 - June 7 
                <button className="arrow" id = "cycle-right"> &gt; </button>
                {addRecipeButton}
            </div>

            <div className="module-content">
                <center>Coming soon...</center>
            </div>


            
        </div>
        );
    }
}


export default List;