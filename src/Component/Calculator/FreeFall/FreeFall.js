import React ,{Component} from 'react';
import {Card,CardContent,Typography,FormControl,FormHelperText} from '@material-ui/core';
import classes from './FreeFall.module.css';
import Alert from '@material-ui/lab/Alert';
import Results from '../../BaseURL/BaseURL';



const units={
    'M':'m',
    'CM':'cm',
    'FT':'ft',
    'S':'s',
    'MIN':'min',
    'HR':'hr',
    'M/S':'m/s',
    'KM/HR':'km/hr',
    'FT/S':'ft/s'
}

export default class FreeFall extends Component{



    constructor(props){
        super(props)
        this.state={
            height:{
                value:0,
                unit:units.M
            },
            time:{
                value:0,
                unit:units.S
            },
            velocity:{
                value:0,
                unit:units["M/S"]
            },
            valid:false,
            error:'',
            show:false
        }
    }

    setValues(h,t,v){
        let {height,time,velocity}=this.state;
        this.setState({
            height:{...height,value:h},
            time:{...time,value:t},
            velocity:{...velocity,value:v}

        });
    };

    handleSubmit=()=>{
        let {height,time,velocity}=this.state;
        const Data={
            height:height.value,
            heightUnit:height.unit,
            time:time.value,
            timeUnit:time.unit,
            velocity:velocity.value,
            velocityUnit:velocity.unit
        }

        if(!this.state.height.value>0){
            this.setState({error:'fields should not be blank',valid:false})

        }
        else{
            this.setState({
                valid:true
            })
            Results.post('/freefall.json',Data).then(response=>{
                this.setState({show:true})
                // console.log(response)
            })

            this.handleReset()    
        }


    }    



    handleHeightChange=(value)=>{
        let time=(Math.sqrt((2*value)/9.8)).toFixed(2);
        let velocity=(time*9.8).toFixed(2);
        this.setValues(value,time,velocity)
    }
    handleTimeChange=(value)=>{
        let height=((1/2*9.8*(Math.pow(value,2)))).toFixed(2);
        let velocity=(value*9.8).toFixed(2);
        this.setValues(height,value,velocity);


    }
    handleVelocityChange=(value)=>{
        let time=(value/9.8).toFixed(2);
        let height=(1/2*9.8*(Math.pow(time,2))).toFixed(2);
        this.setValues(height,time,value);
    }

    handleHeightUnitChange=(unit)=>{
        let {height}=this.state;
        if(height.unit===units.M){
            if(unit===units.CM){
                height.value *=100;
            }
            if(unit===units.FT){
                height.value*=3.281
            }
        }
        else if(height.unit===units.CM){
            if(unit===units.M){
                height.value /=100
            }
            if(unit===units.FT){
                height.value /=30.48;
            }
        }
        else if(height.unit===units.FT){
            if(unit===units.M){
                height.value /=3.281;
            }
            if(unit===units.CM){
                height.value *=30.48
            }
        }

        height.unit=unit;
        this.setState({height});

    }
    handleTimeUnitChange=(unit)=>{
        let {time}=this.state;
        if(time.unit===units.S){
            if(unit===units.MIN){
                time.value /=60;
            }
            if(unit===units.HR){
                time.value /=3600
            }
        }
        else if(time.unit===units.MIN){
            if(unit===units.S){
                time.value *=60;
            }
            if(unit===units.HR){
                time.value /=60
            }
        }
        else if(time.unit===units.HR){
            if(unit===units.S){
                time.value *=3600
            }
            if(unit===units.MIN){
                time.value *=60;
            }
        }
        time.unit=unit;
        this.setState({time})
    }
    handleVelocityUnitChange=(unit)=>{
        let {velocity}=this.state;
        if(velocity.unit===units["M/S"]){
            if(unit===units["KM/HR"]){
                velocity.value *=3.6;
            }
            if(unit===units["FT/S"]){
                velocity.value *=3.281;
            }
        }
        else if(velocity.unit===units["KM/HR"]){
            if(unit===units["M/S"]){
                velocity.value /=3.6;
            }
            if(unit===units["FT/S"]){
                velocity.value /=1.097;
            }
        }
        else if(velocity.unit===units["FT/S"]){
            if(unit===units["M/S"]){
                velocity.value /=3.281;
            }
            if(unit===units["KM/HR"]){
                velocity.value *=1.097
            }
        }
        velocity.unit=unit;
        this.setState({velocity});
    }


    handleReset=()=>{
        this.setState({
            height:{
                value:0,
                unit:units.M
            },
            time:{
                value:0,
                unit:units.S
            },
            velocity:{
                value:0,
                unit:units["M/S"]
            },
            error:''
        })
    }


    render(){

        const {height,time,velocity}=this.state
        return(
            <div className={classes.free}>
                <Card className={classes.Card}>
                <CardContent >
                    <Typography  style={{color:'black',fontWeight:'bold'}} gutterBottom>
                            Free Fall Calculator
                    </Typography>

                    {/* Height  ----------------------------------------*/}

                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Height (h)</FormHelperText>
                        <div className={classes.input}>
                            <input className={classes.field} type='number'  value={height.value} onChange={(e)=>this.handleHeightChange(e.target.value)}   />
                            <select  value={height.unit} onChange={(e)=>this.handleHeightUnitChange(e.target.value)}  >
                                <option>{units.M}</option>
                                <option>{units.CM}</option>
                                <option>{units.FT}</option>
                            </select>
                        </div>
                    </FormControl>

                    {/* Time of fall ----------------------------------------*/}

                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Time of fall (t)</FormHelperText>
                        <div className={classes.input}>
                            <input className={classes.field} type='number' value={time.value} onChange={(e)=>this.handleTimeChange(e.target.value)}    />
                            <select value={time.unit} onChange={(e)=>this.handleTimeUnitChange(e.target.value)}  >
                            <option>{units.S}</option>
                            <option>{units.MIN}</option>
                            <option>{units.HR}</option>

                            </select>
                        </div>
                    </FormControl>

                    {/* Velocity  ----------------------------------------*/}

                    <FormControl className={classes.Form} >
                        <FormHelperText style={{fontSize:'15px',width:'250px'}}>Velocity (v)</FormHelperText>
                        <div className={classes.input}>
                            <input className={classes.field}  type='number'  value={velocity.value} onChange={(e)=>this.handleVelocityChange(e.target.value)}    />
                            <select value={velocity.unit} onChange={(e)=>this.handleVelocityUnitChange(e.target.value)} >
                            <option>{units["M/S"]}</option>
                            <option>{units["KM/HR"]}</option>
                            <option>{units["FT/S"]}</option>s
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
        
                    {/* Button Element ------------------------------*/}
                    <button onClick={this.handleReset} >RESET</button>
                    <button onClick={this.handleSubmit}>SAVE</button>
                </CardContent>
                </Card>
            </div>
        )
    }
}