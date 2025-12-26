import { Button } from 'antd';
import { HiShieldExclamation } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';

const AccessDeniedFallBack = () => {
  return (
    <div className="flex min-h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative">
        {/* Decorative blur circles */}
        <div className="absolute -top-32 -left-32 h-64 w-64 animate-pulse rounded-full bg-red-300 opacity-20 blur-3xl dark:bg-red-900" />
        <div className="animation-delay-1000 absolute -right-32 -bottom-32 h-64 w-64 animate-pulse rounded-full bg-orange-300 opacity-20 blur-3xl dark:bg-orange-900" />

        {/* Main card */}
        <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-gray-700 dark:bg-gray-800/90">
          {/* Gradient header */}
          <div className="h-2 w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-600" />

          <div className="p-8 text-center">
            {/* Icon with pulse animation */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
              <HiShieldExclamation className="h-10 w-10 text-white" />
            </div>

            <h1 className="mb-3 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-3xl font-bold text-transparent dark:from-red-400 dark:to-orange-400">
              Access Denied
            </h1>

            <p className="mb-2 text-base text-gray-700 dark:text-gray-300">
              You don't have permission to view this page.
            </p>

            <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
              If you believe this is an error, please contact your administrator to request access.
            </p>

            {/* Action buttons */}
            <div className="flex justify-center gap-3">
              <Button
                size="large"
                icon={<MdArrowBack />}
                onClick={() => window.history.back()}
                className="shadow-md transition-all hover:shadow-lg"
              >
                Go Back
              </Button>

              <Button
                type="primary"
                size="large"
                onClick={() => (window.location.href = '/')}
                className="shadow-md transition-all hover:shadow-lg"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedFallBack;
