

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Slider from '@material-ui/core/Slider';
import { TextField, colors } from '@mui/material';
import Button from '@mui/material/Button';
import imgmob from '../assets/loandetails_img.svg';
import "../assets/css/loandetails.css";
import upload from '../assets/upload.svg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import Webcam from 'react-webcam';
import capture from '../assets/capture.svg';
import nagarro_img from '../assets/nagarro_img.png';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
//import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { Space, Switch } from "antd";
import { useNavigate } from 'react-router-dom';
import secure from '../assets/secureloan_img.svg';
import unsecure from '../assets/unsecureloan_img.svg'
import termloan from '../assets/termloan_img.png'
import overdraft from '../assets/overdraft_img.png'
import lineofcredit from '../assets/lineofcredit_img.png'




const Loandetails = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCard1, setSelectedCard1] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loandata, setloandata] = useState([]);
    const [isloading, setisloading] = useState(true);







    // const [selectedOption, setSelectedOption] = useState('');

    // const handleOptionChange = (value) => {
    //     setSelectedOption(value);
    // };

    // const handleSubmit = () => {
    //     if (selectedOption === '') {
    //         alert('Please select one option');
    //     } else {
    //         // Handle form submission or further processing here
    //     }
    // };


    const handleCardClick = (cardId) => {
        setSelectedCard(cardId);
        
    };
    const handleCardClick1 = (cardId1) => {
        setSelectedCard1(cardId1);
        
    };


    const handleSubmit = () => {
        if (!selectedCard) {
            setError('please salect loan type')
           
        }
        else if(!selectedCard1){
            setError('please salect loan product')
        }
        else {
            navigate('/login');;
        }
    };












   

    return (
        <div className='loandetailsmaincontainer' >
            <div className="div-loandetails-header-container">
                <header className="loandetails-header-container">
                    <img src={nagarro_img} className='loandetails_header_img' alt="" />
                </header>
            </div>
            <div className='loandetailscontainer1'>
                <Grid container className="loandetailsrootGrid">
                    {/* left grid */}
                    <Grid item xs={12} md={6} sm={12} lg={5} className="loandetailsleftContainer">
                        <div>
                            <img src={imgmob} className="loandetailsimageCalculator" alt="Calculator" />
                            {/* Display the name of the uploaded image or captured image */}

                        </div>
                    </Grid>

                    {/* right grid */}
                    <Grid item xs={12} md={6} sm={12} lg={7} className="rightContainer">
                        <Grid>
                            <div className="loandetailsnameRow">
                                <div>
                                    <h1 className='loandetails_h1'>Loan Details</h1>
                                </div>
                                <div className="loandetailssubtitle">
                                    <p className='loandetails_p'>Upload in PDF, jpeg, or png format & under 2MB.</p>
                                </div>
                            </div>
                            <div>
                                <div className="loandetailsstatusBar1"></div>
                                <div className="loandetailsstatusBar2"></div>
                            </div>
                        </Grid>
                        <div className='loandetailssection1'>
                            <div className='loancardheading_div'>
                                <h4 className='loancardheading'>Loan Type</h4>
                            </div>
                            <div className='loandetailscardsection1'>
                                <div>
                                    <Card
                                        className={`loandetails_card1 ${selectedCard === 'secure' ? 'selected' : ''}`}
                                        onClick={() => handleCardClick('secure')}
                                    >
                                        <div style={{ marginLeft: '80%', top: '5px', height: '25px' }}>
                                            {selectedCard === 'secure' ? (
                                                <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} /> // Display the tick icon when selected
                                            ) : (
                                                ''// Display the default radio button
                                            )}
                                        </div>


                                        <div className='loandetailscardcontent'>
                                            <img src={secure} className='product_cardimg' alt="" />

                                            <h4 className='loandetailscardtextcontent'>Secure</h4>



                                        </div>
                                    </Card>
                                </div>
                                <div>
                                    <Card
                                        className={`loandetails_card1 ${selectedCard === '' ? 'selected' : ''}`}
                                        onClick={() => handleCardClick('')}
                                    >
                                        <div style={{ marginLeft: '80%', top: '5px', height: '25px' }}>
                                            {selectedCard === 'unsecure' ? (
                                                <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} /> // Display the tick icon when selected
                                            ) : (
                                                ''// Display the default radio button
                                            )}
                                        </div>


                                        <div className='loandetailscardcontent'>
                                            <img src={unsecure} className='product_cardimg' alt="" />

                                            <h4 className='loandetailscardtextcontent'>Unsecure</h4>



                                        </div>
                                    </Card>
                                </div>
                                
                            </div>
                        </div>



                        <div className='loandetailssection2'>
                            <div className='loancardheading_div'>
                                <h4 className='loancardheading'>Loan Product</h4>
                            </div>
                            <div className='loandetailscardsection2'>
                                <div>
                                        
                                    <Card
                                        className={`loandetails_card2 ${selectedCard1 === 'termloan' ? 'selected' : ''}`}
                                        onClick={() => handleCardClick1('termloan')}
                                    >
                                        <div style={{ marginLeft: '80%', top: '5px', height: '25px' }}>
                                            {selectedCard1 === 'termloan' ? (
                                                <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} /> // Display the tick icon when selected
                                            ) : (
                                                ''// Display the default radio button
                                            )}
                                        </div>


                                        <div className='loandetailscardcontent'>
                                            <img src={termloan} className='loandetails_cardimg1' alt="" />

                                            <h4 className='loandetailscardtextcontent'>Term Loan</h4>



                                        </div>
                                    </Card>

                                </div>
                                <div>

                                    <Card
                                        className={`loandetails_card2 ${selectedCard1 === '' ? 'selected' : ''}`}
                                        onClick={() => handleCardClick1('secure')}
                                    >
                                        <div style={{ marginLeft: '80%', top: '5px', height: '25px' }}>
                                            {selectedCard1 === 'overdraft' ? (
                                                <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} /> // Display the tick icon when selected
                                            ) : (
                                                ''// Display the default radio button
                                            )}
                                        </div>


                                        <div className='loandetailscardcontent'>
                                            <img src={overdraft} className='loandetails_cardimg1' alt="" />

                                            <h4 className='loandetailscardtextcontent'>Overdraft</h4>



                                        </div>
                                    </Card>

                                </div>
                                <div>

                                    <Card
                                        className={`loandetails_card2 ${selectedCard1 === '' ? 'selected' : ''}`}
                                        onClick={() => handleCardClick1('secure')}
                                    >
                                        <div style={{ marginLeft: '80%', top: '5px', height: '25px' }}>
                                            {selectedCard1 === 'lineofcredit' ? (
                                                <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} /> // Display the tick icon when selected
                                            ) : (
                                                ''// Display the default radio button
                                            )}
                                        </div>


                                        <div className='loandetailscardcontent'>
                                            <img src={lineofcredit} className='loandetails_cardimg1' alt="" />

                                            <h4 className='loandetailscardtextcontent'>Line of Credit</h4>



                                        </div>
                                    </Card>

                                </div>
                            </div>
                        </div>
                            
                        {error && <div style={{ color: 'red' }}>{error}</div>} 
                        <div className='loandetailssubmitButtonDiv'>
                            <button variant="contained" className='loandetailsbtn' onClick={handleSubmit}>
                                Continue
                            </button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}




export default Loandetails