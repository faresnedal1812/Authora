import { motion } from "framer-motion";
import { useState } from "react";
import { Loader, Lock, Mail, User } from "lucide-react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, login, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      className="max-w-md w-full mx-auto bg-gray-800/50 rounded-2xl backdrop-blur-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="p-8">
        <h2 className="text-3xl text-center font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-700 text-transparent bg-clip-text">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            required
            placeholder="johndoe@gmail.com"
            value={formData.email}
            icon={Mail}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            icon={Lock}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Link
            to={"/forgot-password"}
            className="text-green-500 text-sm hover:underline"
          >
            Forget your password?
          </Link>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 flex justify-center bg-gradient-to-r from-green-400 to-emerald-600 w-full px-4 py-2.5 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-emerald-600 hover:to-green-400 transition-colors duration-300 focus:ring-green-400 focus:ring-2 focus:border-green-400 text-white font-semibold uppercase disabled:opacity-80"
          >
            {isLoading ? <Loader className="size-5 animate-spin" /> : "Login"}
          </motion.button>
        </form>
      </div>
      <div className="bg-gray-900/50 px-8 py-4">
        <p className="text-sm text-gray-300 flex items-center gap-1">
          Don't have an account?
          <Link to={"/signup"} className="text-green-400 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
