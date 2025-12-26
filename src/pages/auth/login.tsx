import { LockOutlined, MailOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ThemeToggler from '@base/components/ThemeToggler';
import { apiMessages } from '@lib/constant/apiMessages';
import { ImagePaths } from '@lib/constant/imagePaths';
import { Paths, pathToUrl } from '@lib/constant/paths';
import useTheme from '@lib/hooks/useTheme';
import { storage } from '@lib/utils/storage';
import { identifierKey, otpHashKey } from '@modules/auth/lib/constants';
import { useLogin } from '@modules/auth/lib/hooks';
import { setAuthSession } from '@modules/auth/lib/utils';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Image from 'next/image';
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
        if (!data?.success) {
          messageApi.error(data?.message || 'Login failed. Please try again.');
          return;
        }
        if (data.data?.isVerified === false) {
          storage.setData(otpHashKey, data?.data?.hash);
          storage.setData(identifierKey, data?.data?.email);
          router.push(Paths.auth.signup);
          return;
        }

        setAuthSession(data?.data);
        messageApi.loading(apiMessages.login, 0.3).then(() => (window.location.href = decodeURIComponent(callbackUrl)));
      },
    },
  });
  const onFinish = (values: any) => {
    loginFn.mutateAsync(values);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: isLight
          ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
          : 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)',
      }}
    >
      {msgCtx}
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 h-96 w-96 animate-pulse rounded-full opacity-30"
          style={{
            background: isLight
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
            filter: 'blur(80px)',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-1/4 left-10 h-72 w-72 rounded-full opacity-20"
          style={{
            background: isLight
              ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              : 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 h-80 w-80 animate-pulse rounded-full opacity-25"
          style={{
            background: isLight
              ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
            filter: 'blur(90px)',
            animation: 'pulse 6s ease-in-out infinite',
          }}
        />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <ThemeToggler />
      </div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto grid min-h-screen items-center justify-center gap-10 px-4 py-8 lg:grid-cols-2">
        {/* Left Panel - Brand Section */}
        <div className="hidden flex-col items-start justify-center lg:flex">
          <div
            className="mb-5 inline-flex items-center gap-3 rounded-full border px-6 py-3 shadow-lg backdrop-blur-md"
            style={{
              borderColor: isLight ? 'rgba(59, 130, 246, 0.3)' : 'rgba(96, 165, 250, 0.4)',
              backgroundColor: isLight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(96, 165, 250, 0.15)',
            }}
          >
            <ShoppingCartOutlined className="text-2xl" style={{ color: isLight ? '#3b82f6' : '#60a5fa' }} />
            <span className="text-sm font-bold tracking-wide" style={{ color: isLight ? '#2563eb' : '#93c5fd' }}>
              POS MANAGEMENT SYSTEM
            </span>
          </div>

          <h1
            className="mb-6 text-6xl leading-tight font-extrabold tracking-tight"
            style={{ color: isLight ? '#0f172a' : '#f1f5f9' }}
          >
            Modern POS{' '}
            <span
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: isLight
                  ? 'linear-gradient(to right, #2563eb, #9333ea, #db2777)'
                  : 'linear-gradient(to right, #60a5fa, #c084fc, #f472b6)',
              }}
            >
              Revolution
            </span>
          </h1>

          <p className="mb-10 text-xl" style={{ color: isLight ? '#374151' : '#e2e8f0' }}>
            Transform your business with our cutting-edge point of sale system. Real-time insights, seamless
            transactions, and powerful analytics at your fingertips.
          </p>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              {
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                title: 'Lightning Fast Processing',
                desc: 'Process transactions in milliseconds',
                color: 'from-blue-500 to-blue-700',
              },
              {
                icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
                title: 'Smart Inventory Control',
                desc: 'AI-powered stock management',
                color: 'from-purple-500 to-purple-700',
              },
              {
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                title: 'Advanced Analytics',
                desc: 'Actionable business intelligence',
                color: 'from-pink-500 to-pink-700',
              },
              {
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v8m0 0l-3-3m3 3l3-3',
                title: 'Seamless Integrations',
                desc: 'Connect with your favorite tools',
                color: 'from-green-500 to-green-700',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex cursor-pointer items-start gap-4 rounded-xl p-4 backdrop-blur-sm transition-all"
                style={{
                  backgroundColor: isLight ? 'rgba(255, 255, 255, 0.5)' : 'rgba(51, 65, 85, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isLight
                    ? 'rgba(255, 255, 255, 0.7)'
                    : 'rgba(71, 85, 105, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isLight
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(51, 65, 85, 0.4)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                >
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 font-bold" style={{ color: isLight ? '#111827' : '#f8fafc' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm" style={{ color: isLight ? '#4b5563' : '#cbd5e1' }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex w-full items-center justify-center gap-4">
            <div className="flex -space-x-2">
              <div
                className="h-10 w-10 rounded-full border-2 bg-gradient-to-br from-blue-400 to-blue-600"
                style={{ borderColor: isLight ? '#ffffff' : '#1e293b' }}
              />
              <div
                className="h-10 w-10 rounded-full border-2 bg-gradient-to-br from-purple-400 to-purple-600"
                style={{ borderColor: isLight ? '#ffffff' : '#1e293b' }}
              />
              <div
                className="h-10 w-10 rounded-full border-2 bg-gradient-to-br from-pink-400 to-pink-600"
                style={{ borderColor: isLight ? '#ffffff' : '#1e293b' }}
              />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: isLight ? '#111827' : '#f1f5f9' }}>
                Trusted by 10,000+ businesses
              </p>
              <p className="text-xs" style={{ color: isLight ? '#6b7280' : '#94a3b8' }}>
                Join the retail revolution today
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex w-full items-center justify-center">
          <div
            className="mx-w-xl w-full rounded-3xl border px-4 py-12 shadow-2xl backdrop-blur-2xl lg:px-10 xl:max-w-2xl"
            style={{
              background: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.98)',
              borderColor: isLight ? 'rgba(59, 130, 246, 0.2)' : 'rgba(96, 165, 250, 0.3)',
              boxShadow: isLight ? '0 20px 60px rgba(0, 0, 0, 0.1)' : '0 20px 60px rgba(0, 0, 0, 0.7)',
            }}
          >
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div
                className="relative flex h-20 w-20 items-center justify-center rounded-2xl shadow-xl transition-transform hover:scale-105"
                style={{
                  background: isLight
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
                    : 'linear-gradient(135deg, rgba(96, 165, 250, 0.25) 0%, rgba(167, 139, 250, 0.25) 100%)',
                }}
              >
                <Image
                  width={50}
                  height={50}
                  src={isLight ? ImagePaths.logo : ImagePaths.logoLight}
                  alt="logo"
                  className="drop-shadow-lg"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="mb-3 text-center">
              <h2 className="text-3xl font-bold tracking-tight" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>
                Welcome Back!
              </h2>
            </div>
            <p className="mb-8 text-center text-sm" style={{ color: isLight ? '#4b5563' : '#cbd5e1' }}>
              Enter your credentials to access your POS dashboard
            </p>

            {/* Form */}
            <Form layout="vertical" onFinish={onFinish} requiredMark={false} className="space-y-5">
              <Form.Item
                name="identifier"
                rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: isLight ? '#9ca3af' : '#6b7280' }} />}
                  placeholder="Enter your email"
                  size="large"
                  className="rounded-xl border-0 px-4 shadow-sm transition-all hover:shadow-md focus:shadow-md"
                  style={{
                    background: isLight ? '#f8fafc' : '#1e293b',
                    color: isLight ? '#0f172a' : '#f1f5f9',
                    height: '48px',
                  }}
                />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                <Input.Password
                  prefix={<LockOutlined style={{ color: isLight ? '#9ca3af' : '#6b7280' }} />}
                  placeholder="Enter your password"
                  size="large"
                  className="rounded-xl border-0 px-4 shadow-sm transition-all hover:shadow-md focus:shadow-md"
                  style={{
                    background: isLight ? '#f8fafc' : '#1e293b',
                    color: isLight ? '#0f172a' : '#f1f5f9',
                    height: '48px',
                  }}
                />
              </Form.Item>

              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-sm font-medium" style={{ color: isLight ? '#374151' : '#e2e8f0' }}>
                    Remember me
                  </Checkbox>
                </Form.Item>
                {/* <a
                  href="#"
                  className="text-sm font-semibold transition-colors"
                  style={{ color: isLight ? '#2563eb' : '#60a5fa' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = isLight ? '#1d4ed8' : '#93c5fd')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isLight ? '#2563eb' : '#60a5fa')}
                >
                  Forgot password?
                </a> */}
              </div>

              <Form.Item className="mb-0">
                <Button
                  loading={loginFn?.isPending}
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  className="h-13! rounded-xl font-bold shadow-lg transition-all hover:shadow-xl"
                  style={{
                    background: isLight
                      ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)',
                    border: 'none',
                    fontSize: '16px',
                  }}
                >
                  Sign In to Dashboard
                </Button>
              </Form.Item>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: isLight ? '#d1d5db' : '#475569' }}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span
                    className="px-4"
                    style={{
                      backgroundColor: isLight ? '#ffffff' : '#0f172a',
                      color: isLight ? '#6b7280' : '#94a3b8',
                    }}
                  >
                    New to our platform?
                  </span>
                </div>
              </div>

              <p className="text-center text-sm">
                <a
                  href={'#'}
                  className="font-bold transition-colors"
                  style={{ color: isLight ? '#9333ea' : '#c084fc' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = isLight ? '#7e22ce' : '#e9d5ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isLight ? '#9333ea' : '#c084fc')}
                >
                  Create an account →
                </a>
              </p>
            </Form>

            {/* Footer */}
            <div className="mt-8 border-t pt-6" style={{ borderColor: isLight ? '#e5e7eb' : '#374151' }}>
              <div className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-center text-xs font-medium" style={{ color: isLight ? '#4b5563' : '#94a3b8' }}>
                  Secured and encrypted login
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
