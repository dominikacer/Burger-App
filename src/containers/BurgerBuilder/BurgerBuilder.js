import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// prices for every single ingridient
const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 1.6
};

// render our App
class BurgerBuilder extends Component{
    
    // basic state of burger as a object
    state = {
        ingridients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        // start value 
        totalPrice: 4
    }

    // komentarz po polsku
    // bierzemy stan składnika w zależności od jego typu
    // updatujemy go o 1 (jedno kliknięcie), a następnie przekazujemy do tablicy [spread operator]
    // updatujemy tablicę, która przechowuje state +1, następnie tworzymy zależności stan od ceny
    addIngridientHandler = (type) =>{
        const oldCount = this.state.ingridients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCounted;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingridients: updatedIngridients});
    }

    removeIngridientHandler = (type) =>{
        const oldCount = this.state.ingridients[type];
        // stop crush app if we want to delete item which doesn't exist
        if( oldCount <= 0 ) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCounted;
        const priceDeduction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingridients: updatedIngridients});
    }

    render(){
        const disabledInfo = {
            ...this.state.ingridients
        };

        for ( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        return(
            <Aux>
                <Burger ingridients={this.state.ingridients} />
                <BuildControls 
                    ingridientAdded={this.addIngridientHandler}
                    ingridientRemoved={this.removeIngridientHandler} 
                    disabled={disabledInfo}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;