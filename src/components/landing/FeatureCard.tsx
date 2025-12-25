import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Card container with glass morphism */}
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:shadow-2xl"
      >
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Sparkle effect on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-blue-400"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
              style={{
                left: `${30 + i * 40}%`,
                top: `${15 + i * 25}%`,
              }}
            />
          ))}
        </motion.div>

        <div className="relative">
          {/* Icon with gradient background */}
          <motion.div
            whileHover={{ rotate: 360, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-4 shadow-lg"
          >
            {icon}
          </motion.div>

          {/* Title with gradient text */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="mb-3 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-xl font-bold text-transparent"
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="leading-relaxed text-gray-600 transition-colors group-hover:text-gray-700"
          >
            {description}
          </motion.p>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100/40 to-indigo-200/40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>
    </motion.div>
  );
};
