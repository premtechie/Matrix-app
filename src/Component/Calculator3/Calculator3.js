import React,{Component} from 'react';
import classes from './Calculator3.module.css';
import Electricity from './Electricity/Electricity';

export default class Calculator2 extends Component{
    render(){
        return(
            <div className={classes.cal2}>
                <Electricity />
            </div>

        )
    }
}