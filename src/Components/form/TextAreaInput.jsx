import { memo, useState } from "react";
import { useController } from "react-hook-form";

const TextAreaInput = ({
  input,
  control,
  inputClassName = "",
  labelClassName = "",
}) => {
  const [focused, setFocused] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    name: input.name,
    control: control,
    rules: input?.rules ?? {},
  });

  const onFocus = () => setFocused(true);
  const onBlur = () => {
    field.onBlur();
    setFocused(false);
  };

  return (
    <div className=" flex h-full flex-col">
      <label
        htmlFor={input.name}
        className={` relative block  flex-1
            rounded-[5px] border-2  p-4 
            ${
              !!error
                ? "border-red-500"
                : focused
                ? "border-primary-900"
                : "border-primary-light"
            }   
            ${labelClassName || ""}`}
      >
        {!!error && (
          <div
            className={`h-6s pointer-events-none  absolute left-3 top-1/2 flex w-6  -translate-y-1/2 transform 
              items-center justify-center rounded-full bg-red-500 text-white `}
          >
            !
          </div>
        )}
        <textarea
          name={field.name}
          value={field.value}
          ref={field.ref}
          onChange={field.onChange}
          id={input.name}
          type={input.type || "text"}
          placeholder={input?.placeholder || ""}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={input?.readOnly}
          onWheel={(e) => e.target.blur()}
          className={`h-full w-full  ${inputClassName || ""} `}
        />
      </label>
      <div className="mt-1 text-start text-xs text-red-500">
        {error?.message}
      </div>
    </div>
  );
};

export default memo(TextAreaInput);
