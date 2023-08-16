import React, { useContext, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Registrationcontext from '../store/registrationcontext';
import '../assets/css/name.css';
import imgmob from '../assets/img.svg';

const Name = () => {

    const { saveuserdata } = useContext(Registrationcontext);
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [error, setError] = useState('');
    function handleChange(event) {
        setname(event.target.value)
        console.log(event.target.value);
        const userName = { userName: event.target.value }
        saveuserdata(userName)
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validationError = validateNameField(name);
        setError(validationError);
    }
    function validateNameField(name) {
        if (name.trim().length === 0) {
            return 'Please enter a valid name, Field cannot be left blank';
        } else if (!/^[A-Za-z\s]{4,50}$/.test(name)) {
            return 'Please enter a valid name with alphabets only and between 4 to 50 characters long';
        } else {
            setError("");
            navigate('/login');
          //  return makeUser;
             // Validation succeeded
        }
    }

    // function makeUser() {
    //     console.warn({ name })
    //     let data = { name }
    //     postName(data)
    //         .then((result) => {
    //             navigate('/login');
    //             console.warn("result", result)
    //         })
    //         .catch((error) => {
    //             // Handle error
    //             console.error(error);
    //         });
    // }

    return (
        <div className='maincontainer'>
            <div className="div-name-header-container">
                <header className="name-header-container">
                
            </header>
            </div>

        <div className='namecontainer1'>
            <Grid container className='grid'>

                <Grid xs={12} md={6} >
                    <div>
                        <img src={imgmob} className='img' alt="" />
                    </div>
                </Grid>
                <Grid xs={12} md={6}>
                    <div className='formcontainer'>

                        <div className='div_h1'>


                            <h1 className='form_h1'>Verify your Name</h1>
                        </div>
                        <div className='div_p'>
                            <p className='form_p'>We need your Name</p>
                        </div>


                        <div className='div_textfield'>
                            <TextField
                                required
                                id="outlined-required"
                                label="Enter Name"
                                defaultValue=""
                                className='formtextfield'
                                onChange={handleChange}
                            />
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                        </div>
                        <div className='div_btn'>
                            <Button variant="contained" className='formbtn' onClick={handleSubmit}>Continue</Button>
                        </div>


                    </div>
                </Grid>


            </Grid>

        </div>
        </div>

    )
}

export default Name