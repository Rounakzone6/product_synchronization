const Input = ({ label, disabled, ...props }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        disabled={disabled}
        className={`mt-1 px-3 py-2 rounded-lg border outline-none transition
        ${
          disabled
            ? "bg-gray-100 text-gray-600 cursor-not-allowed"
            : "bg-white border-gray-300 focus:ring-2 focus:ring-green-500"
        }`}
      />
    </div>
  );
};

export default Input;
