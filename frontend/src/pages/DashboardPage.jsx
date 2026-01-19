import { motion } from "framer-motion";
import { useAuthStore } from "./../store/useAuthStore";
import { formatDate } from "./../utils/formatDate";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  return (
    <div className="bg-gray-900/80 max-w-md w-full mx-auto rounded-2xl backdrop-blur-xl shadow-2xl">
      <div className="p-8">
        <h2 className="text-3xl text-center font-bold bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text mb-6">
          Dashboard
        </h2>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-4 border rounded-lg border-gray-700 bg-gray-800/50"
          >
            <h3 className="text-xl text-emerald-400 mb-4 font-semibold">
              Profile Information
            </h3>
            <div className=" space-y-1">
              <p className="text-gray-300 text-base font-medium">
                Name: <span className="text-sm text-gray-400">{user.name}</span>
              </p>
              <p className="text-gray-300 text-base font-medium">
                Email:{" "}
                <span className="text-sm text-gray-400">{user.email}</span>
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-4 border rounded-lg border-gray-700 bg-gray-800/50"
          >
            <h3 className="text-xl text-emerald-400 mb-4 font-semibold">
              Account Activity
            </h3>
            <div className=" space-y-1">
              <p className="text-gray-300 text-base font-medium">
                Joined:{" "}
                <span className="text-sm text-gray-400">
                  {formatDate(user.createdAt)}
                </span>
              </p>
              <p className="text-gray-300 text-base font-medium">
                Last Login:{" "}
                <span className="text-sm text-gray-400">
                  {formatDate(user.lastLogin)}
                </span>
              </p>
            </div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={logout}
            className="w-full bg-gradient-to-r from-green-400 to-emerald-600 px-6 py-3 rounded-lg text-white font-medium uppercase cursor-pointer hover:bg-gradient-to-r hover:from-emerald-600 hover:to-green-400 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
