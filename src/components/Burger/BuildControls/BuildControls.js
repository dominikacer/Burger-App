import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

// create single control for each type
const controls = [
    { label : 'Salad', type: 'salad'},
    { label : 'Bacon', type: 'bacon'},
    { label : 'Cheese', type: 'cheese'},
    { label : 'Meat', type: 'meat'},
];

// create user UI
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.ingridientAdded(ctrl.type)}
                removed={() => props.ingridientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
    </div>
);

export default buildControls;