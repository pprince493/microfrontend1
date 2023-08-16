import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Slider from '@material-ui/core/Slider';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, colors } from '@mui/material';
import Button from '@mui/material/Button';
import imgmob from '../assets/gstin.svg';
import "../assets/css/gstinscreen.css";
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
import axios from 'axios';
import { postGstinData, postgstindata1 } from './Services'
import Header from './Header/Header';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';



const Gstinscreen = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const navigate = useNavigate();
    const [imageData, setImageData] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const webcamRef = React.useRef(null);
    const [switchState, setSwitchState] = useState(false);
    const [isloading, setisloading] = useState(true);
    const [Gstindata, setGstindata] = useState([]);
    const [error, setError] = useState([]);
    const [tradename, settradename] = useState([]);
    const [nameofbusiness, setnameofbusiness] = useState([]);
    const [dateofregistration, setdateofregistration] = useState([]);
    const [entitystate, setentitystate] = useState([]);
    const [hsncode, sethsncode] = useState([]);
    const [turnoverfromrange, setturnoverfromrange] = useState([]);
    const [turnovertorange, setturnovertorange] = useState([]);
    const [registeredaddress, setregisteredaddress] = useState([]);
    const location = useLocation();
    const panNumber = location.state;
    const [datashow, setdatashow] = useState(false);
    const [filedata, setfiledata] = useState();
    const latitude = 28.408913;
    const longitude = 77.408913;
    const userId = "1";
    const gstin = "02AAACA4074D1Z19";

    useEffect(() => {
        postGstinData(panNumber).then((result) => {
            setGstindata(result.data.data);
            setisloading(false);
            console.log(result.data);

        })
    }, [])

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId);

        setdatashow(true);
        if (selectedCard) {
            // Retrieve the data of the selected card based on its identifier
            if (selectedCard === 'card1') {
                // Pass the data for card1
                settradename(Gstindata[0].tradeName);
                setnameofbusiness(Gstindata[0].natureOfBusiness);
                setdateofregistration(Gstindata[0].dateOfRegistration);
                setentitystate(Gstindata[0].entityStatus);
                sethsncode(Gstindata[0].hsnCode);
                setturnoverfromrange(Gstindata[0].annualTurnoverFromRange);
                setturnovertorange(Gstindata[0].annualTurnOverToRange);
                setregisteredaddress(Gstindata[0].registeredAddress);

            } else if (selectedCard === 'card2') {
                // Pass the data for card2
                settradename(Gstindata[1].tradeName);
                setnameofbusiness(Gstindata[1].natureOfBusiness);
                setdateofregistration(Gstindata[1].dateOfRegistration);
                setentitystate(Gstindata[1].entityStatus);
                sethsncode(Gstindata[1].hsnCode);
                setturnoverfromrange(Gstindata[1].annualTurnoverFromRange);
                setturnovertorange(Gstindata[1].annualTurnOverToRange);
                setregisteredaddress(Gstindata[1].registeredAddress);


            } else if (selectedCard === 'card3') {
                // Pass the data for card3
                settradename(Gstindata[2].tradeName);
                setnameofbusiness(Gstindata[2].natureOfBusiness);
                setdateofregistration(Gstindata[2].dateOfRegistration);
                setentitystate(Gstindata[2].entityStatus);
                sethsncode(Gstindata[2].hsnCode);
                setturnoverfromrange(Gstindata[2].annualTurnoverFromRange);
                setturnovertorange(Gstindata[2].annualTurnOverToRange);
                setregisteredaddress(Gstindata[2].registeredAddress);

            }
        }
    };



    console.warn(Gstindata);
    if (isloading) {
        return <>
            <p>Wait!!!! Data is being fetched from the server</p>
        </>
    }




    const handleCaptureButtonClick = () => {
        setShowCamera(!showCamera); // Toggle the showCamera state to open/close the camera

    };

    const handleCaptureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageData(`Capture Image ${new Date().getTime()}`); // Set a custom name for the captured image
        setShowCamera(false); // Close the camera after capturing the image
        const file = dataURItoFile(imageSrc, 'capture.jpg');
        setfiledata(file);
    };






    const handleFileUpload = async (files) => {
        const file = files[0];
        setImageData(`Upload Image ${new Date().getTime()}`);
        setShowCamera(false);
        setfiledata(file);
    };



    const handleSubmit = () => {
        if (!imageData) {
            setError("please upload or capture image");
        }
        else if (!selectedCard) {
            setError("please salect any card")
        }
        else {
            setError('');
            pass_data();
            navigate('/cin', { state: panNumber });


        }





    }
    async function pass_data() {
        const formData = new FormData();
        formData.append('file', filedata);
        formData.append('latitude', latitude);
        formData.append('panNumber', panNumber);
        formData.append('longitude', longitude);
        formData.append('userId', userId);
        formData.append('gstin', gstin);
        // axios.post(`http://localhost:9096/GSTINServices/gstin/data?latitude=${latitude}&longitude=${longitude}&panNumber=${panNumber}&gstin=${gstin}&userId=${userId}`).then((result) => {
        //         console.warn('result', result);
        //         alert('Data submitted');


        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
        try {
            const response = postgstindata1(formData)
            console.warn(response);
        }
        catch (error) {
            console.error('Error occurred while making the API request:', error);
        }


    }



    // Helper function to convert a data URI to a file object
    const dataURItoFile = (dataURI, fileName) => {
        if (!dataURI) {
            return null; // Return null or handle the error condition appropriately
        }

        const arr = dataURI.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
    };





    return (
        <div className='gstinmaincontainer' >
            <div className='header'><Header /></div>
            <div className='gstincontainer1'>
                <Grid container className="gstinrootGrid">
                    {/* left grid */}
                    <Grid item xs={12} md={6} sm={12} lg={5} className="gstinleftContainer">
                        <div>
                            <img src={imgmob} className="gstinimageCalculator" alt="Calculator" />
                            {/* Display the name of the uploaded image or captured image */}

                        </div>
                    </Grid>

                    {/* right grid */}
                    <Grid item xs={12} md={6} sm={12} lg={7} className="rightContainer">
                        <Grid>
                            <div className="gstinnameRow">
                                <div>
                                    <h1 className='gstin_h1'>Select Your Primary Proof</h1>
                                </div>
                                <div className="gstinsubtitle">
                                    <p className='gstin_p'>Upload in PDF, jpeg, or png format & under 2MB.</p>
                                </div>
                            </div>
                            <div>
                                <div className="gstinstatusBar1"></div>
                                <div className="gstinstatusBar2"></div>
                            </div>
                        </Grid>
                        <div className="gstinsliderSection">
                            <div>
                                <p className='gstin_p'>KYC Proof</p>
                            </div>
                            <div>
                                <select name="countrycode" id="countrycode" className="gstinsalectcin">
                                    <option value="CIN">GSTIN</option>
                                </select>
                            </div>
                            {!imageData && (
                                <div className="gstindivflex">
                                    <div className="gstindivupload1">
                                        {/* Replace the upload button with an upload file area */}
                                        <label htmlFor="uploadInput" className="gstinuploadArea">
                                            <input
                                                type="file"
                                                id="uploadInput"
                                                accept=".pdf,.jpeg,.png"
                                                style={{ display: "none" }}
                                                onChange={(e) => handleFileUpload(e.target.files)}
                                            />
                                            <img src={upload} alt="" /> Upload
                                        </label>
                                    </div>
                                    <div className="gstindivcapture" onClick={handleCaptureButtonClick}>
                                        {/* Toggle the camera visibility based on the showCamera state */}
                                        {showCamera ? (

                                            <div className="modal_content">
                                                <div className='cameratitlediv'> <span>Capture Image</span>
                                                    <span className='cameraSubtitle'>Place your Image in white Frame</span>
                                                </div>
                                                <div className='cameraDiv'>
                                                    <Webcam audio={false} height={'130%'} width={'100%'} ref={webcamRef} screenshotFormat="image/jpeg" />
                                                    <div className='cameraDottedLine'></div>
                                                    <div className='shutterbuttondiv' onClick={handleCaptureImage}></div>
                                                    <CameraAltIcon className='shutterProp' onClick={handleCaptureImage} ></CameraAltIcon>
                                                </div>
                                                <CloseIcon variant="contained" onClick={handleCaptureImage} className="closebtnmodal"></CloseIcon>
                                            </div>

                                        ) : (
                                            <Button variant="outlined" startIcon={<img src={capture} alt="" />} color="inherit" className="gstincapturebtn1">
                                                Capture
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                           {imageData && (
                            <div  style={{ display: 'flex' , marginTop:'10px' }}>
                                <div className='gstinimagenamearea'>

                                    <label className="gstinUploadimgarea1" style={{ display: 'flex', position: 'relative', justifyContent: 'space-between' }}>

                                        <div >
                                            <p >{imageData}</p>
                                        </div>
                                        <div id='deleteIcon'>
                                            <DeleteIcon onClick={() => setImageData(null)} />
                                        </div>
                                    </label>

                                </div>
                                <div style={{}}>
                                    {imageData ? (
                                        <CheckCircle className="radioIconPan" style={{ color: '#47D7AC' }} />
                                    ) : null}
                                </div>
                            </div>
                        )}



                        </div>
                        <div className="gstinsliderSection1">
                            <div>
                                <p className='gstin_p'>Select one</p>
                            </div>
                            <div className="gstincarddivflex">
                                <div>
                                    <Card
                                        className={`gst_card ${selectedCard === 'card1' ? 'selected' : ''}`}
                                        onClick={() => handleCardClick('card1')}
                                    >
                                        <div style={{ marginLeft: '85%', marginTop: '1px', height: '10px' }}>
                                            {selectedCard === 'card1' ? (
                                                <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} />
                                            ) : null}
                                        </div>
                                        <div className='gstincardtext_div_upper'>
                                            <p className='gstincard_textarea_upper'>GSTIN-{Gstindata[0].gstinState}</p>
                                            <p className='gstincard_textarea_lower'>{Gstindata[0].gstinNumber}</p>

                                        </div>
                                        <div className='gstincardtext_div_lower'>
                                            <p className='gstincard_textarea_upper'>status</p>
                                            <p className='gstincard_textarea_lower'>{Gstindata[0].entityStatus}</p>

                                        </div>

                                    </Card>
                                </div>


                                <div>
                                    <Card
                                        className={`gst_card ${selectedCard === 'card2' ? 'selected' : ''}`}
                                        onClick={() => handleCardClick('card2')}
                                    >
                                        <div style={{ marginLeft: '85%', marginTop: '1px', height: '10px' }}>
                                            {selectedCard === 'card2' ? (
                                                <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} />
                                            ) : null}
                                        </div>
                                        <div className='gstincardtext_div_upper'>
                                            <p className='gstincard_textarea_upper'>GSTIN-{Gstindata[1].gstinState}</p>
                                            <p className='gstincard_textarea_lower'>{Gstindata[1].gstinNumber}</p>

                                        </div>
                                        <div className='gstincardtext_div_lower'>
                                            <p className='gstincard_textarea_upper'>status</p>
                                            <p className='gstincard_textarea_lower'>{Gstindata[1].entityStatus}</p>

                                        </div>

                                    </Card>
                                </div>


                                <div>
                                    <Card
                                        className={`gst_card ${selectedCard === 'card3' ? 'selected' : ''}`}
                                        onClick={() => handleCardClick('card3')}
                                    >
                                        <div style={{ marginLeft: '85%', marginTop: '1px', height: '10px' }}>
                                            {selectedCard === 'card3' ? (
                                                <CheckCircle className="radioIcon" style={{ color: '#47D7AC' }} />
                                            ) : null}
                                        </div>
                                        <div className='gstincardtext_div_upper'>
                                            <p className='gstincard_textarea_upper'>GSTIN-{Gstindata[2].gstinState}</p>
                                            <p className='gstincard_textarea_lower'>{Gstindata[2].gstinNumber}</p>

                                        </div>
                                        <div className='gstincardtext_div_lower'>
                                            <p className='gstincard_textarea_upper'>status</p>
                                            <p className='gstincard_textarea_lower'>{Gstindata[2].entityStatus}</p>

                                        </div>

                                    </Card>
                                </div>




                            </div>

                            <div style={{ display: datashow ? 'block' : 'none' }}>
                                <div className='gstindatatext'>
                                    <div className='gstintextcontent'>
                                        <div className='gstintextarea'>
                                            <p className='gstincarddata_p'>Trade Name</p>
                                            <p className='gstindatatext'>{tradename}</p>
                                        </div>

                                        <div className='gstintextarea'>
                                            <p className='gstincarddata_p'>Entity Status</p>
                                            <p className='gstindatatext'>  {entitystate}</p>

                                        </div>




                                    </div>


                                    <div className='gstintextcontent'>
                                        <div className='gstintextarea'>
                                            <p className='gstincarddata_p'>Nature Of Business</p>


                                            <p className='gstindatatext'>  {nameofbusiness} </p>
                                        </div>

                                        <div className='gstintextarea'>
                                            <p className='gstincarddata_p'>Hsn Code</p>

                                            <p className='gstindatatext'>   {hsncode} </p>
                                        </div>




                                    </div>



                                    <div className='gstintextcontent'>
                                        <div className='gstintextarea'>
                                            <p className='gstincarddata_p'>Date Of Registration</p>


                                            <p className='gstindatatext'>    {dateofregistration} </p>
                                        </div>

                                        <div className='gstintextarea'>
                                            <p className='gstincarddata_p'>Aggregate Annual Turnover Slab</p>

                                            <p className='gstindatatext'>   {turnoverfromrange}-{turnovertorange} </p>
                                        </div>




                                    </div>



                                </div>

                                <div style={{ marginRight: '120px' }}>
                                    <div className='gstintextarea'>
                                        <p className='gstincarddata_p'>Registration Address</p>

                                        <p className='gstindatatext'>     {registeredaddress}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <div>
                                <p className='gstin_p'>Can you provide a secondry KYC?</p>
                            </div>
                            <div>

                                <Space direction="vertical">
                                    <Switch

                                        checked={switchState}
                                        checkedChildren={<span className="yes-text">yes</span>}
                                        unCheckedChildren="no"
                                        className={switchState ? 'custom-switch checked' : 'custom-switch'}
                                        style={{ backgroundColor: switchState ? '#b4e4d3' : '' }} // Change the background color based on switch state
                                        onChange={(checked) => setSwitchState(checked)}
                                    />
                                </Space>

                                {/* <Space direction="vertical">
                                    <Switch
                                        checked={switchState}
                                        checkedChildren="yes"
                                        unCheckedChildren="no"
                                        className={switchState ? 'custom-switch checked' : 'custom-switch'} // Add the 'checked' class when switch is toggled
                                        onChange={(checked) => setSwitchState(checked)}
                                    />
                                </Space> */}

                            </div>
                        </div>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <div className='gstinsubmitButtonDiv'>
                            <button variant="contained" className='gstinbtn' onClick={handleSubmit}>
                                Continue
                            </button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Gstinscreen;
