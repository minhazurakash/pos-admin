import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { useRouter } from 'next/router';

interface PricingCardProps {
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  index: number;
}

export const PricingCard: React.FC<PricingCardProps> = ({ name, price, period, features, popular = false, index }) => {
  const router = useRouter();

  const handleTryNow = () => {
    router.push(`/onboarding?package=${name.toLowerCase()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`relative rounded-2xl border-2 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl ${
        popular ? 'border-blue-500 shadow-blue-100' : 'border-gray-100'
      }`}
    >
      {popular && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 transform rounded-full bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-lg"
        >
          Most Popular
        </motion.div>
      )}

      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-bold text-gray-900">{name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-extrabold text-gray-900">৳{price}</span>
          <span className="text-gray-600">/ {period}</span>
        </div>
      </div>

      <ul className="mb-8 space-y-4">
        {features.map((feature, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="flex items-start gap-3"
          >
            <svg className="h-6 w-6 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </motion.li>
        ))}
      </ul>

      <Button onClick={handleTryNow} variant={popular ? 'primary' : 'outline'} size="lg" className="w-full">
        Try Now
      </Button>
    </motion.div>
  );
};
