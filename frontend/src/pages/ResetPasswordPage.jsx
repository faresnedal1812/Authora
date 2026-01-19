import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isLoading, error, resetPassword } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div className="bg-gray-900/50 backdrop-blur-xl shadow-2xl rounded-2xl max-w-md w-full mx-auto">
      <div className="p-8 space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              "Set New Password"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
