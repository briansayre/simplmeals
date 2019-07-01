import React from 'react';
import './List.css';

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

            <div className="module-content">
                Hello mate
            </div>

            
        </div>
        );
    }
}


export default List;