import { LockOutlined, MailOutlined, RightSquareFilled, UserOutlined } from '@ant-design/icons';
import { apiMessages } from '@lib/constant/apiMessages';
import { ImagePaths } from '@lib/constant/imagePaths';
import { Paths, pathToUrl } from '@lib/constant/paths';
import { storage } from '@lib/utils/storage';
import { identifierKey, otpHashKey } from '@modules/auth/lib/constants';
import { useSendOtp, useSignUp, useVerifyOtp } from '@modules/auth/lib/hooks';
import { setAuthSession } from '@modules/auth/lib/utils';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type React from 'react';
import { useEffect, useState } from 'react';

const SignupPage: React.FC = () => {
  const router = useRouter();
  let callbackUrl = router.query?.callbackUrl?.toString();
  callbackUrl = callbackUrl ? callbackUrl : pathToUrl('');
  const [messageApi, msgCtx] = message.useMessage();
  const [isHasOptHashKey, setOptHashKey] = useState(false);

  useEffect(() => {
    setOptHashKey(storage.getData(otpHashKey) ? true : false);
  }, []);

  const [timer, setTimer] = useState(60); // 60 seconds countdown
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleResendOtp = () => {
    otpResendFn.mutate({
      identifier: storage.getData(identifierKey),
      verificationType: 'SIGN_UP',
    });
    setTimer(60);
    setIsResendDisabled(true);
  };

  const signUpFn = useSignUp({
    config: {
      onSuccess: (data) => {
        if (!data?.success) return;
        storage.setData(otpHashKey, data?.data?.hash);
        storage.setData(identifierKey, data?.data?.identifier);
        setOptHashKey(true);
      },
    },
  });
  const onFinish = (values: any) => {
    delete values.agreement;
    delete values.confirm;
    signUpFn.mutate(values);
  };

  const otpVerify = useVerifyOtp({
    config: {
      onSuccess(data) {
        if (!data?.success) return;
        setOptHashKey(false);
        storage.removeData(otpHashKey);
        storage.removeData(identifierKey);

        setAuthSession(data?.data);
        messageApi.loading(apiMessages.register, 1).then(() => window.location.replace(callbackUrl));
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

  return (
    <div className="flex min-h-screen">
      {msgCtx}
      {/* Left Panel */}
      <div className="relative hidden items-center justify-center overflow-hidden bg-emerald-900 text-white md:flex md:w-1/2">
        {/* Top Left Decorative Grid */}
        <div className="absolute left-0 top-0 h-32 w-32">
          <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110" fill="none">
            <path d="M14.7087 0H14.2031V110H14.7087V0Z" fill="#00613C" />
            <path d="M30.9274 0H30.4219V110H30.9274V0Z" fill="#00613C" />
            <path d="M47.1462 0H46.6406V110H47.1462V0Z" fill="#00613C" />
            <path d="M63.3649 0H62.8594V110H63.3649V0Z" fill="#00613C" />
            <path d="M79.5758 0H79.0703V110H79.5758V0Z" fill="#00613C" />
            <path d="M95.7868 0H95.2812V110H95.7868V0Z" fill="#00613C" />
            <path d="M110 14.207H0V14.7126H110V14.207Z" fill="#00613C" />
            <path d="M110 30.4258H0V30.9313H110V30.4258Z" fill="#00613C" />
            <path d="M110 46.6367H0V47.1422H110V46.6367Z" fill="#00613C" />
            <path d="M110 62.8555H0V63.361H110V62.8555Z" fill="#00613C" />
            <path d="M110 79.0703H0V79.5758H110V79.0703Z" fill="#00613C" />
            <path d="M110 95.2891H0V95.7946H110V95.2891Z" fill="#00613C" />
          </svg>
        </div>

        {/* Bottom Left Arc Shape */}
        <div className="absolute bottom-0 left-0 h-32 w-32">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <defs>
              <pattern id="dotPattern" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" fillOpacity="0.05" />
              </pattern>
              <clipPath id="quarterCircle">
                <path d="M100,100 A100,100 0 0,0 0,0 L0,100 Z" />
              </clipPath>
            </defs>

            <rect width="100" height="100" fill="url(#dotPattern)" clipPath="url(#quarterCircle)" />
          </svg>
        </div>

        {/* Bottom Right Vertical Bars */}
        <div className="absolute -bottom-2 right-0 h-32 w-32">
          <svg xmlns="http://www.w3.org/2000/svg" width="138" height="127" viewBox="0 0 138 127" fill="none">
            <path d="M3 102.516V126.917" stroke="#005C39" stroke-width="5" stroke-miterlimit="10" />
            <path d="M15.2656 82.0586V126.912" stroke="#005C39" stroke-width="5" stroke-miterlimit="10" />
            <path d="M27.5625 59.4023V126.914" stroke="#005C39" stroke-width="5" stroke-miterlimit="10" />
            <path d="M39.8203 35.7734V126.914" stroke="#005C39" stroke-width="5" stroke-miterlimit="10" />
            <path d="M52.0859 16.2422V126.908" stroke="#005C39" stroke-width="5" stroke-miterlimit="10" />
            <path d="M64.3594 0.515625V126.912" stroke="#005C39" stroke-width="5" stroke-miterlimit="10" />
            <path d="M76.6484 0.515625V126.912" stroke="#005C39" stroke-width="5" stroke-miterlimit="10" />
            <path d="M88.9141 16.2422V126.908" stroke="#005C39" stroke-width="5" stroke-miterlimit="10" />
            <path d="M101.18 35.7734V126.914" stroke="#005C39" stroke-width="5" stroke-miterlimit="10" />
            <path d="M113.445 59.4023V126.914" stroke="#005C39" stroke-width="5" stroke-miterlimit="10" />
            <path d="M125.734 82.0586V126.912" stroke="#005C39" stroke-width="5" stroke-miterlimit="10" />
            <path d="M138 102.516V126.917" stroke="#005C39" stroke-width="5" stroke-miterlimit="10" />
          </svg>
        </div>

        {/* Top Right Corner Square */}
        <div className="absolute right-0 top-0 h-16 w-16 bg-white"></div>
        <div className="absolute right-16 top-16 h-16 w-16 bg-white"></div>

        {/* Background Pattern Grid */}
        <div
          className="absolute bottom-0 right-0 h-1/3 w-full opacity-30"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg%20width%3D%22100%25%22%20height%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22smallGrid%22%20width%3D%2210%22%20height%3D%2210%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Cpath%20d%3D%22M%2010%200%20L%200%200%200%2010%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.1)%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fpattern%3E%3C%2Fdefs%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23smallGrid)%22%2F%3E%3C%2Fsvg%3E')",
          }}
        ></div>

        {/* Content */}
        <div className="z-10 flex max-w-[80%] flex-col items-center p-8 text-center">
          <div className="mb-8 h-[250px] w-full border border-white/30"></div>

          <h2 className="mb-4 text-3xl font-bold text-white">We Work With the Best</h2>

          <p className="mb-8 text-base text-white/80">
            Top companies trust our platform to hire skilled workers. See who's hiring with us.
          </p>

          <div className="mt-auto flex gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-white"></span>
            <span className="inline-block h-2 w-2 rounded-full bg-white/30"></span>
            <span className="inline-block h-2 w-2 rounded-full bg-white/30"></span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex w-full items-center justify-center bg-white md:w-1/2">
        <div className="w-[80%] max-w-[400px] py-8">
          <div className="mb-8 text-center font-serif text-2xl font-bold">
            <Image width={100} height={100} src={ImagePaths.logo} alt="logo" />
          </div>

          {!isHasOptHashKey ? (
            <>
              {/* Right Panel */}

              <h3 className="mb-2 text-2xl font-semibold">Sign up for an account</h3>

              <p className="mb-8 block text-gray-600">Your gateway to fast, trusted worker hiring.</p>
              {/* Back Arrow */}
              {!!storage.getData(otpHashKey) ? (
                <Button
                  type="text"
                  icon={<RightSquareFilled />}
                  className="mb-4 flex items-center text-sm text-gray-600 hover:text-black"
                  onClick={() => {
                    setOptHashKey(true);
                  }}
                >
                  Go to OTP Verify
                </Button>
              ) : null}

              {/* Social Buttons */}
              {/* <div className="mb-6 flex gap-4">
                <button className="flex h-10 flex-1 items-center justify-center rounded-md border border-gray-300">
                  <FcGoogle className="mr-2" /> Google
                </button>
                <button className="flex h-10 flex-1 items-center justify-center rounded-md border border-gray-300">
                  <FaFacebook className="mr-2 text-blue-500" /> Facebook
                </button>
              </div>

              Divider
              <div className="relative my-6 text-center">
                <span className="relative z-10 bg-white px-3 text-gray-500">Or continue with</span>
                <div className="absolute left-0 right-0 top-1/2 z-0 h-px bg-gray-200"></div>
              </div> */}

              {/* Form - using Ant Design */}
              <Form layout="vertical" onFinish={onFinish} className="space-y-4" requiredMark={false}>
                <Form.Item
                  label={
                    <label className="font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                  }
                  name="fullName"
                  rules={[{ required: true, message: 'Please enter your full name' }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Enter your full name"
                    className="rounded-md py-2"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <label className="font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                  }
                  name="identifier"
                  rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="Email"
                    className="rounded-md py-2"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <label className="font-medium">
                      Password <span className="text-red-500">*</span>
                    </label>
                  }
                  name="password"
                  rules={[{ required: true, message: 'Please enter your password' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Create a strong password"
                    className="rounded-md py-2"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <label className="font-medium">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                  }
                  name="confirm"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm your password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Confirm password"
                    className="rounded-md py-2"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  className="!mb-2"
                  rules={[{ required: true, message: 'You must accept your Terms & Condition!' }]}
                >
                  <Checkbox>
                    I agree to the{' '}
                    <a href="#" className="font-semibold text-emerald-800">
                      Terms & Conditions
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    loading={signUpFn?.isPending}
                    htmlType="submit"
                    block
                    className="h-[45px] rounded-md bg-black text-white hover:bg-gray-800"
                    size="large"
                  >
                    Create Account
                  </Button>
                </Form.Item>
              </Form>

              <div className="mt-6 text-center">
                <span>Already have an account? </span>
                <Link href={Paths.auth.login} className="font-semibold text-emerald-800">
                  Log In
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Back Arrow */}
              <button
                className="mb-4 flex items-center text-sm text-gray-600 hover:text-black"
                onClick={() => {
                  setOptHashKey(false);
                }}
              >
                ← Back to Signup
              </button>

              {/* OTP Form */}
              <h3 className="mb-2 text-2xl font-semibold">Verify Your Email</h3>
              <p className="mb-4 text-gray-600">Enter the OTP sent to your email to verify your account.</p>

              <p className="mb-4 text-sm text-gray-500">
                {isResendDisabled
                  ? `Resend available in 00:${String(timer).padStart(2, '0')}`
                  : 'You can now resend OTP.'}
              </p>

              <Form
                layout="vertical"
                onFinish={(v) => {
                  otpVerify.mutate({
                    identifier: storage.getData(identifierKey),
                    hash: storage.getData(otpHashKey),
                    otp: parseInt(v?.otp),
                  });
                }}
                className="space-y-4"
                requiredMark={false}
              >
                <Form.Item
                  name="otp"
                  label={<label className="font-medium">OTP Code</label>}
                  rules={[{ required: true, message: 'Please enter the OTP code' }]}
                >
                  <Input size="large" placeholder="Enter OTP" className="rounded-md py-2" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    block
                    loading={otpResendFn?.isPending}
                    htmlType="submit"
                    className="h-[45px] rounded-md bg-black text-white hover:bg-gray-800"
                  >
                    Verify OTP
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    block
                    disabled={isResendDisabled}
                    onClick={handleResendOtp}
                    className="h-[45px] rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100"
                  >
                    Resend OTP
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
