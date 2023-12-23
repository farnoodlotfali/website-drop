import { Listbox, Transition } from "@headlessui/react";
import { Fragment, memo, useState } from "react";
import { SvgSPrite } from "../SvgSPrite";
import { useController } from "react-hook-form";

const SelectBox = ({ input, control, list }) => {
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(null);

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
  const onChange = (e) => {
    setSelected(e);
    field.onChange(e);
  };

  return (
    <>
      <Listbox
        name={field.name}
        value={selected}
        onChange={onChange}
        ref={field.ref}
        onBlur={onBlur}
      >
        {({ open }) => (
          <div className="relative">
            <Listbox.Button
              onFocus={onFocus}
              onBlur={onBlur}
              className={`flex h-full w-full cursor-pointer items-center justify-between rounded-[5px] border-2 border-solid bg-white p-4
          ${
            !!error
              ? "border-red-500"
              : open || focused
              ? "border-primary-900"
              : "border-primary-700"
          } 
          `}
            >
              <span className="block truncate font-bold">
                {field?.value?.title || (
                  <span>{input?.placeholder ?? "انتخاب"}</span>
                )}
              </span>
              <span className="pointer-events-none flex items-center pr-2">
                <SvgSPrite icon="chevron_down" size="extraSmall" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {list.map((item, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active, selected }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        selected || active
                          ? "bg-primary-200 text-primary-900"
                          : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => {
                      return (
                        <>
                          <span
                            className={`block truncate text-right text-base ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {item.title}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-900">
                              <SvgSPrite icon="done" size="small" />
                            </span>
                          ) : null}
                        </>
                      );
                    }}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
      {!!error && (
        <div className="mt-1 text-start text-xs text-red-500">
          {error?.message}
        </div>
      )}
    </>
  );
};

export default memo(SelectBox);
