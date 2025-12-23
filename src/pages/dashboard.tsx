import React from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-block rounded-full bg-green-100 p-6"
          >
            <svg className="h-16 w-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl"
          >
            Welcome to Your Dashboard! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mb-8 max-w-2xl text-xl text-gray-600"
          >
            Your POS software is now ready to use. Start managing your business with ease.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-xl"
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Quick Stats</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-xl border border-blue-100 bg-linear-to-br from-blue-50 to-indigo-50 p-6"
              >
                <div className="mb-2 text-3xl font-bold text-blue-600">0</div>
                <div className="font-medium text-gray-600">Total Sales</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-xl border border-green-100 bg-linear-to-br from-green-50 to-emerald-50 p-6"
              >
                <div className="mb-2 text-3xl font-bold text-green-600">0</div>
                <div className="font-medium text-gray-600">Products</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-xl border border-purple-100 bg-linear-to-br from-purple-50 to-pink-50 p-6"
              >
                <div className="mb-2 text-3xl font-bold text-purple-600">0</div>
                <div className="font-medium text-gray-600">Customers</div>
              </motion.div>
            </div>

            <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-gray-900">🚀 Next Steps</h3>
              <ul className="space-y-2 text-left text-gray-700">
                <li>• Add your first product to the inventory</li>
                <li>• Set up your staff and user roles</li>
                <li>• Configure your outlet information</li>
                <li>• Create your first sale invoice</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
