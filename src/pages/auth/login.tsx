import { LockOutlined, MailOutlined } from '@ant-design/icons';
import ThemeToggler from '@base/components/ThemeToggler';
import { apiMessages } from '@lib/constant/apiMessages';
import { ImagePaths } from '@lib/constant/imagePaths';
import { Paths, pathToUrl } from '@lib/constant/paths';
import useTheme from '@lib/hooks/useTheme';
import { storage } from '@lib/utils/storage';
import { identifierKey, otpHashKey } from '@modules/auth/lib/constants';
import { useLogin } from '@modules/auth/lib/hooks';
import { setAuthSession } from '@modules/auth/lib/utils';
import { Button, Form, Input, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type React from 'react';

const LoginPage: React.FC = () => {
  const { isLight } = useTheme();
  const router = useRouter();
  let callbackUrl = router.query?.callbackUrl?.toString();
  callbackUrl = callbackUrl ? callbackUrl : pathToUrl('');
  const [messageApi, msgCtx] = message.useMessage();

  const loginFn = useLogin({
    config: {
      onSuccess(data) {
        if (!data?.success) return;
        if (data.data?.isVerified === false) {
          storage.setData(otpHashKey, data?.data?.hash);
          storage.setData(identifierKey, data?.data?.email);
          router.push(Paths.auth.signup);
          return;
        }
        // if (data?.data?.isPasswordSystemGenerated) {
        //   setResetSystemPassIdentifier(data?.data.identifier);
        //   return;
        // }

        setAuthSession(data?.data);
        // messageApi.loading(apiMessages.login, 1).then(() => router.push(Paths.root));
        messageApi.loading(apiMessages.login, 1).then(() => (window.location.href = decodeURIComponent(callbackUrl)));
      },
    },
  });
  const onFinish = (values: any) => {
    loginFn.mutateAsync(values);
  };

  return (
    <div className="flex min-h-screen">
      {msgCtx}
      <div className="absolute right-4 top-4">
        <ThemeToggler />
      </div>
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
        <div className="absolute right-0 top-0 h-16 w-16 bg-white dark:bg-black/30"></div>
        <div className="absolute right-16 top-16 h-16 w-16 bg-white dark:bg-black/30"></div>

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
      <div className="flex w-full items-center justify-center bg-white dark:bg-black md:w-1/2">
        <div className="w-[80%] max-w-[400px] py-8">
          <div className="mb-8 text-center font-serif text-2xl font-bold">
            <Image width={100} height={100} src={isLight ? ImagePaths.logo : ImagePaths.logoLight} alt="logo" />
          </div>

          <h3 className="mb-2 text-2xl font-semibold dark:text-white">Sign up for an account</h3>

          <p className="mb-8 block text-gray-600 dark:text-gray-300">Your gateway to fast, trusted worker hiring.</p>

          {/* Social Buttons */}
          {/* <div className="mb-6 flex gap-4">
            <button className="flex h-10 flex-1 items-center justify-center rounded-md border border-gray-300 dark:text-white">
              <FcGoogle className="mr-2" /> Google
            </button>
            <button className="flex h-10 flex-1 items-center justify-center rounded-md border border-gray-300 dark:text-white">
              <FaFacebook className="mr-2 text-blue-500" /> Facebook
            </button>
          </div>

          Divider
          <div className="relative my-6 text-center">
            <span className="relative z-10 rounded bg-white px-3 py-1 text-sm text-gray-500">Or continue with</span>
            <div className="absolute left-0 right-0 top-1/2 z-0 h-px bg-gray-200"></div>
          </div> */}

          {/* Form - using Ant Design */}
          <Form layout="vertical" onFinish={onFinish} className="space-y-4" requiredMark={false}>
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
                placeholder="Your password!"
                className="rounded-md py-2"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loginFn?.isPending}
                type="primary"
                htmlType="submit"
                block
                className="h-[45px] rounded-md"
                size="large"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 text-center dark:text-white">
            <span>Don’t have an account? </span>
            <Link href={Paths.auth.signup} className="font-semibold text-emerald-800 dark:text-[--primary-500]">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
