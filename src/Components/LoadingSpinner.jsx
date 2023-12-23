import spinnerStyles from "@/styles/spinner.module.css";
const LoadingSpinner = () => {
  return (
    <>
      <span className={spinnerStyles.loader}></span>
    </>
  );
};

export default LoadingSpinner;
