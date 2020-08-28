import React from 'react';
import {Paper} from '@material-ui/core'
import classes from './Display.module.css';

const FreeFallResults=(props)=>
    (
        <div className={classes.main}>
            <div>
                <Paper elevation={2} style={{padding:'3px 20px', display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                    <p><strong>Height</strong>:  {props.height}  {props.heightUnit}</p>
                    <p><strong>Time</strong>:  {props.time}  {props.timeUnit}</p>
                    <p><strong>Velocity</strong>:  {props.velocity}  {props.velocityUnit}</p>
                </div>
                <div className={classes.btn}>
                    <button onClick={()=>props.removeHandler(props.id,'freefall')}>X</button>
                </div>
                </Paper>
            </div>
        </div>
    
    )

const FuelConsumptionResults=(props)=>{
    return(
        <div className={classes.main}>
             <div>
             <Paper elevation={2} style={{padding:'3px 20px', display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                    <p><strong>Car Type:</strong>  {props.carType}</p>
                    <p><strong>Trip Type:</strong>  {props.tripType}</p>
                    <p><strong>Distance:</strong>   {props.distance} {props.distanceUnit}</p>
                    <p><strong>Fuel Used:</strong>  {props.fuelUsed}  {props.fuelUsedUnit}</p>
                    <p><strong>Fuel Price:</strong>   {props.fuelPrice}  {props.fuelPriceUnit}</p>
                    <p><strong>Cost of Trip ₹ :</strong>  {props.costOfTrip}</p>
                </div>
                <div className={classes.btn}>
                    <button onClick={()=>props.removeHandler(props.id,'fuelConsumption')}>X</button>
                </div>
                </Paper>
            </div>
        </div>

    )
}

const ElectricityResults=(props)=>{
    return(
        <div className={classes.main}>
            <div>
            <Paper elevation={2} style={{padding:'3px 20px', display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                    <p><strong>Power Consumption</strong>: {props.powerConsumption} {props.powerConsumptionUnit}</p>
                    <p><strong>Energy Price</strong>: {props.energyPrice}</p>
                    <p><strong>Usage Timing</strong>: {props.usageTiming}  {props.usageTimingUnit}</p>
                    <p><strong>Power Consumed</strong>: {props.powerConsumed}  {props.powerConsumedUnit}</p>
                    <p><strong>Cost ₹ </strong>: {props.cost}</p>
                </div>
                <div className={classes.btn}>
                    <button onClick={()=>props.removeHandler(props.id,'electricity')}>X</button>
                </div>
            </Paper>
            </div>
        </div>
    )
}


export {FuelConsumptionResults,ElectricityResults,FreeFallResults}