import React from 'react';
import './Recipes.css';
import Popup from "reactjs-popup";
import RecipeForm from '../RecipeForm/RecipeForm';


class Recipes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           categories: ['Main', 'Side', 'Dessert', 'Other'],
           categoryIndex: 0,
           category: 'Main',
        }
        
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    }

    handleLeftArrowClick() {
        var newIndex = (this.state.categoryIndex - 1);
        if (newIndex === -1) 
            newIndex = 3;
        this.setState({categoryIndex: newIndex});
        this.setState({category: (this.state.categories[newIndex]).toLowerCase()});
        console.log(this.state.categoryIndex);
        console.log(this.state.category);
    }

    handleRightArrowClick() {
        var newIndex = (this.state.categoryIndex + 1);
        if (newIndex === 4) 
            newIndex = 0;
        this.setState({categoryIndex: newIndex});
        this.setState({category: (this.state.categories[newIndex]).toLowerCase()});
        console.log(this.state.categoryIndex)
        console.log(this.state.category);
    }

    render() {
        return (
        <div className="module" id="recipes">

            <div className="module-title">
                Recipes
            </div>

            <div className="module-title-secondary">
                <button className="arrow" id = "cycle-left" onClick={this.handleLeftArrowClick}> &lt; </button>
                {this.state.categories[this.state.categoryIndex]}s 
                <button className="arrow" id = "cycle-right" onClick={this.handleRightArrowClick}> &gt; </button>
                
                <Popup trigger={<button className="button" id = "add-button"> + </button>} modal>
                    {close => (

                        <div className="modal">
                            
                            <RecipeForm category={this.state.category}/>

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

                        </div>

                    )}
                </Popup>


                {console.log(this.state.categoryIndex)}
            </div>

            <div className="module-content">
            
            </div>
            
            
        </div>
        );
    }
}


export default Recipes;