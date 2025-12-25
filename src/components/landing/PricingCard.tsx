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
      className="group relative"
      style={{ paddingTop: popular ? '2rem' : '0' }}
    >
      {/* Popular badge - positioned outside card */}
      {popular && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="absolute -top-4 left-1/2 z-20 -translate-x-1/2"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 4px 20px rgba(59, 130, 246, 0.4)',
                '0 4px 30px rgba(99, 102, 241, 0.6)',
                '0 4px 20px rgba(59, 130, 246, 0.4)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-2 whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                ⭐
              </motion.span>
              <span className="text-sm font-bold text-white">Most Popular</span>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Card container with glass morphism */}
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500 ${
          popular
            ? 'border-white/20 bg-gradient-to-br from-white/90 to-white/70 shadow-2xl shadow-blue-500/20'
            : 'border-gray-200/50 bg-white/80 shadow-xl hover:shadow-2xl'
        }`}
      >
        {/* Animated gradient overlay */}
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
            popular
              ? 'bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50'
              : 'bg-gradient-to-br from-blue-50/30 to-indigo-50/20'
          }`}
        />

        {/* Sparkle effect on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
            />
          ))}
        </motion.div>

        <div className="relative p-8">
          {/* Header section */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <h3 className="mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-3xl font-black text-transparent">
                {name}
              </h3>
            </motion.div>

            {/* Price display with animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 150 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="flex items-baseline gap-2">
                <span className="bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-5xl font-black text-transparent">
                  ৳{price}
                </span>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">per {period}</span>
            </motion.div>
          </div>

          {/* Divider with gradient */}
          <div className="mb-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Features list */}
          <ul className="mb-8 space-y-4">
            {features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + idx * 0.08 }}
                className="group/item flex items-start gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    popular
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                      : 'bg-gradient-to-br from-green-400 to-emerald-600'
                  }`}
                >
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <span className="leading-relaxed font-medium text-gray-700 transition-colors group-hover/item:text-gray-900">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button with enhanced styling */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleTryNow}
              variant={popular ? 'primary' : 'outline'}
              size="lg"
              className={`w-full font-bold shadow-lg transition-all duration-300 ${
                popular
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl hover:shadow-blue-500/50'
                  : 'hover:shadow-xl'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Get Started
                <motion.svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
