import React,{Component} from 'react';
import classes from './NavBar.module.css';
import {Link} from 'react-router-dom'
export default class Nav extends Component{
    render(){
        return(
            <div className={classes.over}>
                <div className={classes.head}>
                <div className={classes.Header}>
                    <p className={classes.logo}>MATRIX</p>
                    <div >
                        <ul className={classes.Nav}>
                            <Link to='/' style={{textDecoration:'none',color:'whitesmoke'}}>
                                <li>HOME</li>
                            </Link>
                            <Link to='/savedresults' style={{textDecoration:'none',color:'whitesmoke'}}>
                                <li>SAVED RESULTS</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
            
        )
    }
}
