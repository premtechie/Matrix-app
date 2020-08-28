import React,{Component} from 'react';
import FreeFall from './FreeFall/FreeFall';
import Content from './Contents/Content';
import classes from './calculator.module.css';


export default class Calculator extends Component{
    render(){
        return(
            <div className={classes.cal}>
                <FreeFall />
                <Content />
            </div>
        )
    }
}