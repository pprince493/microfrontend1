import React, { useEffect, useState } from 'react';
import '../assets/css/productdetails.css';
import Grid from '@mui/material/Grid';
import imgmob from '../assets/product_details.svg';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import loan_card1 from '../assets/account_img.png';
import loan_card2 from '../assets/credit-cards 1.png';
import loan_card3 from '../assets/loans_img.png';

import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backimg from '../assets/Group_89603.png'
import nagarro_img from '../assets/nagarro_img.png'
import Header from './Header/Header';



const Productdetails = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loandata, setloandata] = useState([]);
    const [isloading, setisloading] = useState(true);
    const [productcategory, setproductcategory] = useState('');
    const [subproductcategory, setsubproductcategory] = useState('');







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
    const handleproductcategory=(data)=>{
        setproductcategory(data);
        setError('');
    }
    const handlesubproductcategory = (data) => {
        setsubproductcategory(data);
        setError('');
    }


    const handleSubmit = () => {
        if (!selectedCard) {
            setError('Please select a card');
        }
        else if (!productcategory) {
            setError("Please select product category");
        }
        else if (!subproductcategory) {
            setError("Please select sub product category");
            // Retrieve the data of the selected card based on its identifier
        }
        else {
            if (selectedCard === 'card1') {

            } else if (selectedCard === 'card2') {

            } else if (selectedCard === 'card3') {
                setError('');
                // Pass the data for card3
                navigate('/login');
                console.log(loandata[2]);

            }

        }


    };




    return (
        <div className='productmaincontainer' >
            <div className='header'><Header /></div>

            <div className='productcontainer1'>
                <Grid container className='productrootgrid'>

                    <Grid xs={12} md={6} sx={{ display: { xs: 'none', sm: 'block' } }} className='productleftContainer'>
                        <div >
                            <img src={imgmob} className='product_img' alt="" />
                        </div>
                    </Grid>
                    <Grid xs={12} md={6} className="productrightContainer">

                        <div>


                            <div className='product_div_text'>
                                <h1 className='product_h1'>Choose the Product</h1>
                                <p className='product_p'>Select the product and sub-product</p>
                            </div>

                            <div className='productcardcontainer'>

                                <div className='productcardrow1'>
                                    <div>
                                        <Card
                                            className={`product_card ${selectedCard === '' ? 'selected' : ''}`}
                                            onClick={() => handleCardClick('')}
                                        >
                                            <div className='productdetail_card_redioicon'>
                                                {selectedCard === 'card1' ? (
                                                    <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} /> // Display the tick icon when selected
                                                ) : (
                                                    ''// Display the default radio button
                                                )}
                                            </div>


                                            <div className='productcardcontent'>
                                                <img src={loan_card1} className='product_cardimg' alt="" />



                                                <h4 className='productcardtextcontent'>Accounts</h4>


                                            </div>


                                        </Card>


                                    </div>
                                    <div>
                                        <Card
                                            className={`product_card ${selectedCard === '' ? 'selected' : ''}`}
                                            onClick={() => handleCardClick('')}
                                        >
                                            <div className='productdetail_card_redioicon'>
                                                {selectedCard === 'card2' ? (
                                                    <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} /> // Display the tick icon when selected
                                                ) : (
                                                    ''// Display the default radio button
                                                )}
                                            </div>


                                            <div className='productcardcontent'>
                                                <img src={loan_card2} className='product_cardimg' alt="" />

                                                <h4 className='productcardtextcontent'>Cards</h4>



                                            </div>
                                        </Card>
                                    </div>


                                    <div>
                                        <Card
                                            className={`product_card ${selectedCard === 'card3' ? 'selected' : ''}`}
                                            onClick={() => handleCardClick('card3')}
                                        >
                                            <div className='productdetail_card_redioicon'>
                                                {selectedCard === 'card3' ? (
                                                    <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} /> // Display the tick icon when selected
                                                ) : (
                                                    ''// Display the default radio button
                                                )}
                                            </div>


                                            <div className='productcardcontent'>
                                                <img src={loan_card3} className='product_cardimg' alt="" />


                                                <h4 className='productcardtextcontent'>Loans</h4>



                                            </div>
                                        </Card>


                                    </div>

                                </div>
                                {selectedCard && (
                                    <div>
                                        <div className='productsalectdiv'><p className='productsalecttext'>Product Category</p></div>
                                        <div>
                                            <select
                                                name="countrycode"
                                                id="countrycode"
                                                className='productdetailsalect'
                                                label='value'
                                                value={productcategory}
                                                
                                                onChange={(e) => handleproductcategory(e.target.value)}
                                            >
                                                <option value="">Select your product Category</option>
                                                <option value="commercial">Commercial</option>
                                                <option value="">Retail</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                                {productcategory && (
                                    <div>
                                        <div className='productsalectdiv'><p className='productsalecttext'>Sub-Product Category</p></div>
                                        <div>
                                            <select
                                                name="countrycode"
                                                id="countrycode"
                                                className='productdetailsalect'
                                                value={subproductcategory}
                                                onChange={(e) => handlesubproductcategory(e.target.value)}
                                            >
                                                <option value="">select your sub-product Category</option>
                                                <option value="business_loan">Business Loan</option>
                                            </select>
                                        </div>
                                    </div>
                                )}


                                {error && <div style={{ color: 'red' }}>{error}</div>}
                                <div className='productsubmitButtonDiv'>
                                    <button variant="contained" className='productbtn' onClick={handleSubmit}>
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

export default Productdetails;
