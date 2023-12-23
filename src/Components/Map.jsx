import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { getLocationName } from "@/Utility/utils";
import { CedarmapToken, defaultCenter } from "@/constants/Const";
import { Marker, Polyline, Tooltip, GeoJSON } from "react-leaflet";
import bezierSpline from "@turf/bezier-spline";
import { lineString } from "@turf/helpers";
// import "leaflet/dist/leaflet.css";
const limeOptions = { color: "#1C2536" };

const TriangleIcon = new L.Icon({
  iconUrl: "./Assets/images/triangle.svg",
  iconRetinaUrl: "./Assets/images/triangle.svg",
  shadowUrl: null,
  iconSize: [25, 55],
  iconAnchor: [17, 27],
  popupAnchor: [1, -34],
  tooltipAnchor: [50, -12],
  shadowSize: [41, 41],
});
const CircleIcon = new L.Icon({
  iconUrl: "./Assets/images/circle.svg",
  iconRetinaUrl: "./Assets/images/circle.svg",
  shadowUrl: null,
  iconSize: [25, 55],
  iconAnchor: [17, 27],
  popupAnchor: [1, -34],
  tooltipAnchor: [41, -12],
  shadowSize: [41, 41],
});

const Map = (props) => {
  const {
    children,
    bounds,
    setMapData,
    centerMarker,
    zoom = 14,
    directions = [],
    arrowDirections = [],
    sourceMarkers = [],
    destinationMarkers = [],
    // for freeze map
    // freeze = false,
  } = props;
  const [center, setCenter] = useState(props.center || defaultCenter);
  const [leafMap, setLeafMap] = useState(null);

  useEffect(() => {
    if (leafMap && props?.center) {
      setCenter(props?.center);
      leafMap.flyTo(props?.center, zoom);
    }
  }, [leafMap, props?.center, zoom]);

  const renderMarker = () => (
    <div
      className="absolute left-1/2 top-1/2 flex items-center justify-center"
      style={{ transform: "translate(-50%,-50%)" }}
    >
      <Image
        src="./Assets/images/marker.svg"
        width={25}
        height={40}
        alt="marker"
      />
    </div>
  );

  // Get location name on start
  useEffect(() => {
    if (setMapData) {
      getLocationName(center).then((res) => {
        setMapData({ name: res, center });
      });
    }
  }, [center]);

  // for freeze map
  // useEffect(() => {
  //   if (leafMap) {
  //     setFreeze(freeze);
  //   }
  // }, [freeze]);

  // const setFreeze = (val) => {
  //   if (val) {
  //     leafMap.dragging.disable();
  //     leafMap.scrollWheelZoom.disable();
  //     leafMap.touchZoom.disable();
  //   } else {
  //     leafMap.dragging.enable();
  //     leafMap.scrollWheelZoom.enable();
  //     leafMap.touchZoom.enable();
  //   }
  // };

  return (
    <>
      <Head>
        <link
          href="https://api.cedarmaps.com/cedarmaps.js/v1.8.0/cedarmaps.css"
          rel="stylesheet"
        />
      </Head>

      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={center}
        zoomControl={false}
        scrollWheelZoom={"center"}
        {...props}
        doubleClickZoom={false}
        zoom={zoom}
        attributionControl={false}
        ref={setLeafMap}
      >
        <TileLayer
          url={`https://api.cedarmaps.com/v1/tiles/cedarmaps.streets/{z}/{x}/{y}.png?access_token=${CedarmapToken}`}
        />
        <MapHandler
          center={center}
          bounds={bounds}
          onMoveEnd={(value) => {
            setCenter([value.lat, value.lng]);
          }}
        />
        {children}
        {centerMarker && renderMarker()}
        {/* arrow Directions */}
        {arrowDirections.length !== 0 &&
          arrowDirections.map((item, i) => {
            return (
              <ArrowMarkerMap
                key={i}
                row={{
                  source_lat: item[0],
                  source_lng: item[1],
                  destination_lat: item[2],
                  destination_lng: item[3],
                }}
                hideTooltip={true}
              />
            );
          })}

        {/* directions */}
        {directions.length !== 0 && (
          <>
            <Polyline pathOptions={limeOptions} positions={directions} />
            <Marker icon={CircleIcon} position={directions[0]}>
              <Tooltip
                direction="top"
                className="rounded-2xl bg-primary-dark px-3 text-white"
                opacity={1}
                permanent
              >
                <span className="text-xs "> مبدا </span>
              </Tooltip>
            </Marker>
            <Marker
              icon={TriangleIcon}
              position={directions[directions.length - 1]}
            >
              <Tooltip
                direction="top"
                className="rounded-2xl bg-primary-dark px-3 text-white"
                opacity={1}
                permanent
              >
                <span className="text-xs"> مقصد </span>
              </Tooltip>
            </Marker>
          </>
        )}

        {/* source Markers  */}
        {sourceMarkers.length !== 0 &&
          sourceMarkers.map((item, i) => {
            return (
              <Marker position={[item.lat, item.lng]} icon={CircleIcon} key={i}>
                {!item?.hideTooltip && (
                  <Tooltip
                    direction="top"
                    className="rounded-2xl bg-primary-dark px-3 text-white"
                    opacity={1}
                    permanent
                  >
                    <span className="text-xs "> {item?.title ?? "مبدا"} </span>
                  </Tooltip>
                )}
              </Marker>
            );
          })}

        {/* destination Markers */}
        {destinationMarkers.length !== 0 &&
          destinationMarkers.map((item, i) => {
            return (
              <Marker
                position={[item.lat, item.lng]}
                icon={TriangleIcon}
                key={i}
              >
                {!item?.hideTooltip && (
                  <Tooltip
                    direction="top"
                    className="rounded-2xl bg-primary-dark px-3 text-white"
                    opacity={1}
                    permanent
                  >
                    <span className="text-xs "> {item?.title ?? "مقصد"} </span>
                  </Tooltip>
                )}
              </Marker>
            );
          })}
      </MapContainer>
    </>
  );
};

const MapHandler = ({ bounds, onMoveEnd }) => {
  const map = useMap();

  const mapEvents = useMapEvents({
    moveend(e) {
      onMoveEnd(mapEvents.getCenter());
    },
  });

  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [70, 70] });
    }
  }, [bounds]);

  return <></>;
};

const ArrowMarkerMap = ({ row, hideTooltip }) => {
  const color = "#1C2536";
  const Markers = useMemo(() => {
    const finalResult = [];

    const latLng1 = [row.source_lat, row.source_lng];
    const latLng2 = [row.destination_lat, row.destination_lng];

    const offsetX = latLng2[1] - latLng1[1];
    const offsetY = latLng2[0] - latLng1[0];

    const r1 = Math.sqrt(offsetX ** 2 + offsetY ** 2);
    const theta = Math.atan2(offsetY, offsetX);

    const thetaOffset = 3.14 / 10;

    const r2 = r1 / 2 / Math.cos(thetaOffset);
    const theta2 = theta + thetaOffset;

    const midpointX = r2 * Math.cos(theta2) + latLng1[1];
    const midpointY = r2 * Math.sin(theta2) + latLng1[0];

    const midpointLatLng = [midpointY, midpointX];

    finalResult.push(latLng1, midpointLatLng, latLng2);

    const line = lineString(
      finalResult.map((latLng) => [latLng[1], latLng[0]])
    );
    const curved = bezierSpline(line, { sharpness: 1, resolution: 20000 });

    return (
      <>
        <Marker position={[row.source_lat, row.source_lng]} icon={CircleIcon}>
          {hideTooltip && (
            <Tooltip
              direction="top"
              className="rounded-2xl bg-primary-dark px-3 text-white"
              opacity={1}
              permanent
            >
              <span className="text-xs "> مبدا </span>
            </Tooltip>
          )}
        </Marker>

        <Marker
          position={[row.destination_lat, row.destination_lng]}
          icon={TriangleIcon}
        >
          {hideTooltip && (
            <Tooltip
              direction="top"
              className="rounded-2xl bg-primary-dark px-3 text-white"
              opacity={1}
              permanent
            >
              <span className="text-xs "> مقصد </span>
            </Tooltip>
          )}
        </Marker>

        <>
          <GeoJSON data={curved} pathOptions={{ weight: 5, color: color }} />
        </>
      </>
    );
  }, [row, hideTooltip]);

  return <>{Markers}</>;
};

export default Map;
