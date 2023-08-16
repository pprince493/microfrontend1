import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { useContext } from 'react';
import Registrationcontext from '../store/registrationcontext';
import '../assets/css/login.css';
import { Modal } from '@mui/material';
import Otpmodel from './Otpmodel';
import { postMob } from './Services';
import imgmob from '../assets/mob.svg';
import backimg from '../assets/Group_89603.png'
import nagarro_img from '../assets/nagarro_img.png'
import Header from './Header/Header';

const Login = () => {
    const { saveuserdata } = useContext(Registrationcontext);
    const { userdata } = useContext(Registrationcontext);
    const [mobileNumber, setmobilenumber] = useState('');
    const [countryCode, setcountrycode] = useState('+91'); // set default country code
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMobileNumberChange = (event) => {
        let mobilenumber = event.target.value.toString()
        setmobilenumber(event.target.value.toString());
        console.log(mobileNumber);


        const contact = {

            contact: {

                digits: mobilenumber,

                active: true,

                countryCode: countryCode,

                country: "India"

            }

        }
        console.log(contact)
        saveuserdata(contact)
        console.log(userdata);
    };

    const handleCountryCodeChange = (event) => {
        setcountrycode(event.target.value);
        console.log(event.target.value);
    };

    const validateMobileNumber = () => {
        const isValidNumber = /^([+]?\d{1,3}[.-\s]?)?(\d{10})$/.test(mobileNumber);
        if (!isValidNumber || mobileNumber.length !== 10) {
            setErrorMessage('Please enter a valid mobile number');
        } else {
            setErrorMessage("");
           pass_mob_data();// Call the API function
            

        }
    };

    function pass_mob_data() {
        console.warn({ countryCode, mobileNumber });
        let data = { countryCode, mobileNumber };
        handleOpen();
        // postMob(data)
        //     .then((result) => {
        //         // navigate('/Otp', { state: mobileNumber });
        //         handleOpen();
        //         console.warn('result', result);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    }
    return (
        <div className='loginmaincontainer' >
            <div className='header'><Header /></div>

            <div className='logincontainer1'>
                <Grid container className='grid'>

                    <Grid xs={12} md={6} >
                        <div>
                            <img src={imgmob} className='login_img' alt="" />
                        </div>
                    </Grid>


                    <Grid xs={12} md={6}>
                        <div>

                            <div className='login_div_text'>
                                <h1 className='login_h1'>Enter your mobile number</h1>


                                <p className='login_p'>We need your mobile number to send you the verification code.</p>
                            </div>
                            <div className='login_div_textfield'>
                                <p className='login_p_textfield'>Phone number</p>
                                <div>
                                    <TextField
                                        type='number'
                                        id="outlined-size-small"
                                        size="small"
                                        label=""
                                        placeholder="xxxxxxxxxx"
                                        variant="outlined"
                                        value={mobileNumber}
                                        onChange={handleMobileNumberChange}
                                        error={errorMessage !== ''}
                                        helperText={errorMessage}
                                        className='login_textfield'


                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <select
                                                        name="countrycode"
                                                        id="countrycode"
                                                        style={{
                                                            border: 'none', // Hide the default border
                                                            outline: 'none', // Remove the outline on focus
                                                            boxShadow: 'none', // Remove the box shadow
                                                            background: 'transparent', // Make the background transparent
                                                            padding: '0', // Remove padding
                                                            borderRight: '1px solid #000', // Show only the right border
                                                            borderRadius: '0' // Remove border radius

                                                        }}
                                                        onChange={handleCountryCodeChange} // Call the event handler on select change
                                                        value={countryCode} // Set the selected value from state
                                                    >
                                                        <option value="+91">+91</option>

                                                    </select>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='login_div_btn'>
                                <button variant="contained" className='loginbtn' onClick={validateMobileNumber}>
                                    Verify
                                </button>
                            </div>

                        </div>
                    </Grid>

                </Grid>
                <Modal open={open} onClose={handleClose}>
                    {/* Add your modal content here */}
                    <div>
                        <Otpmodel countryCode={countryCode} mobileNumber={mobileNumber} />
                    </div>
                </Modal>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ backgroundImage: `url(${backimg})` }}>

                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default Login;
