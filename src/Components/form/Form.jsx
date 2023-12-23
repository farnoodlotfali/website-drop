import {
  useState,
  createContext,
  useContext,
  memo,
  useEffect,
  useMemo,
} from "react";
import TextInput from "./TextInput";
import SelectBox from "./SelectBox";
import SelectDate from "./SelectDate";

const FormContext = createContext({});

const FormContainer = ({ children, data, setData, errors }) => {
  const [selectDateKey, setSelectDateKey] = useState();

  return (
    <FormContext.Provider
      value={{
        selectDateKey,
        setSelectDateKey,
        errors,
        data,
        setData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

const FormInputs = ({ children, inputs, gridProps, className }) => {
  const { errors } = useContext(FormContext);

  return (
    <>
      <div className={`grid grid-cols-12 gap-4 ${className}`}>
        {inputs.map((input, i) => (
          <RenderInputs
            key={input?.name + " " + i}
            input={input}
            gridProps={gridProps}
            errors={errors}
          />
        ))}
        {children}
      </div>
    </>
  );
};

export { FormContainer, FormInputs };

const RenderInputs = ({ input, gridProps, errors }) => {
  if (input) {
    return (
      <div
        className={`col-span-12 md:col-span-3 ${gridProps} ${input.gridProps}  `}
      >
        {input.type === "custom" ? (
          input.customView
        ) : (
          <HandleInputType input={input} />
        )}
      </div>
    );
  }
};

const HandleInputType = ({ input }) => {
  switch (input.type) {
    case "text":
    case "email":
    case "password":
      return <RenderInput input={input} />;
    case "number":
      return <RenderNumberInput input={input} />;
    // case "textarea":
    //   return <RenderTextArea input={input} />;
    case "select":
      return <RenderSelect input={input} />;
    case "date":
      return <RenderDate input={input} />;

    // case "multiselect":
    //   return <RenderMultiSelect input={input} />;

    default:
      return <></>;
  }
};

const RenderInput = ({ input }) => {
  return (
    <TextInput
      key={input.name}
      control={input.control}
      input={input}
      iconEnd={input.iconEnd}
      labelClassName={input.labelClassName}
      inputClassName={input.inputClassName}
    />
  );
};

const RenderNumberInput = ({ input }) => {
  return (
    <TextInput
      key={input.name}
      control={input.control}
      input={input}
      iconEnd={input.iconEnd}
      labelClassName={input.labelClassName}
      inputClassName={input.inputClassName}
    />
  );
};

const RenderSelect = ({ input }) => {
  function convertArray(arr) {
    return arr.map((item) => {
      return { title: item[input?.labelKey], id: item[input?.valueKey] };
    });
  }

  return (
    <SelectBox
      control={input.control}
      input={input}
      {...input}
      list={convertArray(input.options) ?? []}
    />
  );
};

const RenderDate = ({ input }) => {
  //   const [showSelectDate, setShowSelectDate] = useState(false);

  //   const [keys, setKeys] = useState({});
  //   const {
  //     field,
  //     fieldState: { error },
  //     formState: {},
  //   } = useController({
  //     name: input.name,
  //     control: input.control,
  //     rules: input.rules ?? {},
  //   });

  //   const handleOnClicked = () => {
  //     setShowSelectDate(true);
  //     setKeys(input.name);
  //   };

  return <SelectDate input={input} />;
};
