import React from 'react';
import './List.css';
import Popup from "reactjs-popup";

let addRecipeButton = (
    <Popup trigger={<button className="button" id = "add-button"> + </button>} modal>
        {close => (

            <div className="modal">
                <form>
                    <h3 className="modal-labels">Item:</h3>
                    <input type="text" name="itemAdded" /><br />
                    
                    <br />
                </form>

                <button
                    className="button"
                    id="modal-button"
                    onClick={() => {
                    console.log("modal closed ");
                    close();
                    }}
                >
                    Close
                </button>
                
                <button
                    className="button"
                    id="modal-button"
                    onClick={() => {
                    console.log("modal closed ");
                    close();
                    }}
                >
                    Submit
                </button>

            </div>

        )}
    </Popup>
);

let cycleLeft = (
    <button className="arrow" id = "cycle-left"> &lt; </button>
);

let cycleRight = (
    <button className="arrow" id = "cycle-right"> &gt; </button>
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
                {cycleLeft} June 1 - June 7 {cycleRight} {addRecipeButton}
            </div>

            <div className="module-content">
                
            </div>


            
        </div>
        );
    }
}


export default List;