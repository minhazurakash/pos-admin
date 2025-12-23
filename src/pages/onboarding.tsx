import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from '@/components/landing/Button';

interface FormData {
  companyName: string;
  fullName: string;
  email: string;
  phone: string;
  package: string;
}

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    package: 'free',
  });

  // Get package from URL query params
  useEffect(() => {
    if (router.query.package) {
      setFormData((prev) => ({
        ...prev,
        package: router.query.package as string,
      }));
    }
  }, [router.query.package]);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulate setup process
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Navigate to dashboard
    router.push('/dashboard');
  };

  const packages = [
    { id: 'free', name: 'Free', description: 'Perfect for testing' },
    { id: 'basic', name: 'Basic', description: '৳499/month' },
    { id: 'standard', name: 'Standard', description: '৳799/month' },
    { id: 'premium', name: 'Premium', description: '৳999/month' },
  ];

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName.trim().length > 0;
      case 2:
        return (
          formData.fullName.trim().length > 0 && formData.email.trim().length > 0 && formData.phone.trim().length > 0
        );
      case 3:
        return formData.package.length > 0;
      default:
        return false;
    }
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-600 to-indigo-600">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="mx-auto mb-8 h-24 w-24 rounded-full border-8 border-white border-t-transparent"
          />
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl font-bold text-white md:text-4xl"
          >
            Setting up your POS...
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 5 }}
            className="mx-auto mt-8 h-2 max-w-md overflow-hidden rounded-full bg-white"
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-full w-1/3 bg-blue-200"
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl">Welcome to POS Software</h1>
          <p className="text-xl text-gray-600">Let's get you set up in just a few steps</p>
        </motion.div>

        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: step * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      scale: currentStep === step ? 1.2 : 1,
                      backgroundColor: currentStep >= step ? 'rgb(37, 99, 235)' : 'rgb(229, 231, 235)',
                    }}
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-bold ${
                      currentStep >= step ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {currentStep > step ? (
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
                  </motion.div>
                  <span className="mt-2 text-sm font-medium text-gray-600">
                    {step === 1 && 'Company'}
                    {step === 2 && 'User Info'}
                    {step === 3 && 'Package'}
                  </span>
                </motion.div>
                {step < 3 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: 1,
                      backgroundColor: currentStep > step ? 'rgb(37, 99, 235)' : 'rgb(229, 231, 235)',
                    }}
                    className="h-1 w-16 rounded"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-8 shadow-xl md:p-12"
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Company Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Company Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateFormData('companyName', e.target.value)}
                      className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: User Info */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Basic User Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateFormData('fullName', e.target.value)}
                      className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Package Selection */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Choose Your Package</h2>
                <div className="space-y-4">
                  {packages.map((pkg) => (
                    <motion.div
                      key={pkg.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateFormData('package', pkg.id)}
                      className={`cursor-pointer rounded-xl border-2 p-6 transition-all ${
                        formData.package === pkg.id
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                          <p className="text-gray-600">{pkg.description}</p>
                        </div>
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                            formData.package === pkg.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                          }`}
                        >
                          {formData.package === pkg.id && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="h-4 w-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </motion.svg>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-4">
            {currentStep > 1 && (
              <Button onClick={prevStep} variant="outline" size="lg" className="flex-1">
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button onClick={nextStep} disabled={!isStepValid()} size="lg" className="flex-1">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!isStepValid()} size="lg" className="flex-1">
                Complete Setup
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
