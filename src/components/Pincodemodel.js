import React, { useContext, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '../assets/css/pincodemodel.css';
import imgmob from '../assets/pincodemodel.png';
// import { useNavigate } from 'react-router-dom';
import Registrationcontext from "../store/registrationcontext";

const Pincodemodel = () => {
    // const navigate = useNavigate();
    const { saveuserdata } = useContext(Registrationcontext);
    const [modalVisible, setModalVisible] = useState(true); // State variable to control the visibility of the modal
    
    const handleSubmit = () => {
        saveuserdata();
       // navigate('/pincode');
        setModalVisible(false); // Hide the modal after submitting
    };

    return (
        <div>
            {modalVisible && (
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
                        <div className="pincodemodel_text">
                            <h1 className="pincodemodal_h1">This is not serviceable pincode</h1>
                        
                        
                            <p className="pincodemodal_p">Please contact the customer support for more information. 180018010234</p>
                        </div>
                        <div className="pincodemodalimg_div">
                            <img src={imgmob} className="pincodemodelimg" alt="" />
                        </div>

                        <div className="pincodemodal_button">
                            <button variant="contained" className="pincodemodelbutton" onClick={handleSubmit}>Done</button>
                        </div>
                    </Box>
                </div>
            )}
        </div>
    );
};

export default Pincodemodel;
