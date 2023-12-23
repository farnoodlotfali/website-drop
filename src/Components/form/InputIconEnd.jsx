const ICON_END_CLASSNAMES =
  "absolute left-3 top-1/2 flex  -translate-y-1/2 transform items-center justify-center rounded-full bg-primary-light";

const InputIconEnd = ({ icon, className = "", disable, ...rest }) => {
  return (
    <div
      className={`${ICON_END_CLASSNAMES} ${
        disable ? "pointer-events-none text-gray-300" : "cursor-pointer"
      } p-2 text-black ${className}`}
      {...rest}
    >
      {icon}
    </div>
  );
};

export default InputIconEnd;
