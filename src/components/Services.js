import axios from 'axios';
import { BASE_URL } from './Constants';

export function postName(data) {
    return axios.post(`${BASE_URL}/name`, data);
}

export function postMob(data) {
    return axios.post(`http://13.235.177.48:9116/otpService/api/v1/otp/generate`, data);
}

export function postOtp(data) {
    return axios.post(`http://13.235.177.48:9116/otpService/api/v1/otp/validate`, data);
}

export function postuserinfo(data) {
    return axios.post(`http://13.235.177.48:9116/user-service/api/users`, data);
}

export function getPanData(data){
    return axios.get(`http://13.235.177.48:9116/kycServices/pan`, data);
}

export function postPanData(data){
    return axios.post(`http://13.235.177.48:9116/kycServices/pan`, data);   
}

export function checkPincodeService(pincode){
    return axios.get(`http://13.235.177.48:9116/postalServices/postalRecords/isBlackListed/${pincode}`)

}
export function getLoanOffers(){
    return axios.get(`http://13.235.177.48:9116/loanOffersService/api/v1/loanOffers`)
}

export function postGstinData(panNumber){
    return axios.get(`http://13.235.177.48:9116/GSTINServices/gstin?panNumber=${panNumber}`)

}
export async function postgstindata1(formData){
   return await axios.post('http://13.235.177.48:9116/GSTINServices/gstin/data', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
export async function postcindata(formData){
    return await axios.post('http://13.235.177.48:9116/CinServices/cin', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

// http://localhost:8081/postalServices/postalRecords/121004