import React from 'react';

import classes from './Burger.css';
import BurgerIngridients from './BurgerIngridients/BurgerIngridients';
import BurgerIngridient from './BurgerIngridients/BurgerIngridients';


// render entire burger
const burger = (props) => {


    // transform ingridient state from Builder => string object into array

    // IMPORTANT! keys has to be eql === to SWITCH CASES [BurgerIngridient.js]
    // ingridients from state, i = index of elem; igKey = name of elem [like salad];
    // Object.keys create key : value pairs 
    let transformedIngridients = Object.keys(props.ingridients)
        .map(igKey => {
            return [...Array(props.ingridients[igKey])]
                    .map((_, i) => {
                        return <BurgerIngridient key={igKey + i} type={igKey} />
                    });  // [,]
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
        // komentarz po polsku co się tu dzieje
        // stan składników jest obiektem, transformujemy te obiekty do arrajki
        // zwracamy arrajkę z parami klucz:wartość, natomiast zwrócona wartość w returnie to tablica z pojedynczymi stanami
        // więc jeżeli mamy sytuację, że wszystkie składniki to 0, musimy zredukować wartość arrajki
        // następnie dodajemy wszystkie składniki osobno jeśli stan transformedIngridients > 0 
        // jeśli < 0 wyrzucamy komunikat 

        if( transformedIngridients.length === 0){
            transformedIngridients = <p> Dorzuć składniki :)</p>
        }

        console.log(transformedIngridients);
    return (
        <div className = {classes.Burger} >
            <BurgerIngridients type="bread-top" />
    
            {transformedIngridients} 

            <BurgerIngridients type="bread-bottom" />
        </div>
    );
};

export default burger;