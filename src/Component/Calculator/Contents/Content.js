import React,{Component} from 'react';
import classes from './Content.module.css';
import {Grid,Paper}  from '@material-ui/core'

export default class Content extends Component{
    render(){
        return (
            <div className={classes.Content}>
                <Grid container >
                    <Grid item xs={12}>
                        <Grid container justify="center" >
                             <Paper elevation={3} className={classes.para1} >
                                 <div className={classes.p1}>
                                    <h1 style={{textAlign:'center',padding:'30px 0'}}>Free Fall Calculator</h1>
                                      This free fall calculator is a tool for finding the velocity of a falling object along with the 
                                     distance it travels. Thanks to this tool, you will be able to apply the free fall equation 
                                     for any object, be it an apple you drop, or a person skydiving.
                                </div>
                                <div className={classes.p1}>
                                      <h2>What is free fall definition ?</h2>
                                      <div>
                                            In free fall, an object moves under the influence of gravitational force only. 
                                            The only acceleration is the acceleration of gravity(g). No other force, including air resistance, 
                                            is acting on such an object.
                                      </div>
                                </div>
                                <div className={classes.p1}>
                                        Interestingly, an object in free fall doesn't necessarily need to be falling 
                                        (that is, moving downwards). For example, the Moon's motion satisfies all of the 
                                        conditions listed above: there is no other force acting on it other than gravity 
                                        (it's being pulled towards the Earth), and there is no air resistance, as 
                                        there is no air in space.
                                </div>
                                <div className={classes.p1}>
                                    Why doesn't the Moon crash into Earth, then? It's because Moon's speed 
                                    is not directed towards Earth, but tangentially to its orbit. Since the 
                                    Moon is moving along an elliptic orbit with the first cosmic velocity, 
                                    its motion generates a centrifugal force, equal and opposite to the force 
                                    of gravity.

                                </div>
                                <div className={classes.p1}>
                                      <h2>Free Fall Velocity:</h2>
                                      <div style={{textAlign:'center'}}>
                                        From the definition of velocity, we can find the velocity 
                                        of a falling object is:
                                      </div>
                                      <p style={{textAlign:'center'}}>v = v₀ + gt</p>
                                </div>
                                <div className={classes.p1}>
                                      <p>Where:</p>
                                    <ul>
                                        <li>v₀ is the initial velocity (measured in m/s or ft/s);</li>
                                        <li>t stands for the fall time (measured in seconds)</li>
                                        <li>g is the free fall acceleration (expressed in m/s² or ft/s²)</li>
                                    </ul>
                                </div>
                                <div className={classes.p1}>
                                      <h2>Free Fall Height:</h2>
                                    <p>
                                    If you want to calculate the distance traveled by a falling object, you need to write down the equation of motion. If the initial displacement and velocity are both equal to zero, it boils down to:
                                    </p>
                                    <p style={{textAlign:'center'}} >s = (1/2)gt²</p>
                                </div>
                             </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}