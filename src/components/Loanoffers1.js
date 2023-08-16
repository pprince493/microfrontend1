import React, { useEffect, useState } from 'react';
import '../assets/css/loanoffers1.css';
import Grid from '@mui/material/Grid';
import imgmob from '../assets/loan_img.svg';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import loan_card1 from '../assets/loan_card1.svg';
import loan_card2 from '../assets/loan_card2.svg';
import loan_card3 from '../assets/loan_card3.svg';
import loan_card4 from '../assets/loan_card4.svg';
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backimg from '../assets/Group_89603.png'
import nagarro_img from '../assets/nagarro_img.png'
import {getLoanOffers} from './Services'
import Header from './Header/Header';
const LoanOffers1 = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loandata, setloandata] = useState([]);
    const [isloading, setisloading] = useState(true);
    useEffect(() => {
        getLoanOffers().then((result) => {
            setloandata(result.data.data);
            console.log(result.data);
            setisloading(false);
        })
    }, [])
    if (isloading) {
        return <>
            <p>Wait!!!! Data is being fetched from the server</p>
        </>
    }


    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

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
        setError('');
    };


    const handleSubmit = () => {
        if (selectedCard) {
            // Retrieve the data of the selected card based on its identifier
            if (selectedCard === 'card1') {
                // Pass the data for card1
                console.log(loandata[0]);
                navigate('/calculator', { state: loandata[0] });
            } else if (selectedCard === 'card2') {
                // Pass the data for card2
                navigate('/calculator', { state: loandata[1] });

                console.log(loandata[1]);
            } else if (selectedCard === 'card3') {
                // Pass the data for card3
                navigate('/calculator', { state: loandata[2] });
                console.log(loandata[2]);
            } else if (selectedCard === 'card4') {
                // Pass the data for card4
                navigate('/calculator', { state: loandata[3] });
                console.log(loandata[3]);
            }
        } else {
            setError('Please select a card');
        }
    };

    return (
        <div className='loanmaincontainer' >
            <div className='header'><Header /></div>

            <div className='loancontainer1'>
                <Grid container className='loanrootgrid'>

                    <Grid xs={12} md={4} sx={{ display: { xs: 'none',sm: 'block' } }} className='loanleftContainer'>
                        <div >
                            <img src={imgmob} className='loan_img' alt="" />
                        </div>
                    </Grid>
                    <Grid xs={12} md={8} className="loanrightContainer">

                        <div>


                            <div className='loan_div_text'>
                                <h1 className='loan_h1'>Offers</h1>
                                <p className='loan_p'>Select your loan offers</p>
                            </div>
                            <div className='loanpageslider'>
                                <div className="loanstatusBar1"></div>
                                <div className="loanstatusBar2"></div>
                            </div>
                            <div className='loancardcontainer'>
                                
                                <div className='loadcardrow1'>
                                    <div>
                                        <Card
                                            className={`loan_card ${selectedCard === 'card1' ? 'selected' : ''}`}
                                            onClick={() => handleCardClick('card1')}
                                        >
                                            <div style={{ marginLeft: '85%', top: '5px', height: '25px' }}>
                                                {selectedCard === 'card1' ? (
                                                    <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} /> // Display the tick icon when selected
                                                ) : (
                                                    ''// Display the default radio button
                                                )}
                                            </div>


                                            <div className='loancardcontent'>
                                                <img src={loan_card1} className='loan_cardimg' alt="" />



                                                <h4>Rs {loandata[0].loanFromRange / 100000}L - Rs {loandata[0].loanToRange / 100000}L</h4>
                                                <p className='loanamount'>Loan Amount</p>
                                                <p>{loandata[0].requiredDocs}</p>

                                            </div>


                                        </Card>


                                    </div>
                                    <div>
                                        <Card
                                            className={`loan_card ${selectedCard === 'card2' ? 'selected' : ''}`}
                                            onClick={() => handleCardClick('card2')}
                                        >
                                            <div style={{ marginLeft: '85%', top: '5px', height: '25px' }}>
                                                {selectedCard === 'card2' ? (
                                                    <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} /> // Display the tick icon when selected
                                                ) : (
                                                    ''// Display the default radio button
                                                )}
                                            </div>


                                            <div className='loancardcontent'>
                                                <img src={loan_card2} className='loan_cardimg' alt="" />

                                                <h4>Rs {loandata[1].loanFromRange / 100000}L - Rs {loandata[1].loanToRange / 100000}L</h4>

                                                <p className='loanamount'>Loan Amount</p>
                                                <p>{loandata[1].requiredDocs}</p>

                                            </div>
                                        </Card>
                                    </div>
                                </div>
                                <div className='loadcardrow2'>
                                    <div>
                                        <Card
                                            className={`loan_card ${selectedCard === 'card3' ? 'selected' : ''}`}
                                            onClick={() => handleCardClick('card3')}
                                        >
                                            <div style={{ marginLeft: '85%', top: '5px', height: '25px' }}>
                                                {selectedCard === 'card3' ? (
                                                    <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} /> // Display the tick icon when selected
                                                ) : (
                                                    ''// Display the default radio button
                                                )}
                                            </div>


                                            <div className='loancardcontent'>
                                                <img src={loan_card3} className='loan_cardimg' alt="" />


                                                <h4>Rs {loandata[2].loanFromRange / 100000}L - Rs {loandata[2].loanToRange / 100000}L</h4>

                                                <p className='loanamount'>Loan Amount</p>
                                                <p>{loandata[2].requiredDocs}</p>

                                            </div>
                                        </Card>


                                    </div>
                                    <div>
                                        <Card
                                            className={`loan_card ${selectedCard === 'card4' ? 'selected' : ''}`}
                                            onClick={() => handleCardClick('card4')}
                                        >
                                            <div style={{ marginLeft: '85%', top: '5px', height: '25px' }}>
                                                {selectedCard === 'card4' ? (
                                                    <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} /> // Display the tick icon when selected
                                                ) : (
                                                    '' // Display the default radio button
                                                )}
                                            </div>

                                            <div className='loancardcontent'>

                                                <img src={loan_card4} className='loan_cardimg' alt="" />


                                                <h4>Rs {loandata[3].loanFromRange / 100000}L - Rs {loandata[3].loanToRange / 100000}L</h4>

                                                <p className='loanamount'>Loan Amount</p>
                                                <p>{loandata[3].requiredDocs}</p>
                                            </div>

                                        </Card>

                                    </div>
                                </div>



                                {error && <div style={{ color: 'red' }}>{error}</div>}
                                <div className='loansubmitButtonDiv'>
                                    <button variant="contained" className='loanbtn' onClick={handleSubmit}>
                                        Continue
                                    </button>
                                </div>

                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default LoanOffers1;
