import React from 'react';
import imgmob from '../assets/mob.svg';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import '../assets/css/formhandle.css';

const Mob = () => {

    
    return (

        <div className='container1'>

            <Grid container className='grid' >

                <Grid xs={12} md={6} >

                    <img src={imgmob} alt="xyz" />

                </Grid>

                <Grid xs={12} md={6}>

                    xs=8

                </Grid>

            </Grid>

        </div>

    )

}




export default Mob