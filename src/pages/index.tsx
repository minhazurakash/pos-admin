import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { PricingCard } from '@/components/landing/PricingCard';
import { Button } from '@/components/landing/Button';

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
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
        {/* Animated background shapes */}
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

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="mb-6 text-5xl leading-tight font-extrabold text-gray-900 md:text-7xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Setup your POS software in just{' '}
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">1 minute</span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mb-12 max-w-3xl text-xl text-gray-600 md:text-2xl"
          >
            Smart, fast and secure POS solution for modern businesses
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button onClick={handleTryNow} size="lg" className="px-12 py-5 text-xl">
              Try Now
            </Button>
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
      <section className="relative z-10 bg-white/50 px-4 py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl">Everything You Need</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Powerful features to help you manage your business efficiently
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
      <section className="relative z-10 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl">Simple, Transparent Pricing</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">Choose the perfect plan for your business</p>
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
