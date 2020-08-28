import React,{Component} from 'react';
import classes from './Home.module.css';
import robo from '../../../Assets/robo.jpg';
import {Link} from 'react-router-dom'

export default class Home extends Component{
    render(){
        return(
            <div className={classes.content}>
                <div style={{fontSize:'20px',fontWeight:'bold'}}>
                    MATRIX
                </div>
                <div className={classes.intro}>
                    <div className={classes.description}><p>In this world every action functions based on some calculations and measurements. So I have tired to calculate some of those by using <strong>MATRIX </strong> application</p></div>
                    <div className={classes.img}><img src={robo} alt='robo'/></div>
                </div>
                <div className={classes.cal}>
                    <div className={classes.link1}>
                        <Link to='/freefall' style={{textDecoration:'none',color:'black'}}>
                        <p>Free Fall Calculator</p>
                        </Link>
                    </div>
                    <div className={classes.link1}>
                        <Link to='/fuelconsumption' style={{textDecoration:'none',color:'black'}}>
                        <p>Fuel Calculator</p>
                        </Link>
                    </div>
                    <div className={classes.link1}>
                        <Link to='/electricitycalculator' style={{textDecoration:'none',color:'black'}}>
                        <p>Electricity Calculator</p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}