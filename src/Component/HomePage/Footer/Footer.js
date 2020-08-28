import React from 'react';
import classes from './Footer.module.css';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import {Link} from '@material-ui/core'



const footer=()=>{
    return(
        <div className={classes.footer}>
            <div style={{background:'none',border:'0',borderRadius:'13px',width:'90%',margin:'10px auto',display:'flex',justifyContent:'center',justifyItems:'center'}}>
                <p style={{padding:'0'}}>Developed by Premtechie</p>
                <Link href='https://www.linkedin.com/in/premkumar-n-93264417a/' style={{margin:' auto 10px ',cursor:'pointer'}}>
                    <LinkedInIcon style={{color:'white'}} />
                </Link>
                <Link href='https://github.com/premtechie?tab=repositories' style={{margin:' auto 10px ',cursor:'pointer',color:'black'}}>
                    <GitHubIcon style={{color:'white'}} />
                </Link> 
            </div>
        </div>
    );
}


export default footer;