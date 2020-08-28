import React,{Component} from 'react';
import {FuelConsumptionResults,FreeFallResults,ElectricityResults} from '../DisplayResult/DisplayResult'
import  classes from './Fetch.module.css';
import BaseURL from '../../BaseURL/BaseURL';
import '../../../config';
import * as firebase from 'firebase';


export default class FetchResult extends Component{

    state={
        freeFall:[],
        fuelConsumption:[],
        Electricity:[],
    }

    componentDidMount(){
        BaseURL.get('/freefall.json').then(response=>{
            // console.log(Response.data);
            const fetched=[];
            let data=response.data
            for(let key in response.data){
                data[key].id = key;
                fetched.push(data[key])
            }
            this.setState({
                freeFall:fetched
            })
        });
        //----------------------------------------

        BaseURL.get('/fuelConsumption.json').then(response=>{
            // console.log(Response.data)
            const fetched=[]
            let data = response.data;
            for(let key in response.data){
                data[key].id=key;
                fetched.push(data[key])
            }
            this.setState({
                fuelConsumption:fetched
            })
        })

       //-------------------------------------------

        BaseURL.get('/electricity.json').then(response=>{
    
            const fetched=[];
            let data = response.data;
            for(let key in data){
                data[key].id=key
                fetched.push(data[key])

            }

            this.setState({
                Electricity:fetched
            })

        })
    }

    deleteHandle=(id,ref)=>{
        firebase.database()
            .ref(ref)
            .child(id)
            .remove()

        let freeFall = this.state.freeFall.filter((obj) => {
            return obj.id !== id;
        });

        let Electricity=this.state.Electricity.filter((obj)=>{
            return obj.id !==id
        })

        let fuelConsumption=this.state.fuelConsumption.filter((obj)=>{
            return obj.id !==id;
        })

        this.setState({
            freeFall,
            Electricity,
            fuelConsumption
        })
    }


    render(){
        return(
            <div className={classes.main} >
                    <div className={classes.freefall}>
                        <h2>Free Fall</h2>
                        {this.state.freeFall.map((result,index)=>
                            < FreeFallResults 
                            key={index}
                            id={result.id}
                            height={result.height}
                            heightUnit={result.heightUnit}
                            time={result.time}
                            timeUnit={result.timeUnit}
                            velocity={result.velocity}
                            velocityUnit={result.velocityUnit}
                            removeHandler={this.deleteHandle}
                            />
                        )}
                    </div>
                    <hr/>
                    <div>
                        <h2>Fuel Consumption</h2>
                        {this.state.fuelConsumption.map((result,index)=>(
                            < FuelConsumptionResults 
                            key={index}
                            id={result.id}
                            carType={result.carType}
                            tripType={result.tripType}
                            distance={result.distance}
                            distanceUnit={result.distanceUnit}
                            fuelPrice={result.FuelPrice}
                            fuelPriceUnit={result.fuelPriceUnit}
                            fuelUsed={result.Fuelused}
                            fuelUsedUnit={result.fuelUsedUnit}
                            costOfTrip={result.costOfTrip}
                            removeHandler={this.deleteHandle}
                            />
                        ))}
                    </div>
                    <hr/>
                    <div>
                        <h2>Electricity</h2>
                        {this.state.Electricity.map((result,index)=>(
                            < ElectricityResults 
                            key={index}
                            id={result.id}
                            powerConsumption={result.PowerConsumption}
                            powerConsumptionUnit={result.powerConsumptionUnit}
                            energyPrice={result.energyPrice}
                            powerConsumed={result.powerConsumed}
                            powerConsumedUnit={result.powerConsumedUnit}
                            usageTiming={result.usageTiming}
                            usageTimingUnit={result.usageTimingUnit}
                            cost={result.costEstimated}
                            removeHandler={this.deleteHandle}
                            />
                        ))}
                    </div>
            </div>
        )
    }
}