import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Auto-generated credentials (in real app, these would come from backend)
  const credentials = {
    panelUrl: 'https://pos.yourcompany.com/admin',
    email: router?.query?.ownerEmail || '',
    password: '123456',
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated background elements */}
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
        className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-purple-200 opacity-20 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.6 }}
            className="mb-6 inline-block"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full bg-green-400 blur-2xl"
              />
              <div className="relative rounded-full bg-linear-to-br from-green-400 to-emerald-500 p-6 shadow-2xl">
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-20 w-20 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </motion.svg>
              </div>
            </div>
          </motion.div>

          {/* Congratulations Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
            className="mb-4 bg-linear-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl"
          >
            🎉 Congratulations! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 md:text-2xl"
          >
            Your POS software is successfully set up and ready to use!
          </motion.p>

          {/* Credentials Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white/70 p-8 shadow-2xl backdrop-blur-xl"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-white/50 to-transparent" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring', bounce: 0.5 }}
                className="mb-6 inline-block rounded-full bg-blue-100 p-3 text-3xl"
              >
                🔑
              </motion.div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">Your Access Credentials</h2>
              <p className="mb-6 text-sm text-amber-600">
                ⚠️ Please save these credentials securely. You can change the password after your first login.
              </p>

              <div className="space-y-4">
                {/* POS Panel URL */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 text-left"
                >
                  <label className="mb-2 block text-sm font-semibold text-gray-700">POS Panel URL</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 overflow-hidden rounded-lg border border-blue-200 bg-white px-4 py-3">
                      <a
                        href={credentials.panelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {credentials.panelUrl}
                      </a>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => copyToClipboard(credentials.panelUrl, 'url')}
                      className="rounded-lg bg-blue-500 px-4 py-3 text-white shadow-lg transition-all hover:bg-blue-600"
                    >
                      {copiedField === 'url' ? '✓' : '📋'}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="rounded-2xl border border-purple-100 bg-purple-50/50 p-4 text-left"
                >
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Email</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 overflow-hidden rounded-lg border border-purple-200 bg-white px-4 py-3 font-mono text-gray-900">
                      {credentials.email}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => copyToClipboard(credentials.email as string, 'email')}
                      className="rounded-lg bg-purple-500 px-4 py-3 text-white shadow-lg transition-all hover:bg-purple-600"
                    >
                      {copiedField === 'email' ? '✓' : '📋'}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="rounded-2xl border border-pink-100 bg-pink-50/50 p-4 text-left"
                >
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Temporary Password <span className="text-xs text-gray-500">(Auto-generated)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 overflow-hidden rounded-lg border border-pink-200 bg-white px-4 py-3 font-mono text-gray-900">
                      {credentials.password}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => copyToClipboard(credentials.password, 'password')}
                      className="rounded-lg bg-pink-500 px-4 py-3 text-white shadow-lg transition-all hover:bg-pink-600"
                    >
                      {copiedField === 'password' ? '✓' : '📋'}
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
              >
                <motion.a
                  href={credentials.panelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:shadow-xl"
                >
                  🚀 Access Your POS Panel
                </motion.a>
                <motion.button
                  onClick={() => router.push('/')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl border-2 border-gray-300 bg-white px-8 py-4 font-bold text-gray-700 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
                >
                  ← Back to Home
                </motion.button>
              </motion.div>

              {/* Success message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-6 rounded-xl bg-green-50 p-4 text-sm text-green-700"
              >
                ✨ <strong>Pro Tip:</strong> Bookmark the POS panel URL and change your password after the first login
                for security.
              </motion.div>
            </div>
          </motion.div>

          {/* Confetti effect */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -200 - Math.random() * 200],
                x: [(Math.random() - 0.5) * 400],
                scale: [0, 1, 0],
                rotate: [0, Math.random() * 360],
              }}
              transition={{
                duration: 2,
                delay: 0.8 + i * 0.1,
                ease: 'easeOut',
              }}
              style={{
                left: '50%',
                top: '30%',
              }}
            >
              {['🎉', '🎊', '✨', '🌟', '💫'][i % 5]}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
