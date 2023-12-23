import { PADDING_LAYOUT } from "@/Layouts/PanelLayout";
import { useState, useEffect, useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import { ISLANDS, PROVINCES, SEAS } from "@/constants/IranProvinces";
import { useProvincesInfo } from "@/hooks/useProvincesInfo";
import SimpleSpinner from "./SimpleSpinner";
import { enToFaNumber } from "@/Utility/utils";
import { useScrollPxDetect } from "@/hooks/useScrollPxDetect";

const INITIAL_PORTAL_STATE = {
  style: {},
  province: "",
  show: false,
  pos: -1,
};

const IranMapInfo = () => {
  const { data: allProvincesData, isLoading, isFetching } = useProvincesInfo();
  const [portalConfig, setPortalConfig] = useState(INITIAL_PORTAL_STATE);
  const { scrollPosition } = useScrollPxDetect();

  const handleChangePortal = (name, value) => {
    setPortalConfig((prev) => ({ ...prev, [name]: value }));
  };

  const informProvince = (obj) => {
    const province = allProvincesData.find((item) => item.id === obj.id);

    return { ...province, ...obj };
  };
  useEffect(() => {
    if (portalConfig.show && Math.abs(scrollPosition - portalConfig.pos) > 50) {
      setPortalConfig(INITIAL_PORTAL_STATE);
    }
  }, [portalConfig.show, scrollPosition]);

  const Iran = useMemo(
    () =>
      allProvincesData && (
        <svg viewBox="0 0 1200 1070.6" width={"100%"} height={"100%"}>
          <g>
            {PROVINCES.map((province) => {
              return (
                <ProvinceComponent
                  key={province.id}
                  province={informProvince(province)}
                  handleChangePortal={handleChangePortal}
                  portalConfig={portalConfig}
                />
              );
            })}
          </g>

          <g>
            {SEAS.Khazr}
            {SEAS.Khalij}
          </g>
          <g>{ISLANDS}</g>
        </svg>
      ),
    [allProvincesData]
  );

  return (
    <div className={`bg-white py-10 ${PADDING_LAYOUT}`}>
      <h2 className="whitespace-nowrap text-center text-3xl font-bold text-primary-900 xs:text-3.2xl">
        مشتریان دراپ
      </h2>

      <div className="mt-16 h-[500px]">
        {isLoading || isFetching ? (
          <SimpleSpinner />
        ) : (
          <>
            {Iran}
            <MyPortal>
              <div
                className="fixed rounded-md border border-white bg-gray-800 p-2 text-xs text-white shadow-lg"
                style={portalConfig.style}
              >
                <strong>{portalConfig.province?.title}</strong>:{" "}
                {enToFaNumber(portalConfig.province?.request_count)} بار
              </div>
            </MyPortal>
            <div
              id="myPortal"
              className={` ${portalConfig.show ? "block" : "hidden"}`}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};
const MyPortal = ({ children }) => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  return domReady
    ? ReactDOM.createPortal(children, document.getElementById("myPortal"))
    : null;
};

const ProvinceComponent = ({ province, handleChangePortal, portalConfig }) => {
  const pathRef = useRef();

  const handleOnMouseOver = (e) => {
    const width = 150;
    const space = 1;
    const targetDimensions = pathRef.current.getBoundingClientRect();

    const tooltipStyle = {
      width: width,
      left: Math.max(
        space,
        targetDimensions.left + targetDimensions.width / 2 - width / 2
      ),
      top:
        targetDimensions.top >= window.innerHeight / 2
          ? targetDimensions.top + targetDimensions.height + space
          : undefined,
      bottom:
        targetDimensions.top < window.innerHeight / 2
          ? window.innerHeight - targetDimensions.top + space
          : undefined,
      // bottom: window.innerHeight - targetDimensions.top + space,
      minHeight: "20px",
    };

    handleChangePortal("province", province);
    handleChangePortal("show", true);
    handleChangePortal("style", tooltipStyle);
    handleChangePortal("pos", window.scrollY);
  };
  const handleOnMouseOut = (e) => {
    handleChangePortal("show", false);
  };

  return (
    <path
      {...province}
      ref={pathRef}
      onMouseEnter={handleOnMouseOver}
      onMouseLeave={handleOnMouseOut}
      onClick={() => !portalConfig.show && handleOnMouseOver()}
      className={`${useMemo(
        () => fillCOlors[Math.floor(Math.random() * 9)],
        []
      )} cursor-pointer stroke-white transition-all hover:scale-[1.005] hover:fill-primary-dark`}
    ></path>
  );
};

const fillCOlors = {
  0: "fill-primary-50",
  1: "fill-primary-100",
  2: "fill-primary-200",
  3: "fill-primary-300",
  4: "fill-primary-400",
  5: "fill-primary-500",
  6: "fill-primary-600",
  7: "fill-primary-700",
  8: "fill-primary-800",
};

export default IranMapInfo;
