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
      whileHover={{ y: -10, scale: 1.02 }}
      className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="mb-4 inline-block rounded-xl bg-linear-to-br from-blue-100 to-indigo-100 p-4"
      >
        {icon}
      </motion.div>

      <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </motion.div>
  );
};
