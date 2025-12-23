import { Button } from '@/components/landing/Button';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { PricingCard } from '@/components/landing/PricingCard';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleTryNow = () => {
    router.push('/onboarding');
  };

  // Features data
  const features = [
    {
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      title: 'Sales & Invoice Management',
      description:
        'Create professional invoices, manage sales, and track payments seamlessly with our intuitive interface.',
    },
    {
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      title: 'Inventory Tracking',
      description:
        'Real-time inventory management with low stock alerts, automated reordering, and comprehensive tracking.',
    },
    {
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: 'Customer & Supplier Management',
      description:
        'Maintain detailed records of customers and suppliers with purchase history and contact information.',
    },
    {
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: 'Multi-user & Role Access',
      description: 'Control access with role-based permissions, ensuring security and proper workflow management.',
    },
    {
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: 'Reports & Analytics',
      description: 'Gain insights with comprehensive reports on sales, profits, inventory, and business performance.',
    },
    {
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
      title: 'Cloud Based & Secure',
      description:
        'Access your POS from anywhere with cloud storage, automatic backups, and enterprise-grade security.',
    },
  ];

  // Pricing data
  const pricingPlans = [
    {
      name: 'Basic',
      price: 499,
      period: 'month',
      features: ['Single outlet', 'Basic sales & inventory', 'Limited reports', 'Email support'],
    },
    {
      name: 'Standard',
      price: 799,
      period: 'month',
      popular: true,
      features: [
        'Multiple outlets',
        'Advanced inventory',
        'Sales & profit reports',
        'Staff management',
        'Priority support',
      ],
    },
    {
      name: 'Premium',
      price: 999,
      period: 'month',
      features: [
        'Unlimited outlets',
        'Full analytics dashboard',
        'Role & permission system',
        'API access',
        '24/7 premium support',
      ],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 right-0 left-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          {/* Logo */}
          <motion.a href="#" whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-lg">
              P
            </div>
            <span className="text-xl font-bold text-gray-900">POS Software</span>
          </motion.a>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              Features
            </motion.a>
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              Pricing
            </motion.a>
            {/* <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              About
            </motion.a> */}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 md:block"
            >
              Sign In
            </motion.button> */}
            <Button onClick={handleTryNow} size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 pt-32">
        {/* Enhanced animated background shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-200 opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-indigo-200 opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200 opacity-10 blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-blue-400/30"
            animate={{
              y: [Math.random() * 1000, -100],
              x: [Math.random() * 50 - 25, Math.random() * 50 - 25],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring', bounce: 0.5 }}
            className="mb-6 inline-block"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 40px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full border border-blue-200 bg-white/50 px-6 py-2 backdrop-blur-sm"
            >
              <span className="text-sm font-semibold text-blue-600">✨ Cloud-Based POS Solution</span>
            </motion.div>
          </motion.div>

          {/* Animated Split Heading with Zoom Effect */}
          <div className="mb-6">
            <div className="overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.3, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  type: 'spring',
                  stiffness: 150,
                  damping: 12,
                }}
                className="text-5xl leading-tight font-extrabold text-gray-900 md:text-7xl"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6,
                    type: 'spring',
                    bounce: 0.5,
                  }}
                  className="mr-4 inline-block"
                >
                  Setup
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.75,
                    type: 'spring',
                    bounce: 0.5,
                  }}
                  className="mr-4 inline-block"
                >
                  your
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.9,
                    type: 'spring',
                    bounce: 0.9,
                    stiffness: 200,
                    damping: 8,
                  }}
                  className="relative inline-block"
                >
                  <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">POS</span>
                </motion.span>
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.3, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.1,
                  type: 'spring',
                  stiffness: 150,
                  damping: 12,
                }}
                className="text-5xl leading-tight font-extrabold text-gray-900 md:text-7xl"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.3,
                    type: 'spring',
                    bounce: 0.5,
                  }}
                  className="mr-4 inline-block"
                >
                  software
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.45,
                    type: 'spring',
                    bounce: 0.5,
                  }}
                  className="mr-4 inline-block"
                >
                  in
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.6,
                    type: 'spring',
                    bounce: 0.5,
                  }}
                  className="mr-4 inline-block"
                >
                  just
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 1.75,
                    type: 'spring',
                    stiffness: 200,
                    damping: 8,
                  }}
                  className="relative inline-block"
                >
                  <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    1 minute
                  </span>
                  {/* Glowing background */}
                  <motion.div
                    className="absolute -inset-4 -z-10 rounded-2xl bg-linear-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  {/* Underline - Animated fill from left to right */}
                  <motion.div
                    className="absolute right-0 -bottom-2 left-0 z-10 h-2 overflow-hidden rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.3 }}
                  >
                    <motion.div
                      className="h-full rounded-full bg-linear-to-r from-blue-600 via-purple-600 to-pink-600"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.2, delay: 2.4, ease: 'easeInOut' }}
                    />
                  </motion.div>
                  {/* Sparkle effects */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      initial={{ opacity: 0, scale: 0, rotate: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        rotate: 360,
                        x: [0, (i - 1) * 30],
                        y: [0, -40],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 2.5 + i * 0.2,
                        ease: 'easeOut',
                      }}
                      style={{
                        top: '50%',
                        left: '50%',
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.span>
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mx-auto mb-12 max-w-3xl text-xl text-gray-600 md:text-2xl"
          >
            Smart, fast and secure POS solution for modern businesses
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8, type: 'spring' }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handleTryNow} size="lg" className="group relative overflow-hidden px-12 py-5 text-xl">
                <motion.span
                  className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 2,
                    delay: 2.2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  style={{ opacity: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Try Now
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    →
                  </motion.span>
                </span>
              </Button>
            </motion.div>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.1, duration: 0.6 }}
              className="flex items-center gap-4 text-sm text-gray-600"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.3, type: 'spring', bounce: 0.6 }}
                className="flex items-center gap-1"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-green-500"
                >
                  ✓
                </motion.span>
                No credit card
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, type: 'spring', bounce: 0.6 }}
                className="flex items-center gap-1"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="text-green-500"
                >
                  ✓
                </motion.span>
                Free trial
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 rounded-2xl border border-white/20 bg-white/50 p-8 backdrop-blur-sm"
          >
            {[
              { number: '10K+', label: 'Active Users' },
              { number: '99.9%', label: 'Uptime' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, type: 'spring' }}
                className="text-center"
              >
                <div className="mb-2 text-3xl font-bold text-blue-600 md:text-4xl">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 transform"
          >
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 overflow-hidden bg-white/50 px-4 py-20 backdrop-blur-sm">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-64 w-64 rounded-full bg-linear-to-br from-indigo-100/40 to-purple-100/40 blur-3xl"
              initial={{
                x: Math.random() * 1920,
                y: Math.random() * 1000,
              }}
              animate={{
                x: [null, Math.random() * 1920],
                y: [null, Math.random() * 1000],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
            >
              <span className="text-lg">✨</span>
              <span>Features</span>
            </motion.div>

            {/* Title with gradient */}
            <h2 className="mb-6 bg-linear-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl lg:text-7xl">
              Everything You Need
            </h2>

            {/* Subtitle */}
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl">
              Powerful features designed to help you manage your business
              <span className="font-semibold text-indigo-600"> efficiently</span> and
              <span className="font-semibold text-indigo-600"> effortlessly</span>
            </p>
          </motion.div>

          {/* Features Grid with Enhanced Design */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 overflow-hidden bg-linear-to-b from-gray-50 to-white px-4 py-20">
        {/* Animated background grid */}
        <div className="absolute inset-0 -z-10">
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Floating orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-linear-to-br from-blue-400/20 to-indigo-400/20 blur-2xl"
              style={{
                width: Math.random() * 300 + 200,
                height: Math.random() * 300 + 200,
              }}
              initial={{
                x: Math.random() * 1920,
                y: Math.random() * 1000,
              }}
              animate={{
                x: [null, Math.random() * 1920],
                y: [null, Math.random() * 1000],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
            >
              <span className="text-lg">💎</span>
              <span>Pricing Plans</span>
            </motion.div>

            {/* Title with gradient */}
            <h2 className="mb-6 bg-linear-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl lg:text-7xl">
              Simple, Transparent Pricing
            </h2>

            {/* Subtitle */}
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl">
              Choose the <span className="font-semibold text-blue-600">perfect plan</span> for your business. No hidden
              fees, no surprises.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                name={plan.name}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                popular={plan.popular}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-gray-400">© 2025 POS Software. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
