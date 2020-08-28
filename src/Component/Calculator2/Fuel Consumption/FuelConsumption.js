import React,{Component} from 'react';
import classes from './FuelConsumption.module.css'
import {Card,CardContent,Typography,FormControl,FormHelperText} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Results from '../../BaseURL/BaseURL';



const data=require('./Data.json');

const units={
    'M':'m',
    'KM':'km',
    'LITER':'liter',
    'ML':'ml',
    '₹/LIT':'₹/Lit',
    '₹/ML':'₹/ml'
}

const trip={
    'CITY':'CITY',
    'HIGHWAY':'HIGHWAY'
}

const car={
    'HONDACITY':'HONDACITY',
    'HYUNDAI':'HYUNDAI',
    'SWIFT':'SWIFT',
    'ALTO':'ALTO'
}

export default class FuelConsumption extends Component{

    constructor(props){
        super(props)
        this.state={
            TripType:trip.CITY,
            CarType:car.HONDACITY,
            distance:{
                value:0,
                unit:units.KM
            },
            Fuelused:{
                value:0,
                unit:units.LITER
            },
            Fuelprice:{
                value:'',
                unit:units["₹/LIT"]
            },
            costOfTrip:{
                value:0
            },
            numOfPeople:'',
            costPerEach:0,
            kmpl:data.CITY.HONDACITY,
            valid:false,
            error:'',
            show:false
        }
        
    }


    
    handleSubmit=()=>{
        let {distance,Fuelprice,Fuelused,costOfTrip,numOfPeople,costPerEach,CarType,TripType}=this.state; 

        const Data={
            carType:CarType,
            tripType:TripType,
            distance:distance.value,
            distanceUnit:distance.unit,
            FuelPrice:Fuelprice.value,
            fuelPriceUnit:Fuelprice.unit,
            Fuelused:Fuelused.value,
            fuelUsedUnit:Fuelused.unit,
            costOfTrip:costOfTrip.value,
            numOfPeople:numOfPeople,
            costPerEach:costPerEach
        }

        if(!this.state.distance.value || !costPerEach || !numOfPeople){
                this.setState({error:'fields should not be blank',valid:false});
            }
        else{
            this.setState({
                valid:true,
                error:''
            })
            Results.post('/fuelConsumption.json',Data).then(response=>{
                this.setState({show:true})
                // console.log(response)
            })

            this.handleReset()   
        }

    }


    
    
    handleTripType=(value)=>{
        let { CarType } = this.state;
        this.setState({
            TripType:value,
            kmpl : data[value][CarType],
            distance:{
                value:'',
                unit:units.KM
            },
            Fuelused:{
                value:'',
                unit:units.LITER
            },
            Fuelprice:{
                value:'',
                unit:units["₹/LIT"]
            },
            costOfTrip:{
                value:''
            },
            numOfPeople:'',
            costPerEach:''
        },() => {
            console.log(this.state.kmpl)
        });
    }



    handleCarType=(value)=>{
        let {TripType}=this.state;
        this.setState({
            CarType:value,
            kmpl:data[TripType][value],
            distance:{
                value:0,
                unit:units.KM
            },
            Fuelused:{
                value:0,
                unit:units.LITER
            },
            Fuelprice:{
                value:'',
                unit:units["₹/LIT"]
            },
            costOfTrip:{
                value:0
            },
            numOfPeople:'',
            costPerEach:0
        },()=>{
            console.log(this.state.kmpl)
        })
    }
    

    setValues(d,fu,ct){
        let {distance,Fuelused,costOfTrip}=this.state;

        this.setState({
            distance:{...distance,value:d},
            Fuelused:{...Fuelused,value:fu},
            costOfTrip:{...costOfTrip,value:ct}
        })
    }


    handleDistanceValue=(value)=>{
        let {kmpl,Fuelprice}=this.state;
        let fu=(value/kmpl).toFixed(2);
        let ct=(Fuelprice.value*fu).toFixed(2);
        this.setValues(value,fu,ct)
    }

    handleFuelUsedValue=(value)=>{
        let {kmpl,Fuelprice}=this.state;
        let d=(value*kmpl).toFixed(2);
        let ct=(value*Fuelprice.value).toFixed(2)
        this.setValues(d,value,ct);
    }

    handleFuelPriceValue=(value)=>{
        let {kmpl,Fuelused,Fuelprice}=this.state;
        let ct=(value*Fuelused.value).toFixed(2);
        let d=(Fuelused.value*kmpl).toFixed(2);
        let fu=(ct/value).toFixed;

        this.setValues(d,fu,ct)
        this.setState({
            Fuelprice:{
                ...Fuelprice,
                value : value
            }
        });
    }

    handleCostOfTrip=(value)=>{
        let {kmpl,Fuelprice,numOfPeople}=this.state;
        let fu=(value/Fuelprice.value).toFixed(2);
        let d=(fu*kmpl).toFixed(2);
        let amount=(value/numOfPeople).toFixed(2)
        this.setValues(d,fu,value)
        this.setState({
            costPerEach:amount
        })
    }
    handleNoOfPerson=(value)=>{
        let {costOfTrip}=this.state;
        let amount=(costOfTrip.value/value).toFixed(2);
        this.setState({
            numOfPeople:value,
            costPerEach:amount
        });
    }
    // handleCostPerEach=(value)=>{
    //     let amount=costOfTrip.value/numOfPeople;

    //     this.setState({
    //         costPerEach:amount
    //     })
    // }

    handleDistanceUnit=(unit)=>{
        let {distance}=this.state

        if(distance.unit===units.KM){
            if(unit===units.M){
                distance.value *=1000
            }
        }
        else if(distance.unit===units.M){
            if(unit===units.KM){
                distance.value /=1000
            }
        }

        distance.unit=unit;
        this.setState({distance});
    }

    handleFuelUsedunit=(unit)=>{
        let {Fuelused}=this.state

        if(Fuelused.unit===units.LITER){
            if(unit===units.ML){
                Fuelused.value *=1000;
            }
        }
        else if(Fuelused.unit===units.ML){
            if(unit===units.LITER){
                Fuelused.value /=1000
            }
        }

        Fuelused.unit=unit;

        this.setState({Fuelused});

    }

    handleFuelPriceUnit=(unit)=>{
        let {Fuelprice}=this.state;
        if(Fuelprice.unit===units["₹/LIT"]){
            if(unit===units["₹/ML"]){
                Fuelprice.value /=1000
            }
        }
        else if(Fuelprice.unit===units["₹/ML"]){
            if(unit===units["₹/LIT"]){
                Fuelprice.value *=1000;
            }
        }

        Fuelprice.unit=unit;
        this.setState({Fuelprice})
    }

    handleReset=()=>{
        this.setState({
            TripType:trip.CITY,
            CarType:car.HONDACITY,
            distance:{
                value:0,
                unit:units.KM
            },
            Fuelused:{
                value:0,
                unit:units.LITER
            },
            Fuelprice:{
                value:'',
                unit:units["₹/LIT"]
            },
            costOfTrip:{
                value:0
            },
            numOfPeople:'',
            costPerEach:0,
            kmpl:data.CITY.HONDACITY,
            error:''
        })
    }


    


    render(){

        const{TripType,CarType,distance,Fuelused,Fuelprice,costOfTrip,numOfPeople,costPerEach}=this.state

        return(
            <div className={classes.free}>
                <Card className={classes.Card}>
                <CardContent >
                    <Typography  style={{color:'black',fontWeight:'bold'}} gutterBottom>
                            Fuel Calculator
                    </Typography>

                    {/* Trip Type  ----------------------------------------*/}

                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Trip Type</FormHelperText>
                        <div className={classes.input} >
                            <select className={classes.type} value={TripType} onChange={(e)=>this.handleTripType(e.target.value)} >
                                <option>{trip.CITY}</option>
                                <option>{trip.HIGHWAY}</option>
                            </select>
                        </div>
                    </FormControl>

                    {/* Car Type ----------------------------------------*/}
                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Car Type</FormHelperText>
                        <div className={classes.input}  >
                            <select className={classes.type} value={CarType} onChange={(e)=>this.handleCarType(e.target.value)} >
                                <option>{car.HONDACITY}</option>
                                <option>{car.HYUNDAI}</option>
                                <option>{car.ALTO}</option>
                                <option>{car.SWIFT}</option>
                            </select>
                        </div>
                    </FormControl>
                </CardContent>
                </Card>

        {/* Second Section--------------------*/}

        <Card className={classes.Card}>
                <CardContent >
                <Typography  style={{color:'black',textAlign:'start'}} gutterBottom >
                    Fuel consumption of <strong>{this.state.CarType}</strong> is <strong>{this.state.kmpl}</strong> KMPL.
                    I took this consumption value as per the google's Average mileage data.                     
                </Typography>

         {/* Distance  ----------------------------------------*/}

                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Distance</FormHelperText>
                        <div className={classes.input}>
                            <input className={classes.field} type='number' value={distance.value} onChange={(e)=>this.handleDistanceValue(e.target.value)} />
                            <select value={distance.unit} onChange={(e)=>this.handleDistanceUnit(e.target.value)} >
                                <option>{units.M}</option>
                                <option>{units.KM}</option>
                            </select>
                        </div>
                    </FormControl>

        {/* Fuel used ----------------------------------------*/}
                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Fuel Used</FormHelperText>
                        <div className={classes.input}>
                            <input className={classes.field} type='number' value={Fuelused.value} onChange={(e)=>this.handleFuelUsedValue(e.target.value)} />
                            <select value={Fuelused.unit} onChange={(e)=>this.handleFuelUsedunit(e.target.value)} >
                                <option>{units.LITER}</option>
                                <option>{units.ML}</option>
                            </select>
                        </div>
                    </FormControl>

        {/* Fuel Price ----------------------------------------*/}
                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Fuel Price</FormHelperText>
                        <div className={classes.input}>
                            <input className={classes.field} type='number'  value={Fuelprice.value} onChange={(e)=>this.handleFuelPriceValue(e.target.value)} />
                            <select value={Fuelprice.unit} onChange={(e)=>this.handleFuelPriceUnit(e.target.value)}  >
                                <option>{units["₹/LIT"]}</option>
                                <option>{units["₹/ML"]}</option>
                            </select>
                        </div>
                    </FormControl>

            {/* Cost of Trip ----------------------------------------*/}
                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Cost of Trip</FormHelperText>
                        <div className={classes.input}>
                            <input  className={classes.ifield}  type='number' value={costOfTrip.value} onChange={(e)=>this.handleCostOfTrip(e.target.value)} />
                        </div>
                    </FormControl>                   
                </CardContent>
                </Card>

            {/* Cost Divison */}
                <Card className={classes.Card}>
                <CardContent >
                <Typography  style={{color:'black',fontWeight:'bold'}} gutterBottom>
                   Cost Divison             
                </Typography>


            {/* Number of Person */}
                <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Number of Person</FormHelperText>
                        <div className={classes.input}>
                            <input  className={classes.ifield} type='number' value={numOfPeople} onChange={(e)=>this.handleNoOfPerson(e.target.value)} />
                        </div>
                </FormControl>  

                {/* Cost Per Person */}

                <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Cost Per Person ₹</FormHelperText>
                        <div className={classes.input}>
                            <input  className={classes.ifield} type='number' value={costPerEach} onChange={(e)=>this.handleCostPerEach(e.target.value)} />
                        </div>
                </FormControl>
                {
                        this.state.valid===false ?
                    (<div style={{color:'red'}}>
                        {this.state.error}
                    </div>):null
                }

                    {
                        this.state.show===true?
                        (   <div className={classes.alert}>
                                <Alert style={{width:'100%'}} onClose={() => {
                                    this.setState({show:false})
                                    }}>Success
                                </Alert>
                            </div>
                            
                        ):null
                    }
        {/* button----------------------- */}
                    <button onClick={this.handleReset} >RESET</button>
                    <button className={classes.save} onClick={this.handleSubmit}>SAVE</button>
                </CardContent>
                </Card>
            </div>
        );
    }
}