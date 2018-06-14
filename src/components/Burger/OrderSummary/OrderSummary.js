import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // this could be a functional component, doesn't have to be a class
    // this is how it is because it is easier to debug app
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate')
    }


    render(){

        const ingridientSummary = Object.keys(this.props.ingridients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingridients[igKey]}
                </li>);
        });
        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingridientSummary}
            </ul>
            <p><strong>Total Price : {this.props.price.toFixed(2)} </strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
                CANCEL
            </Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>
                CONTINUE
            </Button>
        </Aux>
        );

    }
}

export default OrderSummary;