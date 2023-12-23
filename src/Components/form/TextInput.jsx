import { memo, useState } from "react";
import { useController } from "react-hook-form";

const TextInput = ({
  input,
  control,
  iconEnd,
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
    <div>
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
            ${labelClassName}`}
      >
        {!!error ? (
          <div
            className={`pointer-events-none absolute  left-3 top-1/2 flex h-6 w-6  -translate-y-1/2 transform 
              items-center justify-center rounded-full bg-red-500 text-white `}
          >
            !
          </div>
        ) : (
          iconEnd && iconEnd
        )}

        <input
          name={field.name}
          value={field.value || ""}
          ref={field.ref}
          onChange={field.onChange}
          id={input.name}
          type={input.type || "text"}
          placeholder={input?.placeholder || ""}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={input?.readOnly}
          className={`w-full ${inputClassName}`}
          onWheel={(e) => e.target.blur()}
        />
      </label>
      {!!error && (
        <div className="mt-1 text-start text-xs text-red-500">
          {error?.message}
        </div>
      )}
    </div>
  );
};

export default memo(TextInput);
