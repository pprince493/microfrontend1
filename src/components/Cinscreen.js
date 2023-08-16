import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from '@material-ui/core/Slider';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import imgmob from '../assets/cin.svg';
import "../assets/css/cinscreen.css";
import upload from '../assets/upload.svg';
import capture from '../assets/capture.svg';
import nagarro_img from '../assets/nagarro_img.png';
import DeleteIcon from '@mui/icons-material/Delete';
import Webcam from 'react-webcam';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
//import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { Space, Switch } from "antd";
import { CheckCircle } from '@mui/icons-material';
import axios from 'axios';
import Header from './Header/Header';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';

const Cinscreen = () => {
    const [imageData, setImageData] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const navigate = useNavigate();
    const webcamRef = React.useRef(null);
    const [switchState, setSwitchState] = useState(false);
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [cinNumber, setCinNumber] = useState('');
    const [entityName, setEntityName] = useState('');
    const [dateOfRegistration, setDateOfRegistration] = useState('');
    const [entitystatus, setEntityStatus] = useState(false);
    const [entityCategory, setEntityCategory] = useState('');
    const [classofcompany, setClassOfCompany] = useState('');
    const location = useLocation();
    const panNumber = location.state;
    
    const latitude = 28.408913;
    const longitude = 77.408913;
    const userId = "1";



    const handleSubmit = () => {
        if (!imageData) {
            setError("please upload or capture image");
        }
        else {
            setError('');
            // navigate('/gstinscreen');

        }

    }


    const handleCaptureButtonClick = () => {
        setShowCamera(!showCamera); // Toggle the showCamera state to open/close the camera
    };

    const handleCaptureImage = async () => {
        setError('');
        const imageSrc = webcamRef.current.getScreenshot();
        setImageData(`Capture Image ${new Date().getTime()}`); // Set a custom name for the captured image
        setShowCamera(false); // Close the camera after capturing the image

        // Convert the data URI to a file object
        const file = dataURItoFile(imageSrc, 'capture.jpg');

        // Create a FormData object to send the image file
        const formData = new FormData();
        formData.append('file', file);
        formData.append('latitude', latitude);
        formData.append('panNumber', panNumber);
        formData.append('longitude', longitude);
        formData.append('userId', userId);


        // Make the API request to save the image data using Axios
        try {
            const response = await axios.post('http://13.235.177.48:9116/CinServices/cin', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle the response from the API
            console.warn(response);

            if (response.status === 201) {
                // Image data saved successfully
                const { cinNumber, dateOfRegistration, entityCategory, entityName, status, classOfCompany } = response.data.data;

                setValue(response); // Store the full response in the value state
                console.log('Image data saved to the database.');

                // Update other specific values as needed
                setCinNumber(cinNumber);
                setDateOfRegistration(dateOfRegistration);
                setEntityCategory(entityCategory);
                setEntityName(entityName);
                setEntityStatus(status);
                setClassOfCompany(classOfCompany);
            } else {
                // Error occurred while saving image data
                console.error('Failed to save image data.');
            }
        } catch (error) {
            console.error('Error occurred while making the API request:', error);
        }
    };

    const handleFileUpload = async (files) => {
        const file = files[0];
        setImageData(`Upload Image ${new Date().getTime()}`);
        setShowCamera(false);
        setError('');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('latitude', latitude);
        formData.append('panNumber', panNumber);
        formData.append('longitude', longitude);
        formData.append('userId', userId);

        try {
            const response = await axios.post('http://13.235.177.48:9116/CinServices/cin', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.warn(response);

            if (response.status === 201) {
                const {
                    cinNumber,
                    dateOfRegistration,
                    entityCategory,
                    entityName,
                    status,
                    classOfCompany,
                } = response.data.data;

                setValue(response);
                console.log('Image data saved to the database.');

                setCinNumber(cinNumber);
                setDateOfRegistration(dateOfRegistration);
                setEntityCategory(entityCategory);
                setEntityName(entityName);
                setEntityStatus(status);
                setClassOfCompany(classOfCompany);
            } else {
                console.error('Failed to save image data.');
            }
        } catch (error) {
            console.error('Error occurred while making the API request:', error);
        }
    };

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
        <div className='gstinmaincontainer'>
            <div className='header'><Header /></div>
            <div className='cincontainer1'>
                <Grid container className='cinrootGrid'>
                    {/* left grid */}
                    <Grid item xs={12} md={6} sm={12} lg={5} className="cinleftContainer">
                        <div>
                            <img
                                src={imgmob}
                                className="cinimageCalculator"
                                alt=""
                            />
                        </div>
                    </Grid>
                    {/* right grid */}
                    <Grid item xs={12} md={6} sm={12} lg={7} className="rightContainer">
                        <Grid>
                            <div className="cinnameRow">
                                <div>
                                    <h1 className='cin_h1'>Select Your KYC Proof</h1>
                                </div>
                                <div className='cinsubtitle'>
                                    <p className='cin_p'>Upload in PDF, JPEG, or PNG format & under 2MB.</p>
                                </div>
                            </div>
                            <div>
                                <div className='cinstatusBar1'></div>
                                <div className='cinstatusBar2'></div>
                            </div>
                        </Grid>
                        <div className='cinsliderSection'>
                            <div>
                                <p className='cin_p'>KYC Proof</p>
                            </div>
                            <div>
                                <select
                                    name="countrycode"
                                    id="countrycode"
                                    className='cinsalectcin'
                                >
                                    <option value="CIN">CIN</option>
                                </select>
                            </div>
                            {!imageData && (
                                <div className='cindivflex'>
                                    <div className="cindivupload">
                                        {/* Replace the upload button with an upload file area */}
                                        <label htmlFor="uploadInput" className="cinuploadArea">
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
                                    <div className="cindivcapture" onClick={handleCaptureButtonClick}>
                                        {/* Toggle the camera visibility based on the showCamera state */}
                                        {showCamera ? (

                                            <div className="modal_content">
                                                <div className='cameratitlediv'> <span>Image Capture</span>
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
                                            <Button variant="outlined" startIcon={<img src={capture} alt="" />} color="inherit" className="cincapturebtn">
                                                Capture
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {imageData && (
                                <div style={{ display: 'flex', marginTop: '10px' }}>
                                    <div className='cinimagenamearea'>

                                        <label className="cinUploadimgarea1" style={{ display: 'flex', position: 'relative', justifyContent: 'space-between' }}>

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
                        <div className="cinsliderSection1">
                            <div style={{ display: imageData ? 'block' : 'none' }}>
                                <div className='cindatatext'>
                                    <div className='cintextcontent'>
                                        <div className='cintextarea'>
                                            <p className='cin_p'>CIN No.</p>
                                            {cinNumber}
                                        </div>
                                        <div className='cintextarea'>
                                            <p className='cin_p'>Date of Registration</p>
                                            {dateOfRegistration}
                                        </div>
                                        <div className='cintextarea'>
                                            <p className='cin_p'>Entity Category</p>
                                            {entityCategory}
                                        </div>
                                    </div>
                                    <div className='cintextarea'>
                                        <div>
                                            <p className='cin_p'>Entity Name</p>
                                            {entityName}
                                        </div>
                                        <div className='cintextarea'>
                                            <p className='cin_p'>Entity Status</p>
                                            {entitystatus ? "Active" : "InActive"}
                                        </div>
                                        <div className='cintextarea'>
                                            <p className='cin_p'>Class of Company</p>
                                            {classofcompany}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <div className='cinsubmitButtonDiv'>
                            <button variant="contained" className='cinbtn' onClick={handleSubmit}>
                                Continue
                            </button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Cinscreen;
