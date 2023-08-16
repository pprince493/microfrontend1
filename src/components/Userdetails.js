import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Registrationcontext from '../store/registrationcontext';
import { useNavigate } from 'react-router-dom';
import imgmob from '../assets/img.svg';
import axios from 'axios';
import '../assets/css/userdetails.css';
import { postuserinfo } from './Services';
import nagarro_img from '../assets/nagarro_img.png';

const Userdetails = () => {

    const { saveuserdata } = useContext(Registrationcontext);
    const { userdata } = useContext(Registrationcontext);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [lastname, setlastname] = useState("");
    const [Error, setError] = useState('');



    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        const userEmail = { userEmail: event.target.value }
        saveuserdata(userEmail)
        console.log(userdata);

    };

    function handlefirstnameChange(event) {
        setname(event.target.value)
        console.log(event.target.value);
        //const userName = { userName: event.target.value }
        //  saveuserdata(userName)
    };

    function handlelastnameChange(event) {
        setlastname(event.target.value)
        console.log(event.target.value);
        const userLastname = (event.target.value)
        console.log(name);
        const userName = { userName: name + ' ' + userLastname }
        saveuserdata(userName)
    };


    const validatedata = () => {

        const regexemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            setError('email field cannot be left blank');
        } else if (!regexemail.test(email)) {
            setError('Please enter a valid email address');
        }
        else if (!name) {
            setError('first name field cannot be left blank');
        }
        else if (!/^[A-Za-z\s]{4,50}$/.test(name)) {
            setError('Please enter a valid first name');
        }
        else if (!lastname) {
            setError('Lasr name field cannot be left blank')
        }
        else if (!/^[A-Za-z]{3,50}$/.test(lastname)) {
            setError('Please enter a valid last name');
        }

        else {
            console.log(userdata);
            setError("");
            pass_email_data();
            // Perform further actions here, such as submitting the form
        }



    };

    const setIDToLocalStorage = (id) => {
        localStorage.setItem('userID', id);
    };
    function pass_email_data() {
        console.log({ userdata });
        let data = (userdata);

        postuserinfo(data)
            .then((result) => {
                console.warn('result', result);



                // Usage
                setIDToLocalStorage(result.data.data.referenceId);
                navigate('/pincode');

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    return (
        <div className='userdetailsmaincontainer'>
            <div className="div-userdetails-header-container">
                <header className="userdetails-header-container">

                    <img src={nagarro_img} className='userdetails_header_img' alt="" />
                </header>
            </div>
            <div className='userdetailscontainer1'>
                <Grid container className='grid'>

                    <Grid xs={12} md={6} >
                        <div>
                            <img src={imgmob} className='userdetails_img' alt="" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>

                            <div className='userdetails_div_text'>
                                <h1 className='userdetails_h1'>Fill in your Details</h1>


                                <p className='userdetails_p'>we'll notify you of updates,status and other important information</p>
                            </div>
                            <div className='userdetails_div_textfield'>
                                <p className='userdetails_p_textfield'>Email Address</p>
                                <div>
                                    <TextField
                                        type='text'
                                        id="outlined-size-small"
                                        size="small"
                                        label=""
                                        placeholder='enter email address'
                                        variant="outlined"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className='userdetails_email_textfield'

                                    />
                                </div>
                            </div>
                            <div className='userdetailsnamediv'>
                                <div className='userdetails_div_textfield'>
                                    <p className='userdetails_p_textfield'>First Name</p>
                                    <div>
                                        <TextField
                                            type='text'
                                            id="outlined-size-small"
                                            size="small"
                                            label=""
                                            placeholder='enter first name'
                                            variant="outlined"
                                            onChange={handlefirstnameChange}
                                            className='userdetails_firstname_textfield'

                                        />
                                    </div>
                                </div>
                                <div className='userdetails_div_textfield'>
                                    <p className='userdetails_p_textfield'>Last Name</p>
                                    <div>
                                        <TextField
                                            type='text'
                                            id="outlined-size-small"
                                            size="small"
                                            label=""
                                            placeholder='enter last name'
                                            variant="outlined"
                                            onChange={handlelastnameChange}

                                            className='userdetails_lastname_textfield'

                                        />
                                    </div>
                                </div>
                            </div>
                            {Error && <div style={{ color: 'red' }}>{Error}</div>}
                            <div className='userdetails_div_btn'>
                                <button variant="contained" className='userdetailsbtn' onClick={validatedata}>
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

export default Userdetails;
