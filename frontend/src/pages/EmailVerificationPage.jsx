import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "./../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  // console.log(inputRefs);
  const navigate = useNavigate();
  const { isLoading, verifyEmail, error } = useAuthStore();

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    // typing in the last index is not allowed
    if (index === 5 && code[5] !== "" && value !== "") return;

    const newCode = [...code];

    // handle pasted code
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="max-w-md w-full mx-auto bg-gray-800/50 rounded-2xl backdrop-filter backdrop-blur-xl shadow-xl overflow-hidden">
      <motion.div
        className="p-8 max-w-md w-full mx-auto bg-gray-800/50 rounded-2xl backdrop-filter backdrop-blur-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-6 text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text text-center">
          Verify Your Email
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Enter the 6-digit code sent to your email address.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 bg-gray-700 text-center text-white text-2xl rounded-lg border-2 border-gray-600 focus:outline-none focus:border-green-400"
              />
            ))}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-400 to-emerald-600 w-full px-4 py-2.5 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-emerald-600 hover:to-green-400 transition-colors duration-300 focus:ring-green-400 focus:ring-2 focus:border-green-400 text-white font-semibold uppercase disabled:opacity-80"
          >
            {isLoading ? "Verifing..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
      <div className="bg-gray-900/50 text-green-400 rounded-b-2xl">
        <Link
          to={"/login"}
          className="flex items-center justify-center px-8 py-4 gap-1 text-sm"
        >
          <ArrowLeft className="size-5" />
          <span className="hover:underline">Back to Login</span>
        </Link>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
