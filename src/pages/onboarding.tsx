import { useCreateCompany } from '@/@modules/company/lib/hooks';
import { usePlans } from '@/@modules/plan/components/lib/hooks';
import { Button } from '@/components/landing/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface FormData {
  companyName: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhoneNumber: string;
  planId: string;
}

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhoneNumber: '',
    planId: null,
  });

  // Get planId from URL query params
  useEffect(() => {
    if (router.query.planId) {
      setFormData((prev) => ({
        ...prev,
        planId: router.query.planId as string,
      }));
    }
  }, [router.query.planId]);

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

  const planQuery = usePlans({
    options: {
      page: 1,
      limit: 10,
      isActive: true,
    },
  });
  const createCompanyFn = useCreateCompany({
    config: {
      onSuccess: (res) => {
        console.log(res);
        if (res?.success) {
          router.push(`/preview?ownerEmail=${formData.ownerEmail.toLowerCase()}`);
        }
      },
    },
  });

  const handleSubmit = async () => {
    createCompanyFn.mutate({
      ...formData,
      ownerEmail: formData.ownerEmail.toLowerCase(),
      planId: formData.planId,
    });
  };

  const packages = planQuery.data?.data?.sort((a, b) => a?.price - b?.price) || [];

  // Generate consistent colors for each plan based on index
  const getColorForIndex = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-violet-500 to-violet-600',
      'from-fuchsia-500 to-fuchsia-600',
      'from-cyan-500 to-cyan-600',
      'from-teal-500 to-teal-600',
    ];
    return colors[index % colors.length];
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName.trim().length > 0;
      case 2:
        return (
          formData.ownerName.trim().length > 0 &&
          formData.ownerEmail.trim().length > 0 &&
          formData.ownerPhoneNumber.trim().length > 0
        );
      case 3:
        return !!formData.planId;
      default:
        return false;
    }
  };

  const stepTitles = ['Company Info', 'Owner Details', 'Choose Plan'];
  const stepDescriptions = [
    'Tell us about your business',
    'We need to know who you are',
    'Select the perfect plan for you',
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-12">
      {/* Simple Loading Overlay */}
      {createCompanyFn.isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-2xl">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            <p className="text-lg font-semibold text-gray-900">Setting up your company...</p>
          </div>
        </div>
      )}

      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6, delay: 0.2 }}
            className="mb-2 inline-block rounded-full bg-linear-to-r from-blue-500 to-purple-500 p-3 text-3xl shadow-lg"
          >
            🚀
          </motion.div>
          <h1 className="mb-2 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
            Welcome Aboard!
          </h1>
          <p className="text-sm text-gray-600">Let's get you set up in just a few steps</p>
        </motion.div>

        {/* Compact Smart Progress Indicator */}
        <div className="mb-6">
          {/* Progress bar background */}
          <div className="relative mb-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-indigo-600"
                initial={{ width: '0%' }}
                animate={{
                  width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%',
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>

            {/* Step indicators */}
          </div>

          {/* Step info cards */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: step * 0.15 }}
                className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                  currentStep === step
                    ? 'border-blue-400 bg-linear-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-200/50'
                    : currentStep > step
                      ? 'border-green-300 bg-green-50/50'
                      : 'border-gray-200 bg-white/50'
                }`}
              >
                {/* Shimmer effect for active step */}
                {currentStep === step && (
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                )}

                <div className="relative flex items-center gap-3">
                  {/* Emoji */}
                  <motion.div
                    animate={{
                      rotate: currentStep === step ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: currentStep === step ? Infinity : 0,
                    }}
                    className="text-2xl"
                  >
                    {step === 1 ? '🏢' : step === 2 ? '👤' : '📊'}
                  </motion.div>

                  {/* Text */}
                  <div className="flex-1">
                    <h4
                      className={`text-sm leading-tight font-bold ${
                        currentStep >= step ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {stepTitles[step - 1]}
                    </h4>
                    <p className={`mt-0.5 text-xs ${currentStep >= step ? 'text-gray-600' : 'text-gray-400'}`}>
                      {stepDescriptions[step - 1]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Glassmorphism Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/70 p-6 shadow-2xl backdrop-blur-xl md:p-8"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-white/50 to-transparent" />

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {/* Step 1: Company Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <div className="rounded-xl bg-blue-100 p-2 text-xl">🏢</div>
                      <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
                    </div>
                    <p className="mb-6 text-sm text-gray-600">Tell us about your business to get started</p>
                  </motion.div>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <div className="group relative">
                        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 opacity-0 blur transition-opacity group-focus-within:opacity-20" />
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => updateFormData('companyName', e.target.value)}
                          className="relative w-full rounded-xl border-2 border-gray-200 bg-white/50 px-5 py-4 text-lg text-gray-900 backdrop-blur-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
                          placeholder="e.g., ABC Technologies Ltd."
                        />
                      </div>
                    </motion.div>
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
                  transition={{ duration: 0.4, type: 'spring' }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <div className="rounded-xl bg-purple-100 p-2 text-xl">👤</div>
                      <h2 className="text-2xl font-bold text-gray-900">Owner Details</h2>
                    </div>
                    <p className="mb-6 text-sm text-gray-600">We need to know who you are</p>
                  </motion.div>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="group relative">
                        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 opacity-0 blur transition-opacity group-focus-within:opacity-20" />
                        <input
                          type="text"
                          value={formData.ownerName}
                          onChange={(e) => updateFormData('ownerName', e.target.value)}
                          className="relative w-full rounded-xl border-2 border-gray-200 bg-white/50 px-5 py-4 text-lg text-gray-900 backdrop-blur-sm transition-all focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/20 focus:outline-none"
                          placeholder="e.g., John Doe"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="mb-3 block text-sm font-semibold text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="group relative">
                        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 opacity-0 blur transition-opacity group-focus-within:opacity-20" />
                        <input
                          type="email"
                          value={formData.ownerEmail}
                          onChange={(e) => updateFormData('ownerEmail', e.target.value)}
                          className="relative w-full rounded-xl border-2 border-gray-200 bg-white/50 px-5 py-4 text-lg text-gray-900 backdrop-blur-sm transition-all focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/20 focus:outline-none"
                          placeholder="e.g., john@company.com"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="mb-3 block text-sm font-semibold text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="group relative">
                        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 opacity-0 blur transition-opacity group-focus-within:opacity-20" />
                        <input
                          type="tel"
                          value={formData.ownerPhoneNumber}
                          onChange={(e) => updateFormData('ownerPhoneNumber', e.target.value)}
                          className="relative w-full rounded-xl border-2 border-gray-200 bg-white/50 px-5 py-4 text-lg text-gray-900 backdrop-blur-sm transition-all focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/20 focus:outline-none"
                          placeholder="e.g., +880 1234 567890"
                        />
                      </div>
                    </motion.div>
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
                  transition={{ duration: 0.4, type: 'spring' }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <div className="rounded-xl bg-amber-100 p-2 text-xl">🎯</div>
                      <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
                    </div>
                    <p className="mb-6 text-sm text-gray-600">Select the perfect planId for your business needs</p>
                  </motion.div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {packages.map((pkg, index) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateFormData('planId', pkg.id)}
                        className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 transition-all ${
                          formData.planId === pkg.id
                            ? 'border-transparent shadow-2xl'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                        }`}
                      >
                        {/* Gradient background for selected */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${getColorForIndex(index)} transition-opacity ${
                            formData.planId === pkg.id ? 'opacity-100' : 'opacity-0'
                          }`}
                        />

                        {/* Content */}
                        <div className="relative z-10 p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3
                                className={`text-2xl font-bold transition-colors ${
                                  formData.planId === pkg.id ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {pkg.name}
                              </h3>
                              <p
                                className={`mt-2 text-sm transition-colors ${
                                  formData.planId === pkg.id ? 'text-white/90' : 'text-gray-600'
                                }`}
                              >
                                {pkg.description || 'Standard plan features'}
                              </p>
                            </div>

                            {/* Checkmark icon */}
                            <motion.div
                              animate={{
                                scale: formData.planId === pkg.id ? 1 : 0,
                                opacity: formData.planId === pkg.id ? 1 : 0,
                              }}
                              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
                            >
                              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          </div>

                          {/* Price or features */}
                          {pkg.price !== undefined && (
                            <div className="mt-4 border-t border-white/20 pt-4">
                              <p
                                className={`text-3xl font-bold transition-colors ${
                                  formData.planId === pkg.id ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {pkg.price === 0 ? 'Free' : `৳${pkg.price}`}
                                <span
                                  className={`text-sm font-normal transition-colors ${
                                    formData.planId === pkg.id ? 'text-white/80' : 'text-gray-500'
                                  }`}
                                >
                                  {pkg.price > 0 && '/month'}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Hover gradient effect for non-selected */}
                        {formData.planId !== pkg.id && (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${getColorForIndex(index)} opacity-0 transition-opacity group-hover:opacity-5`}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex gap-4"
            >
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
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid() || !formData.planId}
                  size="lg"
                  className="flex-1"
                >
                  Complete Setup
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
