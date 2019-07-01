import React from 'react';
import './Recipes.css';

class Recipes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    render() {
        return (
        <div className="module" id="recipes">

            <div className="module-title">
                Recipes
            </div>

            <div className="module-content">
                Hello mate
            </div>

            
        </div>
        );
    }
}


export default Recipes;