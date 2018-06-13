import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

// render our App
class BurgerBuilder extends Component{
    
    // basic state of burger as a object
    state = {
        ingridients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    render(){
        return(
            <Aux>
                <Burger ingridients={this.state.ingridients} />
                <div>tu będzie kontrola</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;