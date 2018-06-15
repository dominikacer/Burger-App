import React, { Component } from 'react';

import Aux from '../../hoc/Component/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
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
        ingridients: null,
        // start value 
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-ff58b.firebaseio.com/ingridients.json')
            .then(response => {
                this.setState( {ingridients : response.data });
            })
            .catch(error => {
                this.setState({error: true});
            });
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
        this.setState( {loading: true} );
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
            .then(response => {
                this.setState({ loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false});
            });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingridients
        };

        for ( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingridients can't be loaded</p> : <Spinner />

        if (this.state.ingridients){
            burger = (
                <Aux>
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

        orderSummary = 
            <OrderSummary 
            ingridients={this.state.ingridients} 
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>
        }

        if (this.state.loading){
            orderSummary = <Spinner />;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);