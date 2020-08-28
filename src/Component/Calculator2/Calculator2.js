import React,{Component} from 'react';
import classes from './Calculator2.module.css';
import FuelConsumption from './Fuel Consumption/FuelConsumption';

export default class Calculator2 extends Component{
    render(){
        return(
            <div className={classes.cal2}>
                <FuelConsumption />
            </div>

        )
    }
}