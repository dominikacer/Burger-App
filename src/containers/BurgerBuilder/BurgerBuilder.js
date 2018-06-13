import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

// render our App
class BurgerBuilder extends Component{
    render(){
        return(
            <Aux>
                <Burger/>
                <div>tu będzie kontrola</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;