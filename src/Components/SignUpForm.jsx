import { SvgSPrite } from "@/Components/SvgSPrite";
import { FormContainer, FormInputs } from "@/Components/form/Form";
import { enToFaNumber, renderSelectOptions } from "@/Utility/utils";
import { simpleAxiosApi } from "@/api/axiosApi";
import { GENDER, SIGN_UP_TYPES } from "@/constants/Const";
import useCountDown from "@/hooks/useCountDown";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SignUpForm = ({ type }) => {
  const [mobileNumber, setMobileNumber] = useState(null);
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = useForm();

  // save mutation
  const saveNewMutation = useMutation([type], (data) =>
    simpleAxiosApi({
      url: `/${type}`,
      method: "post",
      data: data,
    })
  );

  const onSubmit = async (data) => {
    data = {
      mobile: mobileNumber?.mobile,
      company: {
        name: data?.name,
        economic_code: data?.economic_code,
        type: data?.type?.id,
        email: data?.email,
        registration_code: data?.registration_code,
        registration_date: data?.registration_date?.registration_date,
        national_code: data?.national_code,
      },
      ceo: {
        first_name: data?.first_name,
        last_name: data?.last_name,
        father_name: data?.father_name,
        national_code: data?.ceo_national_code,
        gender: data?.gender?.id,
        email: data?.ceo_email,
        birth_date: data?.birth_date?.birth_date,
      },
    };
    try {
      const res = await saveNewMutation.mutateAsync(data);
      toast.success("با موفقیت ثبت نام شد");
      return res;
    } catch (error) {
      return error;
    }
  };

  // inputs
  const Inputs = [
    {
      type: "text",
      name: "name",
      placeholder: "نام شرکت",
      control: control,
      rules: {
        required: "نام شرکت را وارد کنید",
      },
    },
    {
      type: "number",
      name: "registration_code",
      placeholder: "کد ثبت شرکت",
      control: control,
      rules: {
        required: "کد ثبت شرکت را وارد کنید",
      },
    },
    {
      type: "number",
      name: "national_code",
      placeholder: "شناسه ملی",
      control: control,
      rules: {
        required: "شناسه ملی را وارد کنید",
        maxLength: {
          value: 11,
          message: "شناسه ملی باید ۱۱ رقمی باشد",
        },
        minLength: {
          value: 11,
          message: "شناسه ملی باید ۱۱ رقمی باشد",
        },
      },
    },
    {
      type: "date",
      name: "registration_date",
      placeholder: "تاریخ ثبت شرکت",
      control: control,
      rules: {
        required: "تاریخ ثبت شرکت را وارد کنید",
      },
    },
    {
      type: "number",
      name: "economic_code",
      placeholder: "کد اقتصادی",
      control: control,
      rules: {
        required: "کد اقتصادی را وارد کنید",
      },
    },
    {
      type: "select",
      name: "type",
      placeholder: "نوع شرکت",
      control: control,
      options: renderSelectOptions({
        private_stock: "سهامی خاص",
        public_stock: "سهامی عام",
        cooperative: "تعاونی",
        general_partnership: "تضامنی",
        limited_liability: "مسئولیت محدود",
        joint_stock_partnership: "مختلط سهامی",
        limited_partnership: "مختلط غیر سهامی",
        private: "خصوصی",
        voluntary: "اختیاری",
        involuntary: "قهری",
        participatory: "مشارکتی",
      }),
      valueKey: "id",
      labelKey: "title",
      rules: {
        required: "نوع شرکت را وارد کنید",
      },
    },
    {
      type: "email",
      name: "email",
      placeholder: "ایمیل",
      control: control,
    },
  ];

  const MangerInputs = [
    {
      type: "text",
      name: "first_name",
      placeholder: "نام",
      control: control,
      rules: {
        required: "نام را وارد کنید",
      },
    },
    {
      type: "text",
      name: "last_name",
      placeholder: "نام خانوادگی",
      control: control,
      rules: {
        required: "نام خانوادگی را وارد کنید",
      },
    },
    {
      type: "number",
      name: "ceo_national_code",
      placeholder: "کد ملی",
      control: control,
      rules: {
        required: "کد ملی را وارد کنید",
        maxLength: {
          value: 10,
          message: "شناسه ملی باید ۱۰ رقمی باشد",
        },
        minLength: {
          value: 10,
          message: "شناسه ملی باید ۱۰ رقمی باشد",
        },
      },
    },
    {
      type: "email",
      name: "ceo_email",
      placeholder: "ایمیل",
      control: control,
      rules: {
        required: "ایمیل را وارد کنید",
      },
    },
    {
      type: "text",
      name: "father_name",
      placeholder: "نام پدر",
      control: control,
      rules: {
        required: "نام پدر را وارد کنید",
      },
    },
    {
      type: "select",
      name: "gender",
      placeholder: "جنسیت",
      control: control,
      options: GENDER,
      labelKey: "name",
      valueKey: "value",
      rules: {
        required: "جنسیت را وارد کنید",
      },
    },
    {
      type: "date",
      name: "birth_date",
      placeholder: "تاریخ تولد",
      control: control,
      rules: {
        required: "تاریخ تولد را وارد کنید",
      },
    },
  ];

  // handle on change inputs
  const handleChange = (name, value) => {
    setValue(name, value);
  };

  return (
    <>
      <Head>
        <title> دراپ - ثبت‌نام {SIGN_UP_TYPES[type]} </title>
      </Head>
      <div className="z-10 mx-3 my-6 grid w-full max-w-6xl rounded-card-border-sm bg-white p-5 pt-12 md:p-10 md:pt-14 ">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FormContainer data={watch()} setData={handleChange} errors={errors}>
            <TitleInputs label={`ثبت‌نام ${SIGN_UP_TYPES[type]}`} />
            <FormInputs
              inputs={Inputs}
              gridProps={"md:col-span-4"}
              className={"my-8"}
            />

            <TitleInputs label="اطلاعات مدیرعامل" />
            <FormInputs
              inputs={MangerInputs}
              gridProps={"md:col-span-4"}
              className={"my-8"}
            />
          </FormContainer>

          <UserAuthMobile setMobileNumber={setMobileNumber} />

          <div className="flex justify-end">
            <button
              type="submit"
              className={`flex h-[60px] w-full items-center justify-center rounded-[5px] font-bold  text-white md:w-72 ${
                !mobileNumber ? "bg-gray-300" : "bg-primary-900"
              } `}
              // disabled={!mobileNumber}
            >
              ثبت‌نام
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const UserAuthMobile = ({ setMobileNumber }) => {
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(0);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    clearErrors,
    setError,
  } = useForm();

  const { fromMinute, finishAlert, onClickReset } = useCountDown(time);

  // send code to mobile mutation
  const sendOTPMutation = useMutation(["verify-otp"], (data) =>
    simpleAxiosApi({
      url: "/company/send-otp",
      method: "post",
      data: data,
    })
  );

  // verify code mutation
  const verifyOTPMutation = useMutation(["verify"], (data) =>
    simpleAxiosApi({
      url: "/company/verify",
      method: "post",
      data: data,
    })
  );

  const handleSendOTP = async (data) => {
    try {
      const res = await sendOTPMutation.mutateAsync(data);
      handleNextStep();
      return res;
    } catch (error) {
      return error;
    }
  };
  const handleVerifyOTP = async (data) => {
    try {
      const res = await verifyOTPMutation.mutateAsync(data);
      handleNextStep();
      setMobileNumber(data);
      return res;
    } catch (error) {
      setError(
        "code",
        {
          type: "manual",
          message: "کد وارد شده صحیح نیست! دوباره تلاش کنید.",
        },
        {
          shouldFocus: true,
        }
      );
      return error;
    }
  };

  const onSubmit = async (data) => {
    switch (step) {
      case 0:
        return await handleSendOTP(data);
      case 1:
        return await handleVerifyOTP(data);

      default:
        break;
    }
  };

  // handle on change inputs
  const handleChange = (name, value) => {
    setValue(name, value);
  };

  const MobileInputs = [
    {
      type: "number",
      name: "mobile",
      placeholder: "شماره تلفن رابط",
      control: control,
      rules: {
        required: "شماره تلفن رابط را وارد کنید",
        maxLength: {
          value: 11,
          message: "شماره موبایل باید ۱۱ رقمی باشد",
        },
        minLength: {
          value: 11,
          message: "شماره موبایل باید ۱۱ رقمی باشد",
        },
      },
      inputClassName: "text-center",
    },
  ];
  const CodeInputs = [
    {
      type: "number",
      name: "code",
      placeholder: "کد فعالسازی",
      control: control,
      rules: {
        required: "کد فعالسازی را وارد کنید",
      },
      inputClassName: "text-center",
    },
  ];

  // handle onSubmit in nested forms
  const handleExternalSubmit = () => {
    handleSubmit(onSubmit)();
  };

  // resend code again
  const handleResend = () => {
    setStep(0);
    clearErrors();
    handleSubmit(onSubmit)();
    onClickReset();
  };

  // change mobile number
  const handleBackToChange = () => {
    setTime(0);
    setStep((prev) => prev - 1);
  };

  // handling next step
  const handleNextStep = () => {
    setStep((prev) => {
      let num = prev + 1;

      if (num === 1) {
        setTime(120);
      }
      return num;
    });
  };

  return (
    <div className="border-y-[0.5px] border-y-primary-600">
      <div className="grid gap-4">
        <FormContainer data={watch()} setData={handleChange} errors={errors}>
          {verifyOTPMutation.isSuccess ? (
            <div className="flex items-center gap-2">
              <SvgSPrite className="mb-1 text-black" icon="done" size="small" />
              <div className="my-10 font-semibold">
                شماره تلفن <strong>{enToFaNumber(watch("mobile"))}</strong> به
                عنوان رابط در سیستم، با موفقیت ثبت شد!
              </div>
            </div>
          ) : (
            <FormInputs
              inputs={step === 0 ? MobileInputs : CodeInputs}
              gridProps={"md:col-span-4 xs:col-span-10 col-span-12"}
              className={"my-8"}
            >
              <button
                type="button"
                onClick={handleExternalSubmit}
                className={`col-span-12 flex max-h-[60px] w-full max-w-full items-center justify-center justify-self-center rounded-lg xs:col-span-2 xs:max-w-[60px] md:col-span-1 ${
                  (watch("code")?.length === 4 || step === 0) && !isSubmitting
                    ? "bg-primary-900"
                    : "bg-gray-300"
                } `}
                disabled={
                  !(
                    (watch("code")?.length === 4 || step === 0) &&
                    !isSubmitting
                  )
                }
              >
                <SvgSPrite className="text-white" icon="done" size="large" />
              </button>
              {step === 1 && (
                <>
                  {finishAlert ? (
                    <button
                      type="button"
                      className={`col-span-12 flex min-h-[60px] items-center justify-center rounded-[5px] bg-primary-900 font-bold text-white xs:col-span-6 md:col-span-2`}
                      onClick={handleResend}
                    >
                      درخواست مجدد
                    </button>
                  ) : (
                    <div className="col-span-12 flex max-h-[60px] items-center justify-center gap-1 rounded-[5px] bg-gray-200 text-gray-600 xs:col-span-6 md:col-span-3">
                      <strong> {`${enToFaNumber(fromMinute)} `}</strong> تا
                      درخواست مجدد
                    </div>
                  )}

                  <button
                    type="button"
                    className={`col-span-12 flex max-h-[60px] items-center justify-center rounded-[5px] bg-primary-900 font-bold text-white xs:col-span-6 md:col-span-2`}
                    onClick={handleBackToChange}
                  >
                    تغییر شماره موبایل
                  </button>
                </>
              )}
            </FormInputs>
          )}
        </FormContainer>
      </div>
    </div>
  );
};

const TitleInputs = ({ label = "" }) => {
  return (
    <div className="relative  w-full ">
      <div className="h-[0.5px] w-full bg-primary-600" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xl font-bold">
        {label}
      </span>
    </div>
  );
};

export default SignUpForm;
