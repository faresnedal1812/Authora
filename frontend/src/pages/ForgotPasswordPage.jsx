import { motion } from "framer-motion";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const { forgotPassword, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmited(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div className="bg-gray-900/50 backdrop-blur-xl shadow-2xl rounded-2xl max-w-md w-full mx-auto">
      {isSubmited ? (
        <>
          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text text-center">
              Forgot Password
            </h2>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="mx-auto bg-green-400 w-16 h-16 rounded-full flex items-center justify-center"
            >
              <Mail className="w-8 h-8 text-white" />
            </motion.div>

            <p className="text-sm text-gray-300 text-center">
              If an account exists for {email}, you will receive a password
              reset link shortly.
            </p>
          </div>
          <div className="bg-gray-900/50 text-green-400 rounded-b-2xl">
            <Link
              to={"/login"}
              className="flex items-center justify-center px-8 py-4 gap-1 text-sm"
            >
              <ArrowLeft className="size-5" />
              <span className="hover:underline">Back to Login</span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text text-center">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-300 text-center">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <form onSubmit={handleSubmit}>
              <Input
                icon={Mail}
                type="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 flex justify-center bg-gradient-to-r from-green-400 to-emerald-600 w-full px-4 py-2.5 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-emerald-600 hover:to-green-400 transition-colors duration-300 focus:ring-green-400 focus:ring-2 focus:border-green-400 text-white font-semibold uppercase disabled:opacity-80"
              >
                {isLoading ? (
                  <Loader className="size-5 animate-spin" />
                ) : (
                  "Send Reset Link"
                )}
              </motion.button>
            </form>
          </div>
          <div className="bg-gray-900/50 text-green-400 rounded-b-2xl">
            <Link
              to={"/login"}
              className="flex items-center justify-center px-8 py-4 gap-1 text-sm"
            >
              <ArrowLeft className="size-5" />
              <span className="hover:underline">Back to Login</span>
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ForgotPasswordPage;
