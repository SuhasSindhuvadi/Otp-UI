// App.js
import React, { useState } from 'react';
import OtpInput from './components/OtpInputs';
import './App.css';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');

  const generateOtp = () => {
    if(!phoneNumber || phoneNumber.length  !==10) {
      alert('Please enter a valid phone number');
      return;
    }
    else{
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setShowOtpInput(true);
    alert(`Your OTP is: ${otp}`);
    }
  };

  const handleOtpChange = (value) => {
    setEnteredOtp(value);
  };

  const handleSubmit = () => {
    if (enteredOtp === generatedOtp) {
      alert('OTP verification successful');
      setShowOtpInput(false);
      setPhoneNumber('');
      setEnteredOtp('');
    } else {
      alert('Incorrect OTP');
    }
  };

  return (
    <div className="app">
      <h1>OTP Verification</h1>
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="phone-input"
        />
        <button onClick={generateOtp} className="generate-btn">
          Generate OTP
        </button>
      </div>

      {showOtpInput && (
        <div>
          <OtpInput onChange={handleOtpChange} />
          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
