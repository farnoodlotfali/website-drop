import { PADDING_LAYOUT } from "@/Layouts/PanelLayout";
import { SvgSPrite } from "./SvgSPrite";
import { enToFaNumber } from "@/Utility/utils";

const FEATURES_ITEMS = [
  {
    icon: "centralized_network",
    title: "خدمات یکپارچه",
    text: "با حضور همزمان صاحبان بار، رانندگان و شرکت هاي حمل و اتصال به سازمان ها و بانک ها، دراپ شما را از هر ابزار دیگري در حمل و نقل جاده اي کالا بی نیاز می کند",
  },
  {
    icon: "internet",
    title: "اعلام بار اینترنتی",
    text: "صاحبان کالا، شرکت هاي حمل و متصدیان حمل بار در هرزمان و مکان میتوانند در دراپ بار خود را اعلام نمودو متناسب ترین شرایط را براي کالاي خود انتخاب کنند",
  },
  {
    icon: "shield_check",
    title: "تضمین امنیت کالا",
    text: "دراپ با ایجاد بستر ارائه بارنامه و بیمه کامل بار، همکاري با رانندگان حرفه اي، تامین سلامت ناوگان و ارائه خدمات پشتیبانی قوي، سلامت و امنیت محموله هاي ارسالی را تضمین میکند",
  },
  {
    icon: "ptz_camera",
    title: "رصد هر لحظه بار",
    text: "دراپ این امکان را فراهم نموده تا تمامی استفاده کنندگان بتوانند هر لحظه از وضعیت بار و اقدامات مربوط به آن آگاه باشند",
  },
  {
    icon: "two_tickets",
    title: "نوبت‌گیری اینترنتی",
    text: "امکان نوبت گیري اینترنتی براي رانندگان از حضور در صف هاي طولانی یا سردرگمی در پیدا کردن بار مناسب جلوگیري می کند",
  },
  {
    icon: "dollar_coin",
    title: "در دسترس و رایگان",
    text: "کلیه خدمات ارائه شده از سمت دراپ براي صاحبان کالا و رانندگان رایگان بوده و قابلیت استفاده در تمامی نقاط کشور را دارد",
  },
];

const Features = () => {
  return (
    <div className={`py-10 ${PADDING_LAYOUT}`}>
      <h3 className="py-12 text-center text-3xl font-bold text-primary-900 xs:text-3.2xl">
        ویــژگــی‌هــا
      </h3>

      <div className=" flex flex-wrap justify-center gap-5">
        {FEATURES_ITEMS.map((item, i) => {
          return (
            <div
              key={i}
              className="group flex w-full flex-col items-center justify-center gap-3 rounded-card-border-sm bg-white p-10 text-center transition-all hover:bg-primary-900 md:w-4/10 md:rounded-card-border-lg lg:w-3/10"
            >
              <div className="flex w-fit rounded-full bg-primary-light p-4 group-hover:bg-primary-dark">
                <SvgSPrite
                  icon={item.icon}
                  size="extraLarge"
                  className="fill-primary-900 group-hover:fill-white "
                />
              </div>
              <h4 className="font-bold group-hover:text-white">{item.title}</h4>
              <p className="text-[#666D85] group-hover:text-[#DCDFEB]">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
