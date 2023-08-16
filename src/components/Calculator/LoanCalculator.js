import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Slider from '@material-ui/core/Slider';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import imgmob from '../../assets/caculator.svg'
import "../Calculator/LoanCalculator.css";
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';


const LoanCalculator = () => {
    const navigate = useNavigate();
    const location = useLocation();
    var data = location.state
    console.log(data)

    // const data = {
    //     loanFromRange: 1000000,
    //     loanToRange: 25000000,
    //     interestRateFromRange: 10,
    //     interestRateToRange: 12
    // }


    let loandata = [{

        loanFromRange: data.loanFromRange,

        loanToRange: data.loanToRange,

        MinInterestRate: data.interestRateFromRange,

        MaxInterestRate: data.interestRateToRange

    }]
   


    loandata = loandata[0]
    console.log(loandata)

    const [error1, setError1] = useState('')
    const [error2, setError2] = useState('')

    const rateCalculatorPerMonth = (ratePerYear) => {
        return ratePerYear / 12 / 100
    }

    function calculatorLoan(P, R, N) {
        let result = (P * R * ((1 + R) ** N)) / ((1 + R) ** N - 1);
        return result;
    }


    const defaultEmiValue1=(loandata)=>{
        let P = loandata.loanFromRange;
        let R1 = rateCalculatorPerMonth(loandata.MinInterestRate)
     
        let N = 10
        let result1 = calculatorLoan(P, R1, N)
     
        result1 = Math.round(result1);
       
        return result1
    }
    const defaultEmiValue2=(loandata)=>{
        let P = loandata.loanFromRange;
        let R2 = rateCalculatorPerMonth(loandata.MaxInterestRate)
        let N = 10
        let result2 = calculatorLoan(P, R2, N)
    
        result2 = Math.round(result2);
            return result2
    }

    const [loanSliderValue, setLoanSliderValue] = useState(loandata.loanFromRange);
    const [monthSliderValue, setMonthSliderValue] = useState(10);
    const [EMIValue1, setEMIValue1] = useState(defaultEmiValue1(loandata));
    const [EMIValue2, setEMIValue2] = useState(defaultEmiValue2(loandata));
    

    function handleLoanSliderChange(event, newValue) {

        setLoanSliderValue(newValue);
        setError1('')
        let P = newValue;
        let R1 = rateCalculatorPerMonth(loandata.MinInterestRate)
        let R2 = rateCalculatorPerMonth(loandata.MaxInterestRate)
        let N = (monthSliderValue)
        let result1 = calculatorLoan(P, R1, N)
        let result2 = calculatorLoan(P, R2, N)
        result1 = Math.round(result1);
        result2 = Math.round(result2);


        setEMIValue1(result1)
        setEMIValue2(result2)

    };
    function handleMonthSliderChange(event, newValue) {

        setMonthSliderValue(newValue);


        setError2('')

        let P = loanSliderValue;
        let R1 = rateCalculatorPerMonth(loandata.MinInterestRate)
        let R2 = rateCalculatorPerMonth(loandata.MaxInterestRate)
        let N = (newValue)
        let result1 = calculatorLoan(P, R1, N)
        let result2 = calculatorLoan(P, R2, N)
        result1 = Math.round(result1);
        result2 = Math.round(result2);

        setEMIValue1(result1)
        setEMIValue2(result2)
    };


    function handleLoanTextFieldChange(e) {
        let newValue = e.target.value

        setLoanSliderValue(e.target.value);

        let P = newValue;
        let R1 = rateCalculatorPerMonth(loandata.MinInterestRate)
        let R2 = rateCalculatorPerMonth(loandata.MaxInterestRate)
        let N = (monthSliderValue)

        let result1
        let result2

        if (P >= data.loanFromRange) {
            setError1('')
            result1 = calculatorLoan(P, R1, N)
            result2 = calculatorLoan(P, R2, N)
        }


        if (P < data.loanFromRange) {
            setError1('Loan Amount should be greater than ' + data.loanFromRange)
            result1 = 0;
            result2 = 0;
        }

        if (P > data.loanToRange) {
            setError1('Loan Amount should be Less than ' + data.loanToRange)
            result1 = calculatorLoan(P, R1, N)
            result2 = calculatorLoan(P, R2, N)
        }


        result1 = Math.round(result1);
        result2 = Math.round(result2);

        setEMIValue1(result1)
        setEMIValue2(result2)
    }

    function handleMonthTextFieldChange(e) {
        let newValue = e.target.value

        setMonthSliderValue(e.target.value);

        let P = loanSliderValue;
        let R1 = rateCalculatorPerMonth(loandata.MinInterestRate)
        let R2 = rateCalculatorPerMonth(loandata.MaxInterestRate)
        let N = (newValue)

        let result1
        let result2





        if (newValue >= 1) {
            setError2('')
            result1 = calculatorLoan(P, R1, N)
            result2 = calculatorLoan(P, R2, N)
        }
        if (N < 1) {
            setError2('Month should be Greater than ' + 1)
            result1 = 0
            result2 = 0
        }

        if (N > 60) {
            setError2('Month should be Less than ' + 60)
            result1 = 0
            result2 = 0
        }


        result1 = Math.round(result1);
        result2 = Math.round(result2);

        setEMIValue1(result1)
        setEMIValue2(result2)
    }


    function valuetext(value) {
        return `${value}`;
    }
    const marks1 = [{
        value: loandata.loanToRange,
        label: 'Rs. ' + loandata.loanToRange,
    },
    ];
    const marks2 = [


        {
            value: 60,
            label: '60 Months',
        },
    ];

    const submitbutton=()=>{
        navigate('/pan');
    }
    return (
        <div className='maincontainer bordertopbottom-main'>
            <div className='header'><Header /></div>

            <div container className='container'>
                <div className='bgimage2'></div>
                <Grid container className=''>
                {/* left grid */}
                <Grid item xs={12} md={6} sm={12} lg={4} className="leftContainer">
                    <div>
                        <img
                            src={imgmob}
                            className="imageCalculator"
                            alt="Calculator"
                        />
                    </div>
                </Grid>

                {/* right grid */}
                <Grid item xs={12} md={6} sm={12} lg={8} className="rightContainerCal" >
                    <Grid>
                        <div className="nameRow">
                            <div className='titlerow'>
                                <h1 >Calculate Loan</h1>
                            </div>
                            <div className='calSubtitle'>
                                <p>Pre-calculate your loan and know your EMI with interest rate.</p>
                            </div>
                        </div>
                        <div>
                            <div className='statusBar1'>
                            </div>
                            <div className='statusBar2'>
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        className="sliderSection">
                        <div >
                            <div className='sliderSubSection'>
                                <div className='inputAndLabel'>
                                    <div>Loan Amount :</div>

                                    <div>
                                        <TextField
                                            value={loanSliderValue}
                                            onChange={handleLoanTextFieldChange}
                                            className="inputField"
                                            type='number'
                                            inputProps={{
                                                min: data.loanFromRange,
                                                max: data.loanToRange
                                            }}
                                        />

                                    </div>
                                </div>

                                <Slider
                                    defaultValue={loandata.loanFromRange}
                                    min={loandata.loanFromRange}
                                    max={loandata.loanToRange}
                                    step={1000}
                                    aria-label="Loan Amount"
                                    getAriaValueText={valuetext}
                                    marks={marks1}
                                    valueLabelDisplay="auto"
                                    value={loanSliderValue}
                                    onChange={handleLoanSliderChange}
                                    className="green-slider"
                                />


                            </div>
                            <div className='sliderSubSection'>
                                <div className='inputAndLabel'>
                                    <div>Tenure (Months) </div>

                                    <div style={{paddingRight:'7px'}}>
                                        <TextField
                                            value={monthSliderValue}
                                            onChange={handleMonthTextFieldChange}
                                            className="inputField"
                                            type='number'
                                            inputProps={{
                                                min: 1,
                                                max: 60
                                            }}

                                        />

                                    </div>
                                </div>

                                <Slider
                                    defaultValue={12}
                                    min={1}
                                    max={60}
                                    aria-label="Tenure (Months)" // Add an aria-label attribute
                                    getAriaValueText={valuetext}
                                    marks={marks2}
                                    valueLabelDisplay="auto"
                                    value={monthSliderValue}
                                    onChange={handleMonthSliderChange}
                                    className="green-slider"
                                />


                            </div>
                        </div>
                    </Grid>

                    <div className='errorMessage'>{error1}</div>
                    <div className='errorMessage'>{error2}</div>
                    <Grid id="result" className="sliderSection">

                        <Grid id="resultRow-1" className='resultRows' container >
                            <Grid className='resultcol1' item xs={6}>
                                Loan Amount
                            </Grid>
                            <Grid className='resultcol2' item xs={6} data-testid="emi-value">
                                Rs. {`${loanSliderValue}`}
                            </Grid>
                        </Grid>
                        <Grid id="row-2" container className='resultRows'>
                            <Grid className='resultcol1' item xs={6}>
                                Tentative EMI Amount
                            </Grid>
                            <Grid item className='resultcol2' xs={6}>
                                Rs. {`${EMIValue1}- ${EMIValue2}`}
                            </Grid>
                        </Grid>
                        <Grid id="row-3" container className='resultRows'  >
                            <Grid className='resultcol1' item xs={6}>
                                Tentative interest Rate
                            </Grid>
                            <Grid item className='resultcol2' xs={6} >
                                {loandata.MinInterestRate}-{loandata.MaxInterestRate}%
                            </Grid>
                        </Grid>
                    </Grid>


                    <div>
                        <div className='submitButtonDiv'>
                            <Button variant="contained" id="submitbutton" onClick={submitbutton} >
                                Continue
                            </Button>
                        </div>
                    </div>

                </Grid>
                </Grid>
            </div>


        </div>
    );
};

export default LoanCalculator;