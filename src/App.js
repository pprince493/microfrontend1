import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Name from './components/Name';
import Login from './components/Login';
import Pincode from './components/Pincode';
import Email from './components/Email';
import Otpmodel from './components/Otpmodel';
import Mob from './components/Mob';
import Pincodemodel from './components/Pincodemodel';
import LoanOffers1 from './components/Loanoffers1';
import LoanCalculator from './components/Calculator/LoanCalculator'
import Cinscreen from './components/Cinscreen';
import Gstinscreen from './components/Gstinscreen';
import Productdetails from './components/Productdetails';
import Userdetails from './components/Userdetails';
import Loandetails from './components/Loandetails';
import Welcome from './components/welcome';
import PanVerification from './components/PanVerification/PanVerification';

function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="login" element={<Login />} />
        
          <Route path="pincode" element={<Pincode />} />
          <Route path="email" element={<Email />} />
          
          
          <Route path='otpmodel' element={<Otpmodel/>}/>
          <Route path='mob' element={<Mob />} />
          
          <Route path='pincodemodel' element={<Pincodemodel />} />
          <Route path='loanoffers' element={<LoanOffers1 />} />
          
          <Route path='calculator' element={<LoanCalculator />} />
          <Route path='cin' element={<Cinscreen />} />
          <Route path='gstin' element={<Gstinscreen />} />
          <Route path='productdetails' element={<Productdetails />} />
          <Route path='userdetails' element={<Userdetails/>} />
          <Route path='loandetails' element={<Loandetails />} />
          <Route path='pan' element={<PanVerification />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
