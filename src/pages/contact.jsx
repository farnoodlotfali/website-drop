import TextAreaInput from "@/Components/form/TextAreaInput";
import TextInput from "@/Components/form/TextInput";
import PanelLayout, { PADDING_LAYOUT } from "@/Layouts/PanelLayout";
import { enToFaNumber } from "@/Utility/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { BREAK_POINTS, defaultCenter } from "../constants/Const";

const Map = dynamic(() => import("@/Components/Map"), {
  ssr: false,
});

const Contact = () => {
  const isTablet = useMediaQuery(`(max-width: ${BREAK_POINTS.md})`);
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
    control,
    register,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  // inputs
  const DataInputs = [
    {
      type: "text",
      name: "name",
      placeholder: "نام و نام خانوادگی",
      rules: {
        required: "نام و نام خانوادگی را وارد کنید",
      },
    },
    {
      type: "number",
      name: "phone",
      placeholder: "شماره تماس",
      rules: {
        required: "شماره تماس را وارد کنید",
      },
    },
    {
      type: "email",
      name: "email",
      placeholder: "ایمیل",
      rules: {
        required: "ایمیل را وارد کنید",
      },
    },
  ];

  // inputs
  const DataInputs1 = [
    {
      type: "textarea",
      name: "msg",
      placeholder: "پیام شما",

      rules: {
        required: "پیام را وارد کنید",
      },
    },
  ];

  return (
    <>
      <Head>
        <title> دراپ - تماس با ما</title>
      </Head>

      <div className={`bg-white py-20 ${PADDING_LAYOUT}`}>
        <h3 className="mb-3 mt-16 text-center text-3.2xl font-bold text-primary-900">
          تـمـاس بـامـا
        </h3>
        <h5 className="mb-14 text-center md:text-2xl">
          برای پیگیری یا سوال درباره سفارش از فرم زیر استفاده کنید
        </h5>

        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2 md:col-span-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 grid gap-5 md:col-span-1">
                  {DataInputs.map((input) => {
                    return (
                      <TextInput
                        key={input.name}
                        control={control}
                        input={input}
                      />
                    );
                  })}
                </div>
                <div className="col-span-2 grid gap-5 md:col-span-1">
                  {DataInputs1.map((input) => {
                    return (
                      <TextAreaInput
                        key={input.name}
                        control={control}
                        input={input}
                        inputClassName="min-h-[100px]"
                      />
                    );
                  })}
                </div>
              </div>

              <button
                className="mt-5 w-full rounded bg-primary-900 py-3 text-white"
                type="submit"
              >
                ارسال پیام
              </button>
            </form>
          </div>
          <div className="col-span-2 flex flex-col md:col-span-1">
            {isTablet && (
              <div className="my-8 text-center text-3.2xl font-bold text-primary-900">
                دفـتـر مـرکـزی
              </div>
            )}

            <div className="flex flex-wrap justify-between">
              <h3 className="float-right w-full text-base md:w-fit ">
                خیابان دکتر فاطمی، خیابان باباطاهر، کوچه کیوان، پلاک{" "}
                {enToFaNumber("19")}
              </h3>
              <a
                href={"tel:+02188978284"}
                className={`float-left w-full text-left ${"md:w-fit"}`}
              >
                {enToFaNumber("021-88978284")}
              </a>
            </div>
            <div className="mt-2 h-full min-h-[150px]">
              <Map zoom={13} center={defaultCenter}></Map>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Contact.PageLayout = PanelLayout;
export default Contact;
