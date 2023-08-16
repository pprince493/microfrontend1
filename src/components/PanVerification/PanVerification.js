import React, { useState, useRef, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Header from '../Header/Header';
import { TextField } from '@mui/material';
import imgmob from '../../assets/leftpan.svg';
import card1 from '../../assets/EntityTypeImage/1.svg';
import card2 from '../../assets/EntityTypeImage/2.svg';
import card3 from '../../assets/EntityTypeImage/3.svg';
import card4 from '../../assets/EntityTypeImage/4.svg';
import card5 from '../../assets/EntityTypeImage/5.svg';
import CloseIcon from '@mui/icons-material/Close';
import "../PanVerification/panVerification.css";
import upload from '../../assets/upload.svg';
import capture from '../../assets/capture.svg';
import Card from '@mui/material/Card';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { CardContent, FormControlLabel, Checkbox, Button, Modal, Box } from '@material-ui/core';
import Webcam from 'react-webcam';
import { CheckCircle } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { postPanData } from '../Services'
import { Navigate, useNavigate } from 'react-router-dom';


const PanVerification = () => {

    const navigate = useNavigate();

    const [selectedCard, setSelectedCard] = useState(null);
    const [errormsg, seterrormsg] = useState('');
    const [panNumber, setpanNumber] = useState('');
    const [imageData, setImageData] = useState(null);

    const [showCamera, setShowCamera] = useState(false);
    const [showAfterPan, setshowAfterPan] = useState(false);
    const [entityNameValue, setentityNameValue] = useState('');
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [file, setFile] = useState(null);
    const [consentChecked, setConsentChecked] = useState(false);
    const [latitude, setlatitude] = useState(0);
    const [longitude, setlongitude] = useState(0);

    const webcamRef = React.useRef(null);



    const userId = localStorage.getItem('userID');
    console.log(userId)

    const dataObject = {

        card1: { image: card1, content: 'Individual' },
        card2: { image: card2, content: 'Sole Proprietorship' },
        card3: { image: card3, content: 'Company' },
        card4: { image: card4, content: 'Partnership' },
        card5: { image: card5, content: 'Trust & Society' }
    }

    const handleCheckboxChange = (event) => {
        setConsentChecked(event.target.checked);
    };



    const [dateValue, setdateValue] = useState();

    const handledDateChange = (e) => {
        console.log(e.target.value)
        let dateStr = e.target.value;

        const currentDate = new Date().toISOString().split('T')[0];

        if (dateStr > currentDate) {
            dateStr = currentDate;
        }
        setdateValue(dateStr)

        const parts = dateStr.split('-');
        const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

        console.log(formattedDate);
        setSelectedDate(formattedDate);

        seterrormsg('')
        const formData = new FormData();

        formData.append('file', file);
        formData.append('panNumber', panNumber)
        formData.append('longitude', longitude)
        formData.append('latitude', latitude)
        formData.append('userId', userId)
        formData.append('dateOfIncorporation', formattedDate)

        console.log(formData)

        postPanData(formData)
            .then(result => {
                console.log(result)
                setentityNameValue(result.data.data.name)
            })
            .catch((error) => {
                console.error(error)
                seterrormsg(error.response.data.message)
            })

    };

    const handleSuccess = async (position) => {
        const { latitude, longitude } = position.coords;
        setlatitude(latitude)
        setlongitude(longitude)
    };
    const handleError = (error) => {
        console.error(error.message);
        alert("Somethig Went Wrong while fetching your exact location !! Please Trun On Your Location ")
    };

    const handleSubmit = () => {
        if (consentChecked) {
            navigate('/gstin', { state: panNumber })
        }
        else {
            seterrormsg("Please check our T&C")
        }

    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePan = (event) => {
        const { value } = event.target;
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        const newValue = value.toUpperCase();
        setInputValue(newValue);
        let cardId = null
        setpanNumber(newValue)

        if (isValidPanCardNo(newValue)) {
            setpanNumber(newValue)

            postPanDataMethod(newValue)

            cardId = handleEntityType(newValue)
            setSelectedCard(cardId);
            setshowAfterPan(true)

        } else {
            setshowAfterPan(false)
            setSelectedCard(null);
            setentityNameValue('')
        }
    };

    const handleFileUpload = (files) => {
        const file1 = files[0]

        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageData(file1.name); // Set the uploaded image name

                console.log(file1)
                setFile(file1);
                setShowCamera(false); // Close the camera after uploading the image
            };
            reader.readAsDataURL(file1);
        }
    };

    const savefilehandle = (file2) => {
        setFile(file2)
    }



    const handleCapture = () => {

        const imageSrc = webcamRef.current.getScreenshot();

        setImageData(`CapturedImage_${new Date().getTime()}`);
        const file2 = dataURItoFile(imageSrc, 'capture.jpeg');
        savefilehandle(file2)

        // const file2 = new File([imageSrc], 'captured_image.png', { type: 'image/png' });


        // const reader = new FileReader();
        // reader.onload = () => {
        //     setImageData(file2.name); // Set the uploaded image name

        //     console.log(file2);
        //     savefilehandle(file2)
        //     setShowCamera(false); // Close the camera after uploading the image
        // };
        // reader.readAsDataURL(file2);

        handleClose();
    };



    function postPanDataMethod(panNumber) {


    }

    const handleEntityType = (value) => {
        const choice = value[3];
        let ans = null;
        switch (choice) {
            case 'P':
                ans = 'card1'
                break;
            case 'C':
                ans = 'card3'
                break;
            case 'T':
                ans = 'card5'
                break;
            case 'F':
                ans = 'card2'
                break;
            default:
                ans = null
        }
        return ans
    }

    const isValidPanCardNo = (panCardNo) => {

        // Regex to check valid
        // PAN Number
        let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);

        // if PAN Number
        // is empty return false
        if (panCardNo == null) {
            return false;
        }

        // Return true if the PAN NUMBER
        // matched the ReGex
        if (regex.test(panCardNo) == true) {
            seterrormsg("")
            return true;
        }
        else {
            seterrormsg("Enter Correct pan card Number")
            return false;
        }
    }
    // const handleCaptureButtonClick = () => {
    //     setShowCamera(!showCamera); // Toggle the showCamera state to open/close the camera

    // };
    // const handleCaptureImage = async () => {
    //     setError('');
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     setImageData(`Capture Image ${new Date().getTime()}`); // Set a custom name for the captured image
    //     setShowCamera(false); // Close the camera after capturing the image
    //     // Convert the data URI to a file object
    //     const file = dataURItoFile(imageSrc, 'capture.jpg');
    //     // Create a FormData object to send the image file
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('latitude', latitude);
    //     formData.append('panNumber', panNumber);
    //     formData.append('longitude', longitude);
    //     formData.append('userId', userId);


    // Make the API request to save the image data using Axios
    //     try {
    //         const response = await axios.post('http://localhost:9083/cin', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         console.warn(response);
    //         if (response.status === 201) {

    //             // Image data saved successfully
    //             const { cinNumber, dateOfRegistration, entityCategory, entityName, status, classOfCompany } = response.data.data;
    //             setValue(response); // Store the full response in the value state
    //             console.log('Image data saved to the database.');

    //             // Update other specific values as needed
    //             setCinNumber(cinNumber);
    //             setDateOfRegistration(dateOfRegistration);
    //             setEntityCategory(entityCategory);
    //             setEntityName(entityName);
    //             setEntityStatus(status);
    //             setClassOfCompany(classOfCompany);
    //         } else {
    //             // Error occurred while saving image data
    //             console.error('Failed to save image data.');
    //         }
    //     } catch (error) {
    //         console.error('Error occurred while making the API request:', error);
    //     }
    // };

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
        return new File([u8arr], fileName, { type: mime })
    };



    return (
        <div className='maincontainer bordertopbottom-main'>
            <div className='header'><Header /></div>
            <div className='containerPan'>
                <div className='bgimage1'></div>
                <Grid container className=''>
                    {/* left grid */}
                    <Grid item xs={12} md={6} sm={12} lg={4} className="leftContainer">
                        <img
                            src={imgmob}
                            className="imageCalculator1"
                            alt="kyc image"
                        />
                    </Grid>
                    {/* right grid */}
                    <Grid item xs={12} md={6} sm={12} lg={8} className="rightContainer" >
                        <Grid>
                            <div className="nameRow">
                                <div className='titlerow'>
                                    <h1 >Verify your business PAN Card </h1>
                                </div>
                                <div className='panSubtitle'>
                                    <p>Upload in PDF, jpeg or png format & under 2MB.</p>
                                </div>
                            </div>
                            <div>
                                <div className='statusBar1'>
                                </div>
                                <div className='statusBar2'>
                                </div>
                            </div>
                        </Grid>
                        {!imageData && (
                            <div className="CapturNUploadDiv">

                                <div className="Pandivupload">
                                    {/* Replace the upload button with an upload file area */}
                                    <label htmlFor="uploadInput" className="PanUploadArea1">
                                        <input
                                            type="file"
                                            id="uploadInput"
                                            accept=".pdf,.jpeg,.png"
                                            style={{ display: "none" }}
                                            onChange={(e) => handleFileUpload(e.target.files)}
                                        />
                                        <img src={upload} alt="" />  Upload
                                    </label>
                                </div>

                                <div className="pancapturebtn" >
                                    <Button onClick={handleOpen} startIcon={<img src={capture} alt="" />} className="panbuttoncapturebtn">
                                        Capture
                                    </Button>
                                    <Modal open={open} onClose={handleClose}>
                                        <Box className="modal_content">
                                            <div className='cameratitlediv'> <span>Pan Card Image</span>
                                                <span className='cameraSubtitle'>Place your pan card in white Frame</span>
                                            </div>
                                            <div className='cameraDiv'>
                                                <Webcam audio={false} height={'130%'} width={'100%'} ref={webcamRef} screenshotFormat="image/jpeg" />
                                                <div className='cameraDottedLine'></div>
                                                <div className='shutterbuttondiv' onClick={handleCapture}></div>
                                                <CameraAltIcon className='shutterProp' onClick={handleCapture} ></CameraAltIcon>
                                            </div>
                                            <CloseIcon variant="contained" onClick={handleClose} className="closebtnmodal"></CloseIcon>
                                        </Box>
                                    </Modal>
                                </div>
                            </div>
                        )}
                        {imageData && (
                            <div className='PanInputfield' style={{ display: 'flex' }}>
                                <div className='imagenamearea'>

                                    <label className="PanUploadimgarea1" style={{ display: 'flex', position: 'relative', justifyContent: 'space-between' }}>

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




                        <div className='PanInputfield'>
                            <div className='fieldlable'>Pan Number</div>
                            <TextField
                                onChange={handleChangePan}
                                className="inputField"
                                type='String'
                                inputProps={{ maxLength: 10, style: { textTransform: 'uppercase' } }}

                            />
                            <div className='fieldlable'> DOI/DOB </div>

                            <TextField
                                onChange={handledDateChange}
                                className="inputField"
                                type='Date'
                                value={dateValue}

                            />

                            {showAfterPan && (<>
                                <div className='fieldlable'>Entity Name</div>
                                <TextField
                                    className="inputField"
                                    type='String'
                                    value={entityNameValue}

                                /></>
                            )}

                            {showAfterPan && (
                                <>
                                    <div className=''>Entity Type</div>


                                    <div className='card_containertemp'>

                                        {Object.keys(dataObject).map((cardKey) => (
                                            <div className="cardeach">
                                                <Card
                                                    key={cardKey}
                                                    className={`Pan_card2 ${selectedCard === cardKey ? 'selected' : ''}`}
                                                >
                                                    <div className='card_contentInner'>
                                                        <div><img src={dataObject[cardKey].image} alt="Card " /></div>
                                                        <div>{dataObject[cardKey].content}</div>

                                                    </div>

                                                    <CardContent >

                                                        {selectedCard === cardKey && (
                                                            <CheckCircle className="radioIconPan" style={{ color: '#47D7AC', height: '15px', position: 'absolute', top: 0, right: 10 }} />
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))}


                                    </div>
                                </>
                            )}
                        </div>

                        <div style={{ color: 'red' }}>{errormsg}</div>
                        {showAfterPan && (
                            <div style={{ marginTop: '10px' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={consentChecked}
                                            onChange={handleCheckboxChange}
                                            color="primary"
                                        />
                                    }
                                    label="I hereby provide my consent for application's Terms & Conditions & Credit Bureau Check."
                                />
                            </div>
                        )}
                        {showAfterPan && (
                            <div className='submitButtonDiv'>
                                <Button variant="contained" id="submitbutton" onClick={handleSubmit}>
                                    Continue
                                </Button>

                            </div>
                        )
                        }

                    </Grid>
                </Grid>

            </div>
        </div>
    );

}
export default PanVerification;