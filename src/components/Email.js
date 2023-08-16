import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Registrationcontext from '../store/registrationcontext';
import '../assets/css/email.css';
import { postuserinfo } from './Services';
import imgmob from '../assets/img.svg';

const Email = () => {
    const { saveuserdata } = useContext(Registrationcontext);
    const { userdata } = useContext(Registrationcontext);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        const userEmail = { userEmail: event.target.value }
        saveuserdata(userEmail)
        console.log(userdata);

    };

    const validateEmail = () => {

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            setEmailError('Field cannot be left blank');
        } else if (!regex.test(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            console.log(userdata);
            setEmailError("");
            pass_email_data();
            // Perform further actions here, such as submitting the form
        }
    };


    function pass_email_data() {
        console.log({ userdata });
        let data = (userdata);

        postuserinfo(data)
            .then((result) => {
                console.warn('result', result);
                alert('Data submitted');
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        
    }




    return (
        <div className='container1'>
            <Grid container className='grid'>

                <Grid xs={12} md={6} >
                    <div>
                        <img src={imgmob} className='img' alt="" />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div>

                        <div className='div_h1'>
                                <h1 className='form_h1'>Enter your email address</h1>
                                </div>

                        <div className='div_p'>
                            <p className='form_p'>We’ll notify you of updates, status, and other important information.</p>
                               </div>
                        <div className='div_textfield'>
                                <TextField
                                    id="outlined-basic"
                                    label="Email Address"
                                    placeholder='xyz@gmail.com'
                                    variant="outlined"
                                    value={email}
                                    onChange={handleEmailChange}
                                    error={!!emailError}
                                    helperText={emailError}
                                    className='formtextfield'
                                />
                            </div>
                        <div className='div_btn'>
                                <Button variant="contained" className='formbtn' onClick={validateEmail}>
                                    Continue
                                </Button>
                            </div>
                        </div>
                    
                </Grid>
            </Grid>
        </div>
    );
}

export default Email;
