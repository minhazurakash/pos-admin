import { Button } from 'antd';
import React, { useRef, useState } from 'react';

interface IProps {
  onSubmit: (values: string) => void;
}

const TwoFaCodeFrom: React.FC<IProps> = ({ onSubmit }) => {
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);

  const otpInputRefs = useRef([]);

  const handlePaste = (ev) => {
    const clip = ev.clipboardData.getData('text').trim();
    const trimmedClip = clip.substring(0, 6);
    if (!/\d{5}/.test(trimmedClip)) return ev.preventDefault();

    const newValues = [...trimmedClip.split(''), '', '', '', '', ''];
    setInputValues(newValues);
    otpInputRefs.current[5].focus();
  };

  const handleInput = (ev, i) => {
    const newValues = [...inputValues];
    newValues[i] = ev.target.value.slice(-1);
    setInputValues(newValues);

    if (ev.target.value && i < 5) {
      otpInputRefs.current[i + 1].focus();
    }
  };

  const handleKeyDown = (ev, i) => {
    const newValues = [...inputValues];
    if (!ev.target.value && ev.key === 'Backspace' && i) {
      newValues[i - 1] = '';
      setInputValues(newValues);
      otpInputRefs.current[i - 1].focus();
    }
  };

  return (
    <div className="otp-form">
      <div>
        <div className="title-holder">
          {/* <OtpIcon /> */}icons
          <p className="title">Confirm Your Email ID</p>
        </div>
        <p className="description">Enter the 6 digit code form Google Authentication</p>
      </div>
      <div className="flex justify-center">
        <div className="field-holder">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="field_container">
              <input
                ref={(input) => (otpInputRefs.current[index] = input) as any}
                className="otp_field"
                maxLength={1}
                type="number"
                value={inputValues[index]}
                onPaste={handlePaste}
                onInput={(ev) => handleInput(ev, index)}
                onKeyDown={(ev) => handleKeyDown(ev, index)}
              />
              <p className="line text-[24px] text-[var(--primary-50)]">|</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button type="primary" onClick={() => onSubmit(inputValues.join(''))} className="verify_btn">
          Verify
        </Button>
      </div>
    </div>
  );
};

export default TwoFaCodeFrom;
