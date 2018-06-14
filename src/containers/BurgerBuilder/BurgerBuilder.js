import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    // check if we can order or not by creating copy of ingridients array 
    updatePurchaseState(ingridients){
        const sum = Object.keys(ingridients)
            .map(igKey => {
                return ingridients[igKey];
            })
            .reduce((sum, el) =>{
                return sum + el;
            },0);
        this.setState({purchasable: sum > 0});
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
        this.updatePurchaseState(updatedIngridients);
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
        this.updatePurchaseState(updatedIngridients);
    }

    // states after ORDER button
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('Test');
        const order = {
            ingridients: this.state.ingridients,
            price : this.state.totalPrice,
            customer: {
                name: 'Dominik M.',
                adress: {
                    street: 'Test 1',
                    zipCode: '32-020',
                    country: 'Poland'
                },
                email: 'dominikxmichalik@gmail.com'
            },
            deliveryMethod : 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(error => console.log(error));
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
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingridients={this.state.ingridients} 
                        price={this.state.totalPrice}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingridients={this.state.ingridients} />
                <BuildControls 
                    ingridientAdded={this.addIngridientHandler}
                    ingridientRemoved={this.removeIngridientHandler} 
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;