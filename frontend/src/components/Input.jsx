const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-5">
      <div className="absolute inset-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-green-500" />
      </div>
      <input
        {...props}
        className="bg-gray-800/50 py-2 pr-3 pl-10 border border-gray-700 rounded-lg placeholder-gray-400 placeholder:text-xs placeholder:italic placeholder:font-medium text-white text-sm w-full focus:border-green-400 focus:outline-none focus:ring-green-400 transition duration-200"
      />
    </div>
  );
};

export default Input;
