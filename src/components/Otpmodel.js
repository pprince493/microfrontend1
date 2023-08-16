import React, { useContext, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from "react-router-dom";
import Registrationcontext from "../store/registrationcontext";
import '../assets/css/otpmodel.css';
import { postOtp } from "./Services";
import { postMob } from './Services';

const Otpmodel = ({ countryCode, mobileNumber }) => {
    const { saveuserdata } = useContext(Registrationcontext);
    const navigate = useNavigate();
    const [otpdata, setOtpdata] = useState(new Array(6).fill(""));
    const [Error, setError] = useState('');

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtpdata([...otpdata.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };
   const resendsubmit=()=>{
        setError("");
        pass_mob_data()
    }
    function pass_mob_data() {
        console.warn({ countryCode, mobileNumber });
        let data = { countryCode, mobileNumber };
        // postMob(data)
        //     .then((result) => {
        //         // navigate('/Otp', { state: mobileNumber });
               
        //         console.warn('result', result);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

         };

    const handleSubmit = () => {
        saveuserdata();
        pass_otp();
    };

    function pass_otp() {
        const otp = otpdata.join(''); // Convert otp array to string
        console.warn({ countryCode, mobileNumber, otp });
        let data = { countryCode, mobileNumber, otp };
        
        if(otp===data.otp){
            navigate('/userdetails');

        }
        else{
            setError("Please Enter correct otp")
        }

        // postOtp(data)
        //     .then((result) => {
        //         const info = (result.status);
        //         if (info === 200) {
        //             navigate('/userdetails');
        //             console.warn('result', result);
        //         }
               
               
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //         setError(error.response.data.message);
        //     });

    }

    return (
        <div className="modalContainer">

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                className="otp_box"
            >
                <div className="otpmodal_text">
                    <h1 className="otpmodal_h1">Enter the verification code</h1>
                
                
                    <p className="otpmodal_p">We’ve sent it to your mobile number {mobileNumber}</p>
                </div>

                <div className="row">
                    <div className="col text-center">
                        <div modal_otp>
                            {otpdata.map((data, index) => {
                                return (
                                    <input
                                        //className="otp-field"
                                        type="text"
                                        name="otp"
                                        maxLength="1"
                                        key={index}
                                        value={data}
                                        className="otp-box"
                                        onChange={e => handleChange(e.target, index)}
                                        onFocus={e => e.target.select()}
                                    />
                                );
                            })}
                        </div>

                    </div>
                </div>

                <Button onClick={resendsubmit}>Resend otp</Button>
                {Error && <div style={{ color: 'red' }}>{Error}</div>}
                <div className="otpmodal_btn" style={{marginTop:'10%'}}>
                   
                    <button variant="contained" className="otpmodelbtn" onClick={handleSubmit}>Continue</button>
                   
                </div>
            </Box>
        </div>
    );
};

export default Otpmodel;
