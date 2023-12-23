const SimpleSpinner = ({ text = "درحال بارگذاری...", showText = true }) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className=" h-10 w-10 animate-spin rounded-full border-8 border-t-8 border-gray-200 border-t-blue-700 "></div>
      {showText && <div className="">{text}</div>}
    </div>
  );
};

export default SimpleSpinner;
