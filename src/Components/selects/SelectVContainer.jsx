import { memo, useEffect, useMemo, useRef, useState } from "react";
import ModalBox from "../ModalBox";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useInView } from "react-intersection-observer";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import MultiSelect from "../form/MultiSelect";
import { BREAK_POINTS, VEHICLE_CATEGORIES } from "@/constants/Const";
import TextInput from "../form/TextInput";
import { SvgSPrite } from "../SvgSPrite";
import LoadingSpinner from "../LoadingSpinner";
import {
  filteringMethod,
  numberWithCommas,
  removeInvalidValues,
} from "@/Utility/utils";
import { simpleAxiosApi } from "@/api/axiosApi";

const INITIAL_STATE = {
  items: [],
  hasMore: true,
  page: 1,
};

const SelectVContainer = ({ onClose, show, data, setData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [state, setState] = useState(INITIAL_STATE);

  const { handleSubmit, control } = useForm();
  const isTablet = useMediaQuery(`(max-width: ${BREAK_POINTS.md})`);
  const { ref, inView } = useInView();
  const { windowWidth } = useWindowWidth(1024);
  const contentEl = useRef(null);

  const height = useMemo(
    () => contentEl?.current?.scrollHeight,
    [contentEl?.current?.scrollHeight, windowWidth]
  );
  useEffect(() => {
    if (state.hasMore) {
      fetchData();
    }
  }, [inView, filters]);

  const FilterInputs = useMemo(() => {
    return [
      {
        type: "number",
        name: "weight",
        placeholder: "وزن بار (KG)",
      },
    ];
  }, []);

  const fetchData = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const queryParams = filteringMethod({ ...filters, page: state.page });
    try {
      const res = await simpleAxiosApi({
        url: `/vehicle/type${queryParams}`,
      });

      setState((prev) => ({
        hasMore: res.data.Data.last_page > prev.page,
        items: prev.items.concat(res.data.Data.data),
        page: res.data.Data.current_page + 1,
      }));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setState(INITIAL_STATE);
    setFilters(removeInvalidValues(data));
  };

  const handleOnClickCard = (item) => {
    setData(item);
    onClose();
  };

  const FormFilter = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      ref={contentEl}
      className="mt-0 grid grid-cols-1 gap-4 px-5 py-3 md:mt-8 md:grid-cols-3"
    >
      <MultiSelect
        input={{
          type: "multiSelect",
          name: "vehicle_category_id",
          placeholder: "انتخاب نوع بارگیر",
        }}
        list={VEHICLE_CATEGORIES}
        control={control}
      />

      {FilterInputs.map((input) => {
        return <TextInput key={input.name} control={control} input={input} />;
      })}

      <button
        className="mr-auto w-full rounded-md bg-primary-900 py-4 text-center text-base text-white md:w-3/4 md:py-0"
        type="submit"
      >
        اعمال فیلتر
      </button>
    </form>
  );
  return (
    <>
      <ModalBox onClose={onClose} show={show} maxWidth="max-w-7xl">
        <div className="flex items-center pb-3 ">
          <h3 className="flex-grow text-center font-bold ">انتخاب بارگیر</h3>
          <span className="cursor-pointer text-xl " onClick={onClose}>
            <SvgSPrite icon="close" className="hover:text-red-500" />
          </span>
        </div>

        {isTablet ? (
          <div
            className={`mb-3 rounded-lg border-2 border-solid border-stone-200`}
          >
            <button
              className={`flex w-full cursor-pointer items-center justify-center gap-3 rounded-t-lg bg-primary-extraLight px-5 py-4 transition-all  ${
                !showFilters && "rounded-b-lg duration-1000"
              }`}
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <h4 className=" m-0 text-lg font-medium md:text-inherit">
                فیلتر جستجو
              </h4>
              <div
                className={` ${
                  showFilters ? " -rotate-180" : ""
                } bg-transparent transition-all duration-500`}
              >
                <span className="m-auto flex">
                  <SvgSPrite icon="sliders" />
                </span>
              </div>
            </button>
            <div
              className={` ${
                showFilters ? " h-auto overflow-visible" : "h-0 overflow-hidden"
              }  relative  rounded-b-lg bg-white transition-all duration-500`}
              style={{ height: showFilters ? height : 0 }}
            >
              <div ref={contentEl} className="grid gap-2 ">
                {FormFilter}
              </div>
            </div>
          </div>
        ) : (
          FormFilter
        )}

        <hr />
        <div className="max-h-[60vh] overflow-auto">
          <div className="grid grid-cols-1 gap-5 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {state.items.map((item) => {
              return (
                <div
                  key={item.id}
                  className={` w-full cursor-pointer rounded-md border border-solid border-gray-300 transition-all hover:scale-105 hover:shadow-lg
                  ${data?.id === item.id && "bg-primary-900 text-white"}
                `}
                  onClick={() => handleOnClickCard(item)}
                >
                  <div className="grid gap-2">
                    <div className="px-1 py-4 text-center font-bold">
                      {item?.title}{" "}
                    </div>
                    <div className="flex border-t border-solid border-t-gray-300 px-1">
                      <div className="flex w-full flex-col py-3 text-center ">
                        <span>{item?.vehicle_category?.title}</span>
                        <span className="text-xs font-light">نوع</span>
                      </div>
                      <div className="flex w-full flex-col border-r border-solid  border-r-gray-300 py-3 text-center ">
                        <span>{numberWithCommas(item?.max_weight)}</span>
                        <span className="text-xs font-light">کیلوگرم</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {state.hasMore ? (
            isLoading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-3 ">
                <LoadingSpinner />
                <div className="text-base">درحال دریافت بیشتر...</div>
              </div>
            ) : (
              <div ref={ref} className="p-2" />
            )
          ) : null}
        </div>
      </ModalBox>
    </>
  );
};

export default memo(SelectVContainer);
