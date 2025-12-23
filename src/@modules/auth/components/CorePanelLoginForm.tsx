'use client';
import { apiMessages } from '@lib/constant/apiMessages';
import { ImagePaths } from '@lib/constant/imagePaths';

import ThemeToggler from '@base/components/ThemeToggler';
import { Paths, pathToUrl } from '@lib/constant/paths';
import useTheme from '@lib/hooks/useTheme';
import { storage } from '@lib/utils/storage';
import { Button, Checkbox, Col, Form, Input, Modal, Row, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { identifierKey, otpHashKey } from '../lib/constants';
import { useLogin, useSendOtp, useTowFaAuthenticate, useVerifyOtp } from '../lib/hooks';
import { setAuthSession } from '../lib/utils';
import OtpForm from './OtpFrom';
import TwoFaCodeFrom from './TwoFaCodeFrom';

const CorePanelLogin = () => {
  const router = useRouter();
  const { isLight } = useTheme();
  let callbackUrl = router.query?.callbackUrl?.toString();
  callbackUrl = callbackUrl ? callbackUrl : pathToUrl('');
  //   const query: Record<string, string> = { ...router.query, callbackUrl };
  const decodedCallbackUrl = decodeURIComponent(callbackUrl);

  const [messageApi, msgCtx] = message.useMessage();

  const [isTowFaModal, setTowFaModal] = useState(false);

  const [isVerifyModal, setVerifyModal] = useState(false);
  useEffect(() => {
    setVerifyModal(storage.getData(otpHashKey) ? true : false);
  }, []);

  const loginFn = useLogin({
    config: {
      onSuccess(data) {
        if (!data?.success) return;
        if (data.data?.isVerified === false) {
          storage.setData(otpHashKey, data?.data?.hash);
          storage.setData(identifierKey, data?.data?.email);
          setVerifyModal(true);
          return;
        }
        if (data.data?.isTwoFactorEnabled) {
          storage.setData(identifierKey, data?.data?.email);
          setTowFaModal(true);
          return;
        }

        setAuthSession(data?.data);
        // messageApi.loading(apiMessages.login, 1).then(() => window.location.replace(decodedCallbackUrl));
        messageApi.loading(apiMessages.login, 1).then(() => {
          window.location.replace(decodedCallbackUrl);
        });
      },
    },
  });

  const otpVerify = useVerifyOtp({
    config: {
      onSuccess(data) {
        if (!data?.success) return;

        setVerifyModal(false);
        storage.removeData(otpHashKey);
        storage.removeData(identifierKey);

        setAuthSession(data?.data);
        messageApi.loading(apiMessages.login, 1).then(() => window.location.replace(decodedCallbackUrl));
      },
    },
  });

  const towFaAuthenticateFn = useTowFaAuthenticate({
    config: {
      onSuccess(data) {
        if (!data?.success) {
          messageApi.error(data?.message);
          return;
        }

        setTowFaModal(false);
        storage.removeData(identifierKey);

        setAuthSession(data?.data);
        messageApi.loading(apiMessages.login, 1).then(() => window.location.replace(decodedCallbackUrl));
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
            <img src={isLight ? ImagePaths.logo : ImagePaths.logoLight} alt="auth-thumb" className="w-full max-w-96" />
          </div>
        </Col>
        <Col sm={24} md={14} lg={12} className="!flex !items-center !justify-center !p-4">
          <div className="sm:w-full sm:p-6 md:w-3/4 md:p-0 xl:w-1/2">
            <div className="mb-4 flex flex-col items-center gap-2 text-center">
              {/* <img className="mx-auto mb-8" src={ImagePaths.logo} alt="logo" /> */}
              <ThemeToggler />
              <h2 className="text-2xl font-semibold dark:text-white">Welcome Back, Please Login!</h2>
            </div>
            <Form
              size="large"
              className="form-gap-b-8"
              onFinish={(values) => {
                loginFn.mutate(values);
              }}
            >
              <Form.Item
                name="identifier"
                rules={[
                  {
                    required: true,
                    message: 'Please input your identifier!',
                  },
                ]}
              >
                <Input prefix={<MdEmail />} placeholder="Email" type="identifier" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    // min: 6,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password prefix={<MdLock />} placeholder="Password" />
              </Form.Item>
              <div className="mb-6 flex justify-between">
                <Checkbox>Remember me</Checkbox>
                <Link href={Paths.auth.resetPassword}>Forgot password</Link>
              </div>
              <Form.Item>
                <Button block loading={loginFn.isPending} type="primary" htmlType="submit">
                  Sign in
                </Button>
              </Form.Item>
            </Form>
            <div className="mt-6 text-center dark:text-white">
              <span>Don’t have an account? </span>
              <Link href={Paths.auth.signup} className="font-semibold text-emerald-800 dark:text-[--primary-500]">
                Create an account
              </Link>
            </div>
            {/* <p className="mt-2 text-center">
              <span className="text-[var(--gray-500)]">Don't have a account? </span>
              <Link
                className="font-bold text-[var(--primary-500)]"
                href={{ pathname: Paths.auth.corporateRegister, query: query }}
              >
                Register as Corporate company
              </Link>
              {query.requestFrom && (
                <span>
                  {' or '}
                  <Link className="font-bold text-[var(--primary-500)]" href={query.requestFrom}>
                    Go back
                  </Link>
                </span>
              )}
            </p> */}
          </div>
        </Col>
      </Row>
      <Modal
        open={isVerifyModal}
        footer={null}
        closable={true}
        onCancel={() => {
          setVerifyModal(false);
          storage.removeData(otpHashKey);
          storage.removeData(identifierKey);
        }}
      >
        <OtpForm
          onSubmitOTP={(values) => {
            otpVerify.mutateAsync({
              identifier: storage.getData(identifierKey),
              hash: storage.getData(otpHashKey),
              otp: parseInt(values),
            });
          }}
          resendOTP={() => {
            otpResendFn.mutate({
              identifier: storage.getData(identifierKey),
              verificationType: 'SIGN_UP',
            });
          }}
        />
      </Modal>
      <Modal
        open={isTowFaModal}
        footer={null}
        closable={true}
        onCancel={() => {
          setTowFaModal(false);
          storage.removeData(identifierKey);
        }}
      >
        <TwoFaCodeFrom
          onSubmit={(values) => {
            towFaAuthenticateFn.mutate({
              email: storage.getData(identifierKey),
              code: values,
            });
          }}
        />
      </Modal>
    </>
  );
};

export default CorePanelLogin;
