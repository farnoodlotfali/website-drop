import LoadingSpinner from "@/Components/LoadingSpinner";
import { SvgSPrite } from "@/Components/SvgSPrite";
import InputIconEnd from "@/Components/form/InputIconEnd";
import TextInput from "@/Components/form/TextInput";
import SelectVContainer from "@/Components/selects/SelectVContainer";
import {
  calculateZoom,
  findBiggerNumber,
  getPathCoordinates,
  numberWithCommas,
} from "@/Utility/utils";
import { simpleAxiosApi } from "@/api/axiosApi";
import { defaultCenter } from "@/constants/Const";

import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, memo, useEffect, useMemo, useState } from "react";
import { useController, useForm } from "react-hook-form";

// Initialize Map
const Map = dynamic(() => import("@/Components/Map"), {
  ssr: false,
});

const INITIAL_MAP_STATE = {
  center: defaultCenter,
  zoom: 14,
  centerMarker: true,
  arrowDirections: [],
  sourceMarkers: [],
  destinationMarkers: [],
};

const CostEstimate = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showStepDestination, setShowStepDestination] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [priceEstimate, setPriceEstimate] = useState(null);
  // map give this data to us
  const [mapData, setMapData] = useState({});
  //  we give data to map
  const [controlMap, setControlMap] = useState(INITIAL_MAP_STATE);
  // hold data
  const [formData, setFormData] = useState({});

  // reset form
  const resetToEstimate = () => {
    setFormData({});
    setControlMap(INITIAL_MAP_STATE);
    setShowStepDestination(false);
    setStep(0);
    setShowResult(false);
  };

  const handleFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    if (step === 4) {
      getPrices();
    }
  }, [step]);

  const getPrices = async () => {
    setLoading(true);
    try {
      const res = await simpleAxiosApi({
        url: `/request/get-price?source_lat=${formData?.source_lat}&source_lng=${formData?.source_lng}&destination_lat=${formData?.destination_lat}&destination_lng=${formData?.destination_lng}&container_type_id=${formData?.container?.id}`,
      });
      setPriceEstimate((prev) => ({ ...prev, ...res.data.Data }));
      setShowResult(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleBackButton = () => {
    switch (step) {
      case 0: {
        router.back();
        break;
      }
      case 1: {
        handleEdit("source", 0);
        break;
      }
      case 2: {
        handleEdit("destination", 1);
        break;
      }
      case 3: {
        setStep(2);
        break;
      }

      default:
        break;
    }
  };

  const handleEdit = (inputName, step) => {
    if (step === 0 && !formData?.destination) {
      setShowStepDestination(false);
    }
    setStep(step);
    let lat = `${inputName}_lat`;
    let lng = `${inputName}_lng`;
    setControlMap((prev) => ({
      ...prev,
      center: [formData[lat], formData[lng]],
      zoom: 13,
      arrowDirections: [],
      centerMarker: true,
      [`${inputName}Markers`]: [],
    }));
    setFormData((prev) => {
      [lat, lng, inputName].forEach((item) => {
        delete prev[item];
      });

      return { ...prev };
    });
  };

  return (
    <>
      <Head>
        <title> دراپ - تـخـمـیـن بـار </title>
      </Head>

      {showResult ? (
        <ResultCostEstimate
          resetToEstimate={resetToEstimate}
          data={priceEstimate}
        />
      ) : (
        <div className="h-screen">
          <Map
            center={controlMap.center}
            zoom={controlMap.zoom}
            arrowDirections={controlMap.arrowDirections}
            setMapData={setMapData}
            centerMarker={controlMap.centerMarker}
            sourceMarkers={controlMap.sourceMarkers}
            destinationMarkers={controlMap.destinationMarkers}
          >
            <div className="fixed bottom-0 left-0 right-0 z-10">
              {/* Back Button */}
              <div
                role="button"
                className="fixed right-16 top-8 h-14 w-14 rounded-lg bg-white p-4 shadow-md transition-all hover:brightness-95"
                onClick={() => handleBackButton()}
              >
                <SvgSPrite icon="arrow_right" />
              </div>

              <div className="mx-auto grid max-w-xl gap-2 rounded-t-lg bg-white p-4 ">
                {step === 3 ? (
                  <VehicleInput
                    formData={formData}
                    handleFormData={handleFormData}
                    setStep={setStep}
                  />
                ) : (
                  <AddressesInputs
                    formData={formData}
                    handleFormData={handleFormData}
                    mapData={mapData}
                    setControlMap={setControlMap}
                    setPriceEstimate={setPriceEstimate}
                    step={step}
                    setStep={setStep}
                    setShowStepDestination={setShowStepDestination}
                    showStepDestination={showStepDestination}
                    setFormData={setFormData}
                    handleEdit={handleEdit}
                  />
                )}
              </div>
            </div>
          </Map>
        </div>
      )}
      {loading && (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex w-full flex-col items-center bg-white/80 pt-10">
          <LoadingSpinner />
          <span className="mt-2"> در حال محاسبه قیمت... </span>
        </div>
      )}
    </>
  );
};

const VehicleInput = memo(({ formData, handleFormData, setStep }) => {
  const { handleSubmit, control } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [focused, setFocused] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    name: "container",
    control: control,
    rules: {
      required: "نوع بارگیر را وارد کنید",
    },
  });

  const onFocus = () => setFocused(true);
  const onBlur = () => {
    field.onBlur();
    setFocused(false);
  };

  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
    setFocused((prev) => !prev);
  };

  const onSubmit = async (data) => {
    handleFormData(data);
    setStep(4);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=" grid gap-3 ">
        <div className="w-full text-base">
          <label
            htmlFor="container"
            className={`relative block rounded-[5px] border-2 
             p-4 placeholder-slate-700
             ${
               !!error
                 ? "border-red-500"
                 : focused
                 ? "border-primary-700"
                 : "border-primary-light"
             } 
             `}
          >
            <div
              role="button"
              className={` absolute left-3 top-1/2 z-0 flex -translate-y-1/2 transform  items-center 
              justify-center rounded-md bg-primary-dark px-3 py-2 text-xs text-white `}
              onClick={toggleShowModal}
            >
              انتخاب بارگیر
            </div>

            <input
              name={field.name}
              value={field.value?.title || ""}
              ref={field.ref}
              onChange={field.onChange}
              id={field.name}
              type={"text"}
              placeholder={"نوع بارگیر"}
              onFocus={onFocus}
              onBlur={onBlur}
              readOnly={true}
              className={`w-full cursor-default `}
              onWheel={(e) => e.target.blur()}
            />
          </label>
          {!!error && (
            <div className="mt-1 text-start text-xs text-red-500">
              {error?.message}
            </div>
          )}
        </div>

        <button
          className="w-full rounded-md bg-primary-900 py-3 text-center text-base text-white"
          type="submit"
        >
          تخمین قیمت
        </button>
      </form>

      <SelectVContainer
        onClose={toggleShowModal}
        show={showModal}
        setData={field.onChange}
        data={field.value}
      />
    </>
  );
});

const SUBMIT_BUTTONS = ["ثبت مبدأ", "ثبت مقصد", "انتخاب بارگیر"];

const AddressesInputs = memo(
  ({
    formData,
    handleFormData,
    mapData,
    setControlMap,
    setPriceEstimate,
    step,
    setStep,
    showStepDestination,
    setShowStepDestination,
    handleEdit,
  }) => {
    const { handleSubmit, setValue, control } = useForm({
      defaultValues: formData,
    });
    const [disableEdit, setDisableEdit] = useState(false);

    useEffect(() => {
      if (mapData?.center) {
        const input = Inputs[step];
        setValue(input?.name, mapData?.name, { shouldValidate: true });
        setValue(`${input?.name}_lat`, mapData?.center[0]);
        setValue(`${input?.name}_lng`, mapData?.center[1]);
      }
    }, [mapData?.center]);

    const Inputs = useMemo(() => {
      return [
        {
          type: "text",
          name: "source",
          placeholder: "آدرس مبدأ",
          readOnly: true,
          rules: {
            required: "آدرس مبدأ را وارد کنید",
          },
        },
        {
          type: "text",
          name: "destination",
          placeholder: "آدرس مقصد",
          readOnly: true,
          rules: {
            required: "آدرس مقصد را وارد کنید",
          },
          visible: showStepDestination,
        },
      ];
    }, [showStepDestination]);

    const onSubmit = async (data) => {
      if (disableEdit) {
        setDisableEdit(false);
      }
      switch (step) {
        case 0: {
          handleFormData({
            source_lat: data.source_lat,
            source_lng: data.source_lng,
            source: data.source,
          });
          firstStep(data);
          setShowStepDestination(true);
          break;
        }
        case 1: {
          handleFormData({
            destination_lat: data.destination_lat,
            destination_lng: data.destination_lng,
            destination: data.destination,
          });
          secondStep(data);
          break;
        }
        case 2: {
          finalStep(data);
          break;
        }

        default:
          break;
      }
    };

    const firstStep = (data) => {
      let newStep = 1;
      setControlMap((prev) => ({
        ...prev,
        sourceMarkers: [
          {
            lat: data.source_lat,
            lng: data.source_lng,
            title: "مبدا",
          },
        ],
        center: [data.source_lat + 0.007, data.source_lng + 0.007],
      }));
      if (showStepDestination && !!formData?.destination) {
        finalStep(data);
        newStep = 2;
      }

      setStep(newStep);
    };
    const secondStep = (data) => {
      setControlMap((prev) => ({
        ...prev,
        destinationMarkers: [
          {
            lat: data.destination_lat,
            lng: data.destination_lng,
            title: "مقصد",
          },
        ],
      }));
      if (showStepDestination) {
        finalStep(data);
      }
      setStep(2);
    };

    const finalStep = (data) => {
      let sLat = data.source_lat;
      let sLng = data.source_lng;
      let dLat = data.destination_lat;
      let dLng = data.destination_lng;

      getTimeAndDistance([
        [sLat, sLng],
        [dLat, dLng],
      ]);

      setControlMap((prev) => ({
        ...prev,
        center: [(sLat + dLat) / 2, (sLng + dLng) / 2],
        zoom: calculateZoom(findBiggerNumber(sLat - dLat, sLng - dLng)),
        arrowDirections: [[sLat, sLng, dLat, dLng]],
        centerMarker: false,
      }));

      setStep(3);
    };

    const getTimeAndDistance = async (path) => {
      try {
        const res = await getPathCoordinates(path);
        setPriceEstimate((prev) => ({
          ...prev,
          distance: res?.distance,
          time: res?.time,
        }));
      } catch (error) {}
    };

    const editInputAddress = (inputName, step) => {
      setDisableEdit(true);
      handleEdit(inputName, step);
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          {Inputs.map((input, i) => {
            return (
              <Fragment key={input.name}>
                {input.visible !== false && (
                  <TextInput
                    control={control}
                    input={input}
                    iconEnd={
                      formData?.[input.name] && (
                        <InputIconEnd
                          icon={<SvgSPrite icon="pen" />}
                          disable={disableEdit}
                          onClick={() => editInputAddress(input.name, i)}
                        />
                      )
                    }
                  />
                )}
              </Fragment>
            );
          })}

          <button
            className="w-full rounded-md bg-primary-900 py-3 text-center text-base text-white"
            type="submit"
          >
            {SUBMIT_BUTTONS[step]}
          </button>
        </form>
      </>
    );
  }
);

const ResultCostEstimate = ({ resetToEstimate, data }) => {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-white text-center">
      <div className="flex w-full max-w-lg flex-col gap-3 px-4">
        <h3 className="mb-8 font-bold text-primary-900">
          نـتـیـجـه تـخـمـیـن بـار
        </h3>

        <div className="grid gap-3 ">
          <div className="mb-6 grid gap-5 rounded-lg border border-solid p-4">
            <div className="flex justify-between">
              <div className="font-bold"> مسافت </div>
              <div>
                {numberWithCommas(Number(data?.distance).toFixed(2))} کیلومتر
              </div>
            </div>

            <div className="flex justify-between">
              <div className="font-bold"> مدت زمان </div>
              <div>{numberWithCommas(Math.ceil(data?.time))} دقیقه</div>
            </div>

            <div className="flex justify-between">
              <div className="font-bold"> قیمت حداقل </div>
              <div>{numberWithCommas(data?.low_price)} تومان</div>
            </div>

            <div className="flex justify-between">
              <div className="font-bold"> قیمت حداکثر </div>
              <div>{numberWithCommas(data?.high_price)} تومان</div>
            </div>
          </div>

          <button
            className="rounded-md bg-primary-900 py-3 font-semibold text-white"
            onClick={() => router.push("/")}
          >
            بازگشت به صفحه اصلی
          </button>
          <button
            className="rounded-md border-2 border-solid border-primary-900 bg-white py-3 font-semibold text-primary-900"
            onClick={resetToEstimate}
          >
            امتحان مجدد
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostEstimate;
