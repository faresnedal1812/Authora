import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-green-900 to-emerald-900 flex items-center justify-center overflow-hidden">
      <motion.div
        className="h-16 w-16 border-3 border-green-200 rounded-full border-t-green-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
