'use client';

import { apiMessages } from '@lib/constant/apiMessages';
import { Paths } from '@lib/constant/paths';
import { cn } from '@lib/utils/cn';
import { storage } from '@lib/utils/storage';
import { Button, Col, Form, Input, Row, message, notification } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { ImagePaths } from '@lib/constant/imagePaths';
import Link from 'next/link';
import { identifierKey, otpHashKey } from '../lib/constants';
import { useResetPassReq, useResetPassVerify, useSendOtp } from '../lib/hooks';
import { setAuthSession } from '../lib/utils';
// import AuthSlider from './AuthSlider';

const ResetPassword = () => {
  const router = useRouter();
  const [messageApi, msgCtx] = message.useMessage();
  const [resetPassFormInstance] = Form.useForm();

  //   let callbackUrl = router.query?.callbackUrl?.toString();
  //   callbackUrl = callbackUrl ? callbackUrl : pathToUrl('');

  const identifier = router.query?.identifier?.toString();
  useEffect(() => {
    resetPassFormInstance.setFieldValue('identifier', identifier);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identifier]);

  const resetPasswordSteps = [
    {
      stepNumber: 1,
      title: 'Get Email',
    },
    {
      stepNumber: 2,
      title: 'Get OTP',
    },
    {
      stepNumber: 3,
      title: 'Reset Password',
    },
  ];

  const [resetPasswordStep, setResetPasswordStep] = useState<{
    stepNumber: number;
    title: string;
  }>(resetPasswordSteps[0]);

  useEffect(() => {
    setResetPasswordStep(storage.getData(otpHashKey) ? resetPasswordSteps[1] : resetPasswordSteps[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetPassReqFn = useResetPassReq({
    config: {
      onSuccess(data) {
        if (!data?.success) return;
        storage.setData(otpHashKey, data?.data?.hash);
        storage.setData(identifierKey, data?.data?.identifier);
        setResetPasswordStep(resetPasswordSteps[1]);
        return;
      },
    },
  });

  const resetPassVerifyFn = useResetPassVerify({
    config: {
      onSuccess(data) {
        if (!data?.success) return;
        setResetPasswordStep(resetPasswordSteps[0]);
        storage.removeData(otpHashKey);
        storage.removeData(identifierKey);
        setAuthSession(data?.data);
        messageApi.loading(apiMessages.login, 1).then(() => router.push(Paths.auth.login));
      },
    },
  });

  const otpResendFn = useSendOtp({
    config: {
      onSuccess(data) {
        if (!data.success) return;
        storage.setData(otpHashKey, data?.data?.hash);
        messageApi.success('Otp Resend');
      },
    },
  });

  // OTP Fields Java script

  const [OtpInputValues, setOtpInputValues] = useState(['', '', '', '', '', '']);

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
    setOtpInputValues(newValues);
    otpInputRefs.current[5].focus();
  };

  const handleInput = (ev, i) => {
    const newValues = [...OtpInputValues];
    newValues[i] = ev.target.value.slice(-1);
    setOtpInputValues(newValues);

    if (ev.target.value && i < 5) {
      otpInputRefs.current[i + 1].focus();
    }
  };

  const handleKeyDown = (ev, i) => {
    const newValues = [...OtpInputValues];
    if (!ev.target.value && ev.key === 'Backspace' && i) {
      newValues[i - 1] = '';
      setOtpInputValues(newValues);
      otpInputRefs.current[i - 1].focus();
    }
  };

  return (
    <>
      <Row className="h-full" align="middle" justify="center">
        {msgCtx}
        <Col sm={24} md={10} lg={12}>
          <div
            className="hidden h-full items-center justify-center md:flex"
            // style={{
            //   background: `url(${IMAGES.AuthBg})`,
            //   backgroundSize: 'cover',
            //   backgroundRepeat: 'round',
            // }}
          >
            {/* <img src={ImagePaths.authThumb} alt="auth-thumb" /> */}
            icons auth thumbs
          </div>
        </Col>
        <Col sm={24} md={14} lg={12} className="!flex !items-center !justify-center !p-4">
          {resetPasswordStep.stepNumber === 1 ? (
            <div className="sm:w-full sm:p-6 md:w-3/4 md:p-0 xl:w-1/2">
              <div className="mb-10 text-center">
                <img className="mx-auto mb-8" src={ImagePaths.logo} alt="logo" />
                <h2 className="text-2xl font-semibold">Reset Password</h2>
              </div>

              <Form
                size="large"
                className="form-gap-b-8"
                layout="vertical"
                form={resetPassFormInstance}
                onFinish={(values) => {
                  resetPassReqFn.mutateAsync(values);
                }}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your email!',
                      type: 'email',
                    },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>
                <Form.Item>
                  <Button block loading={resetPassReqFn.isPending} type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <p className="mt-2 text-center">
                <span className="text-[var(--gray-500)]">Don't have a account? </span>
                <span>
                  {' or '}
                  <Link className="font-bold text-[var(--primary-500)]" href={Paths.auth.login}>
                    Go Login
                  </Link>
                </span>
              </p>
            </div>
          ) : null}
          {resetPasswordStep.stepNumber === 2 ? (
            <div>
              <div>
                <Button
                  onClick={() => {
                    setResetPasswordStep(resetPasswordSteps[0]);
                    storage.removeData(otpHashKey);
                    storage.removeData(identifierKey);
                  }}
                >
                  {/* <IoMdArrowBack /> */}
                  icons
                </Button>
              </div>
              <div className="otp-form mb-[-30px]">
                <div>
                  <div className="title-holder">
                    {/* <OtpIcon /> */}
                    icons
                    <p className="title">Confirm Your Email ID</p>
                  </div>
                  <p className="description">Enter the 6 digit code sent to {storage.getData('identifier')}</p>
                </div>
                <p className="mt-[30px] mb-[-20px] text-center text-[var(--primary-500)]">OTP</p>
                <div className="flex justify-center">
                  <div className="field-holder">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="field_container">
                        <input
                          ref={(input: any) => (otpInputRefs.current[index] = input)}
                          className="otp_field"
                          maxLength={1}
                          type="number"
                          value={OtpInputValues[index]}
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
                      otpResendFn.mutate({
                        identifier: storage.getData(identifierKey),
                        verificationType: 'RESET_PASSWORD',
                      });
                      setTimer({ minutes: 2, seconds: 30 });
                    }}
                    disabled={timer.minutes === 0 && timer.seconds === 0 ? false : true}
                  >
                    Resend OTP
                  </button>
                </p>
                <div className="mt-[15px] flex justify-center">
                  <Button
                    onClick={() => {
                      if (OtpInputValues.join('').length === 6 && !!parseInt(OtpInputValues.join(''))) {
                        setResetPasswordStep(resetPasswordSteps[2]);
                        return;
                      }
                      notification.error({ message: 'Please enter valid Otp' });
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
          {resetPasswordStep.stepNumber === 3 ? (
            <div className="sm:w-full sm:p-6 md:w-3/4 md:p-0 xl:w-1/2">
              <div>
                <Button
                  onClick={() => {
                    setResetPasswordStep(resetPasswordSteps[0]);
                  }}
                >
                  {/* <IoMdArrowBack /> */}
                  icons
                </Button>
              </div>
              <div className="mb-10 text-center">
                <img className="mx-auto mb-8" src={ImagePaths.logo} alt="logo" />
                <h2 className="text-2xl font-semibold">Reset Password</h2>
              </div>

              <Form
                size="large"
                className="form-gap-b-8"
                layout="vertical"
                onFinish={(values) => {
                  if (!parseInt(OtpInputValues.join(''))) {
                    message.error('Please enter Otp');
                    return;
                  }
                  resetPassVerifyFn.mutateAsync({
                    email: storage.getData(identifierKey),
                    hash: storage.getData(otpHashKey),
                    otp: parseInt(OtpInputValues.join('')),
                    newPassword: values.newPassword,
                  });
                }}
              >
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  className="password-field"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter new password',
                    },
                  ]}
                >
                  <Input placeholder="Enter a new password" type="text" />
                </Form.Item>
                <Form.Item>
                  <Button block loading={resetPassReqFn.isPending} type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <p className="mt-2 text-center">
                <span className="text-[var(--gray-500)]">Don't have a account? </span>
                <span>
                  {' or '}
                  <Link className="font-bold text-[var(--primary-500)]" href={Paths.auth.login}>
                    Go Login
                  </Link>
                </span>
              </p>
            </div>
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default ResetPassword;
