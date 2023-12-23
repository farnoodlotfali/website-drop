import { SvgSPrite } from "./SvgSPrite";

const BACKGROUND_DOWNLOAD_BUTTON = {
  primary: "bg-primary-dark",
  secondary: "bg-secondary-dark",
};

const DownloadButton = ({ label, color = "primary", className = "" }) => {
  return (
    <div
      role="button"
      className={`flex items-center gap-2 rounded ${BACKGROUND_DOWNLOAD_BUTTON[color]} px-3 py-2 ${className}`}
    >
      <h6>{label}</h6>
      <SvgSPrite icon="arrow_down" size="small" />
    </div>
  );
};

export default DownloadButton;
