// OtpInput.js
import React, { useRef, useState } from 'react';
import './OtpInput.css';

const OtpInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (/^[0-9]/g.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(''));

      // Focus on next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle Backspace
    if (e.key === 'Backspace') {
      // If the current input is empty and not the first input, move focus to the previous input
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
      // If the current input is focused, clear it on Backspace
      else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        onChange(newOtp.join(''));
      }
    }
  };
  const handleFocus = (index) => {
    inputRefs.current[index].select();
  };

  return (
    <div className="otp-input-container">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={otp[index]}
          ref={(e) => (inputRefs.current[index] = e)}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => handleFocus(index)}
          className="otp-input"
        />
      ))}
    </div>
  );
};

export default OtpInput;
