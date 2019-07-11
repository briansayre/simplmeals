import React from 'react';
import './Landing.css';
import create from '../../images/create.png';
import plan from '../../images/plan.png';
import shop from '../../images/shop.png';
import enjoy from '../../images/enjoy.png';

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            
            <div className="landing">
                
                <div className="header-image">
    
                </div>
            
                <div className="landing-container">

                    <div className="images">

                        <div>
                            <img src={create} alt=""/>
                            <h1 className="image-captions">Create.</h1>
                        </div>

                        <div>
                            <img src={plan} alt="" />
                            <h1 className="image-captions">Plan.</h1>
                        </div>

                        <div>
                            <img src={shop} alt="" />
                            <h1 className="image-captions">Shop.</h1>
                        </div>

                        <div>
                            <img src={enjoy} alt="" />
                            <h1 className="image-captions">Enjoy.</h1>
                        </div>
                        
                    </div>

                    <div>
                        <p className="explain">
                            Simplmeals allows you to simple add your own recipes<br /> and plan every meal simply and quickly.
                        </p>
                    </div>

                </div>

            </div>
        );
    }
}


export default Landing;