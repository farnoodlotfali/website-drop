import { useState } from "react";
import { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import ModalBox from "@/Components/ModalBox";
import { useController } from "react-hook-form";
import moment from "jalali-moment";
import { enToFaNumber } from "@/Utility/utils";

const SelectDate = ({ input }) => {
  const [focused, setFocused] = useState(false);

  const [open, setOpen] = useState(false);
  const [dataKey, setDataKey] = useState({});
  const handleOnClose = () => setOpen(false);

  const {
    field,
    fieldState: { error },
    formState: {},
  } = useController({
    name: input.name,
    control: input.control,
    rules: input.rules ?? {},
  });
  const [selected, setSelected] = useState(field.value ?? {});

  const handleOnClicked = () => {
    setOpen(true);
    setDataKey(input.name);
  };

  const onFocus = () => setFocused(true);
  const onBlur = () => {
    field.onBlur();
    setFocused(false);
  };

  const handleDateChange = (value) => {
    const selectedDay = value.year + "-" + value.month + "-" + value.day;
    const result = moment
      .from(selectedDay, "fa", "YYYY-MM-DD")
      .format("YYYY-MM-DD");
    setSelected(() => ({
      [dataKey]: result.replaceAll("-", "/"),
      [`${dataKey}_fa`]: selectedDay.replaceAll("-", "/"),
      [`${dataKey}_text`]: enToFaNumber(selectedDay),
    }));
  };

  const confirmData = () => {
    field.onChange(selected);
    handleOnClose();
  };

  const handleValue = () => {
    let result = null;
    if (selected[`${dataKey}_fa`]) {
      const value = selected[`${dataKey}_fa`];
      const dataArray = value.split("/");
      result = {
        year: Number(dataArray[0]),
        month: Number(dataArray[1]),
        day: Number(dataArray[2]),
      };
    }

    return result;
  };

  return (
    <>
      <div className="" onClick={handleOnClicked}>
        <label
          htmlFor={input.name}
          className={`relative block rounded-[5px] border-2 p-4
             text-base placeholder-slate-700
            ${
              !!error
                ? "border-red-500"
                : focused
                ? "border-primary-900"
                : "border-primary-700"
            } 
            ${input?.labelClassName}`}
        >
          {!!error ? (
            <div
              className={`pointer-events-none absolute  left-3 top-1/2 flex h-6 w-6  -translate-y-1/2 transform 
              items-center justify-center rounded-full bg-red-500 text-white `}
            >
              !
            </div>
          ) : (
            input?.iconEnd && input?.iconEnd
          )}

          <input
            name={field.name}
            value={field.value?.[`${input.name}_text`] || ""}
            ref={field.ref}
            onChange={field.onChange}
            id={input.name}
            type={"text"}
            placeholder={input?.placeholder || ""}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={input?.readOnly}
            className={`w-full ${input?.inputClassName}`}
            onWheel={(e) => e.target.blur()}
          />
        </label>
        {!!error && (
          <div className="mt-1 text-start text-xs text-red-500">
            {error?.message}
          </div>
        )}
      </div>

      <ModalBox show={open} onClose={handleOnClose} needBack={false}>
        <Calendar
          locale="fa"
          value={handleValue()}
          onChange={handleDateChange}
          shouldHighlightWeekends
          renderFooter={() => (
            <button
              onClick={confirmData}
              className="h-[50px] w-full hover:bg-primary-extraLight transition-all text-base text-primary-900 "
            >
              تایید
            </button>
          )}
        />
      </ModalBox>
    </>
  );
};

export default SelectDate;
