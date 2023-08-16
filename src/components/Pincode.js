import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Registrationcontext from '../store/registrationcontext';
import { useNavigate } from 'react-router-dom';
import imgmob from '../assets/pincode.svg';
import axios from 'axios';
import { Modal } from '@mui/material';
import Pincodemodel from './Pincodemodel';
import '../assets/css/pincode.css';
import nagarro_img from '../assets/nagarro_img.png';
import {checkPincodeService } from './Services'
import Header from './Header/Header';


const Pincode = () => {
    const { saveuserdata } = useContext(Registrationcontext);
    const { userdata } = useContext(Registrationcontext);
    const navigate = useNavigate();
    const [pincode, setPincode] = useState('');
    const [pincodeError, setPincodeError] = useState(false);
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handlePincodeChange = (event) => {
        const value = event.target.value.toString();
        setPincode(value);
        setPincodeError(false);
        // const pin = { pin: event.target.value }
        // saveuserdata(pin)
        console.log(userdata);

    };

    const validatePincode = () => {
        if (pincode === '' || !/^\d{6}$/.test(pincode)) {
            setPincodeError(true);
            return false;
        }
        return true;


    };

    const handleSubmit = () => {
        if (validatePincode()) {
            // Proceed with further actions
            console.log('Pincode:', pincode);
            
            checkPincodeService(pincode)
                .then((response) => {
                    const info = (response.data);
                    if (info.data.isBlackListed) {
                        console.log('Pincode is blacklisted:', info.message);
                        handleOpen();




                    } else {
                        console.log('Pincode is not blacklisted.');
                        navigate('/loanoffers');
                    }
                    console.log(info);
                })
                .catch(error => {
                    console.error('Error occurred while checking pincode:', error);
                });



        }
    };

    return (
        <div className='pincodemaincontainer'>
            <div className='header'><Header /></div>
            <div className='pincodecontainer1'>
                <Grid container className='grid'>

                    <Grid xs={12} md={6} >
                        <div>
                            <img src={imgmob} className='pincode_img' alt="" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>

                            <div className='pincode_div_text'>
                                <h1 className='pincode_h1'>Enter Pincode</h1>


                                <p className='pincode_p'>Please enter your pincode for your permanent address.</p>
                            </div>
                            <div className='pincode_div_textfield'>
                                <p className='pincode_p_textfield'>Pincode</p>
                                <div>
                                    <TextField
                                        type='number'
                                        id="outlined-size-small"
                                        size="small"
                                        label=""
                                        placeholder='xxxxxx'
                                        variant="outlined"
                                        value={pincode}
                                        onChange={handlePincodeChange}
                                        error={pincodeError}
                                        className='pincode_textfield'
                                        helperText={pincodeError ? 'Please enter a valid 6-digit PIN code' : ''}
                                    />
                                </div>
                            </div>
                            <Modal open={open} onClose={handleClose}>
                                {/* Add your modal content here */}
                                <div>
                                    <Pincodemodel />
                                </div>
                            </Modal>


                            <div className='pincode_div_btn'>
                                <button variant="contained" className='pincodebtn' onClick={handleSubmit}>
                                    Continue
                                </button>
                            </div>
                        </div>

                    </Grid>
                </Grid>
            </div >
        </div>
    );
};

export default Pincode;
