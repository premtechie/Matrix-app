import React,{Component} from 'react';
import classes from './Electricity.module.css'
import {Card,CardContent,Typography,FormControl,FormHelperText} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Results from '../../BaseURL/BaseURL';

const units={
    'WATTS':'w',
    'KW':'kw',
    'Hr/Day':'hr/day',
    'Hr/Week':'hr/wk',
    'Hr/Month':'hr/m',
    'Kwh/Day':'kwh/d',
    'Kwh/Week':'kwh/w',
    'Kwh/Month':'Kwh/m',
    'Day':'day',
    'Week':'Wk',
    'Month':'month'
}


export default class FuelConsumption extends Component{

    constructor(props){
        super(props);
        this.state={
            powerConsumption:{
                value:'',
                unit:units.KW
            },
            energyPrice:{
                value:'',
            },
            usageTiming:{
                value:'',
                unit:units["Hr/Day"]
            },
            powerConsumed:{
                value:'',
                unit:units["Kwh/Day"]
            },
            cost:{
                value:'',
                unit:units.Day
            },
            valid:false,
            error:'',
            show:false
        }
    }




    handleSubmit=()=>{
        let {powerConsumption,energyPrice,usageTiming,powerConsumed,cost}=this.state; 

        const Data={
             PowerConsumption:powerConsumption.value,
             powerConsumptionUnit:powerConsumption.unit,
             energyPrice:energyPrice.value,
             usageTiming:usageTiming.value,
             usageTimingUnit:usageTiming.unit,
             powerConsumed:powerConsumed.value,
             powerConsumedUnit:powerConsumed.unit,
             costEstimated:cost.value           
        }

        if(!usageTiming.value || !powerConsumption.value || !energyPrice.value){
                this.setState({error:'fields should not be blank',valid:false});
            }
        

        else{
            this.setState({
                valid:true,
                error:''
            })
            Results.post('/electricity.json',Data).then(response=>{
                this.setState({show:true})
            
            })

            this.handleReset()   
        }

    }




// value handlers---------------------------------

    handlePowerConsumptionValue=(value)=>{
        let {usageTiming,energyPrice,powerConsumed,powerConsumption,cost}=this.state;
        let pCon=(value*usageTiming.value).toFixed(2); 
        let c=(pCon* energyPrice.value).toFixed(2);
        this.setState({
            powerConsumed:{
                ...powerConsumed,
                value:pCon
            },
            powerConsumption:{
                ...powerConsumption,
                value:value
            },
            cost:{
                ...cost,
                value:c
            }
        })
    }
    handleEnergyPriceValue=(value)=>{
      let  {powerConsumed,energyPrice,cost}=this.state
        let c=(value*powerConsumed.value).toFixed(2)
        this.setState({
            energyPrice:{
                ...energyPrice,
                value:value
            },
            cost:{
                ...cost,
                value:c
            }
        })
    }
    handleUsageTimingValue=(value)=>{
        let {powerConsumption,energyPrice,powerConsumed,usageTiming,cost}=this.state;
        let pc=(value*powerConsumption.value).toFixed(2);
        let pCon=(pc/value).toFixed(2);
        let c=(pc*energyPrice.value).toFixed(2)

        this.setState({
            powerConsumed:{
                ...powerConsumed,
                value:pc
            },
            usageTiming:{
                ...usageTiming,
                value:value
            },
            powerConsumption:{
                ...powerConsumption,
                value:pCon
            },
            cost:{
                ...cost,
                value:c
            }
        })

    }

    handlePowerConsumedValue=(value)=>{
        let {usageTiming,energyPrice,powerConsumption,powerConsumed,cost}=this.state;
        let pCon=(usageTiming.value/value).toFixed(2);
        let c=(value*energyPrice.value).toFixed(2);

        this.setState({
            powerConsumption:{
                ...powerConsumption,
                value:pCon
            },
            powerConsumed:{
                ...powerConsumed,
                value:value
            },
            cost:{
                ...cost,
                value:c
            }
        })
    }
    

    handleCostValue=(value)=>{
        let {powerConsumption,energyPrice,cost,powerConsumed,usageTiming}=this.state;
        let pc=(value/energyPrice.value).toFixed(2);
        let ut=(pc/powerConsumption.value).toFixed(2);
        
        this.setState({
            cost:{
                ...cost,
                value:value
            },
            powerConsumed:{
                ...powerConsumed,
                value:pc
            },
            usageTiming:{
                ...usageTiming,
                value:ut
            }
        })
    }

    // unit handlers---------------------------------


    handlePowerConsumptionUnit=(unit)=>{
        let {powerConsumption}=this.state;

        if(powerConsumption.unit===units.KW){
            if(unit===units.WATTS){
                powerConsumption.value *=1000
            }
        }
        else if(powerConsumption.unit===units.WATTS){
            if(unit===units.KW){
            powerConsumption.value /=1000;
            }
        }
        powerConsumption.unit=unit;

        this.setState({powerConsumption})
    }


    handleUsageTimingUnit=(unit)=>{
        let {usageTiming}=this.state
        if(usageTiming.unit===units["Hr/Day"]){
            if(unit===units["Hr/Week"]){
                usageTiming.value *=7;
            }
            if(unit===units["Hr/Month"]){
                usageTiming.value *=30;
            }
        }
        else if(usageTiming.unit===units["Hr/Week"]){
            if(unit===units["Hr/Day"]){
                usageTiming.value /=7
            }
            if(unit===units["Hr/Month"]){
                usageTiming.value *=4;
            }
        }
        else if(usageTiming.unit===units["Hr/Month"]){
            if(unit===units["Hr/Week"]){
                usageTiming.value /=4;
            }
            if(unit===units["Hr/Day"]){
                usageTiming.value /=30;
            }
        }

        usageTiming.unit=unit;
        this.setState({usageTiming})
    }
    handlePowerConsumedUnit=(unit)=>{
        let {powerConsumed}=this.state;
        if(powerConsumed.unit===units["Kwh/Day"]){
            if(unit===units["Kwh/Week"]){
                powerConsumed.value *=7
            }
            if(unit===units["Kwh/Month"]){
                powerConsumed.value *=30;
            }
        }
        else if(powerConsumed.unit===units["Kwh/Week"]){
            if(unit===units["Kwh/Day"]){
                powerConsumed.value /=7
            }
            if(unit===units["Kwh/Month"]){
                powerConsumed.value *=4
            }
        }
        else if(powerConsumed.unit===units["Kwh/Month"]){
            if(unit===units["Kwh/Day"]){
                powerConsumed.value /=30;
            }
            if(unit===units["Kwh/Week"]){
                powerConsumed.value /=4
            }
        }
        powerConsumed.unit=unit;
        this.setState({
            powerConsumed
        })
    }
    handleCostUnit=(unit)=>{
        let {cost}=this.state;
        if(cost.unit===units.Day){
            if(unit===units.Week){
                cost.value *=7
            }
            if(unit ===units.Month){
                cost.value *=30;
            }
        }
        else if(cost.unit===units.Week){
            if(unit===units.Month){
                cost.value *=4;
            }
            if(unit===units.Day){
                cost.value /=7
            }
        }

        else if(cost.unit===units.Month){
            if(unit===units.Week){
                cost.value /=4
            }
            if(unit===units.day){
                cost.value /=30;
            }
        }
        cost.unit=unit;
        this.setState({cost})
    }
    handleReset=()=>{
        this.setState({
            powerConsumption:{
                value:'',
                unit:units.KW
            },
            energyPrice:{
                value:'',
            },
            usageTiming:{
                value:'',
                unit:units["Hr/Day"]
            },
            powerConsumed:{
                value:'',
                unit:units["Kwh/Day"]
            },
            cost:{
                value:'',
                unit:units.Day
            },
            valid:false,
            error:'',
            show:false
        })
    }


    render(){

        const {powerConsumption,energyPrice,usageTiming,powerConsumed,cost}=this.state;

        return(
            <div className={classes.free}>
                <Card className={classes.Card}>
                <CardContent >
                    <Typography  style={{color:'black',fontWeight:'bold'}} gutterBottom>
                            Electricity Calculator
                    </Typography>

                    {/* Power Consumption  ----------------------------------------*/}

                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Power Consumption</FormHelperText>
                        <div className={classes.input}>
                            <input type='number' className={classes.field} value={powerConsumption.value} onChange={(e)=>this.handlePowerConsumptionValue(e.target.value)} />
                            <select value={powerConsumption.unit} onChange={(e)=>this.handlePowerConsumptionUnit(e.target.value)} >
                                <option>{units.WATTS}</option>
                                <option>{units.KW}</option>
                            </select>
                        </div>
                    </FormControl>

                    {/* Energy price ----------------------------------------*/}
                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Energy Price</FormHelperText>
                        <div className={classes.input}>
                            <input className={classes.field} type='number' value={energyPrice.value} onChange={(e)=>this.handleEnergyPriceValue(e.target.value)} />
                            <div className={classes.text}>
                                ₹ / kWh
                            </div>
                        </div>
                    </FormControl>
                {/* Usage Timing--------------------------- */}

                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Usage Timing</FormHelperText>
                        <div className={classes.input}>
                            <input className={classes.field} type='number' value={usageTiming.value} onChange={(e)=>this.handleUsageTimingValue(e.target.value)} />
                            <select value={usageTiming.unit} onChange={(e)=>this.handleUsageTimingUnit(e.target.value)} >
                                <option>{units["Hr/Day"]}</option>
                                <option>{units["Hr/Week"]}</option>
                                <option>{units["Hr/Month"]}</option>            
                            </select>
                        </div>
                    </FormControl>

                    {/* Power Consumed---------------------------- */}

                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Power Consumed</FormHelperText>
                        <div className={classes.input}>
                            <input className={classes.field} type='number' value={powerConsumed.value} onChange={(e)=>this.handlePowerConsumedValue(e.target.value)} />
                            <select value={powerConsumed.unit} onChange={(e)=>this.handlePowerConsumedUnit(e.target.value)} >
                                <option>{units["Kwh/Day"]}</option>
                                <option>{units["Kwh/Week"]}</option>
                                <option>{units["Kwh/Month"]}</option>
                            </select>
                        </div>
                    </FormControl>

                    {/* Cost Estimation---------------------------- */}

                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Cost</FormHelperText>
                        <div className={classes.input}>
                            <input className={classes.field} type='number' value={cost.value} onChange={(e)=>this.handleCostValue(e.target.value)} />
                            <select value={cost.unit} onChange={(e)=>this.handleCostUnit(e.target.value)} >
                                <option>{units.Day}</option>
                                <option>{units.Week}</option>
                                <option>{units.Month}</option>
                            </select>
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
                    <button onClick={this.handleSubmit} className={classes.save}>SAVE</button>

                </CardContent>
                </Card>
            </div>
        );
    }
}