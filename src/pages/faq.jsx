import FAQList from "@/Components/FAQList";
import TextAreaInput from "@/Components/form/TextAreaInput";
import TextInput from "@/Components/form/TextInput";
import PanelLayout from "@/Layouts/PanelLayout";
import Head from "next/head";
import { useForm } from "react-hook-form";

const FAQ = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    register,
  } = useForm();

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

  // handle on submit
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title> دراپ - ســوالات مـتـداول </title>
      </Head>

      <div className="bg-white pb-10 pt-28">
        <FAQList />
      </div>

      <div
        className="relative overflow-hidden p-10 text-center
            before:absolute before:left-[-80px] before:top-[-90px] before:h-[200px] before:w-[200px] before:rounded-full before:border-[40px] before:border-solid
            after:absolute after:bottom-[-90px] after:right-[-70px] after:h-[200px] after:w-[200px] after:rounded-full after:border-[40px] after:border-solid
        "
      >
        <div className="relative z-10 mx-auto max-w-3xl py-8 ">
          <h3 className=" to-inherit font-bold text-primary-900 md:text-3.2xl">
            پاسخی برای سوال خود نیافتید؟
          </h3>
          <h5 className=" mb-8 mt-4 text-inherit md:text-2xl">
            شما می‌توانید سوال خود را از کارشناسان ما بپرسید. ما در سریعترین
            زمان ممکن با شما تماس می‌گیریم.
          </h5>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 grid gap-5 md:col-span-1">
                {DataInputs.map((input) => {
                  return (
                    <TextInput
                      key={input.name}
                      control={control}
                      input={input}
                      labelClassName="bg-white"
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
                      labelClassName="bg-white"
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
      </div>
    </>
  );
};

FAQ.PageLayout = PanelLayout;
export default FAQ;
