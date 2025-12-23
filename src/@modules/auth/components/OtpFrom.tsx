import { cn } from '@lib/utils/cn';
import { storage } from '@lib/utils/storage';
import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface IProps {
  onSubmitOTP: (values: string) => void;
  resendOTP: () => void;
}

const OtpForm: React.FC<IProps> = ({ onSubmitOTP, resendOTP }) => {
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);

  const [timer, setTimer] = useState({ minutes: 3, seconds: 0 });
  const otpInputRefs = useRef([]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.seconds > 0) {
        setTimer({ ...timer, seconds: timer.seconds - 1 });
      } else if (timer.minutes > 0) {
        setTimer({ minutes: timer.minutes - 1, seconds: 59 });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

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
        <p className="description">Enter the 6 digit code sent to {storage.getData('identifier')}</p>
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
      <div className="timer">
        {timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
      </div>
      <p className="mt-[12px] text-center text-[var(--primary-300)]">
        Do not send OTP?{' '}
        <button
          className={cn(
            ` ${
              timer.minutes === 0 && timer.seconds === 0
                ? 'cursor-pointer text-[var(--primary-500)]'
                : 'cursor-not-allowed text-gray-400'
            }`,
          )}
          onClick={() => {
            resendOTP();
            setTimer({ minutes: 2, seconds: 30 });
          }}
          disabled={timer.minutes === 0 && timer.seconds === 0 ? false : true}
        >
          Resend OTP
        </button>
      </p>

      <div className="flex justify-center">
        <Button type="primary" onClick={() => onSubmitOTP(inputValues.join(''))} className="verify_btn">
          Verify
        </Button>
      </div>
    </div>
  );
};

export default OtpForm;
