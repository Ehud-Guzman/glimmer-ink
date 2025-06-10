import { motion } from 'framer-motion';
import { FiHome, FiChevronLeft, FiFrown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.main
      className="min-h-screen flex flex-col items-center justify-center bg-[var(--current-bg)] text-[var(--current-text)] p-6 text-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating gradient background elements */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-secondary blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Animated 404 text */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            404
          </h1>
        </motion.div>

        {/* Message & emoji */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
            >
              <FiFrown className="text-4xl text-yellow-500" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg opacity-90 mb-8">
            The page you're looking for doesn't exist or has been moved.  
            Let's get you back on track.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium flex items-center gap-2 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiHome /> Go Home
          </motion.button>

          <motion.button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiChevronLeft /> Go Back
          </motion.button>
        </motion.div>

        {/* Footer link */}
        <motion.div
          className="mt-8 text-sm opacity-80"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>
            Still lost? <a href="/contact" className="text-primary hover:underline">Contact us</a> for help.
          </p>
        </motion.div>
      </div>

      {/* Floating astronaut (just for fun, optional) */}
      <motion.div
        className="absolute bottom-10 left-10 z-10 text-4xl"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        👨‍🚀
      </motion.div>
    </motion.main>
  );
}