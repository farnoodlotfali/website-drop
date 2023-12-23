import Image from "next/image";
import { SvgSPrite } from "@/Components/SvgSPrite";
import { BREAK_POINTS } from "../constants/Const";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import DownloadButton from "@/Components/DownloadButton";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useState } from "react";
import Features from "@/Components/Features";
import Head from "next/head";
import FAQList from "@/Components/FAQList";
import PanelLayout, { PADDING_LAYOUT } from "@/Layouts/PanelLayout";
import heroStyles from "@/styles/hero.module.css";
import { enToFaNumber, renderWeight } from "@/Utility/utils";
import { useLatestRequests } from "@/hooks/useLatestRequests";
import SimpleSpinner from "@/Components/SimpleSpinner";
import IranMapInfo from "@/Components/IranMapInfo";

const HERO_SLIDES = [
  {
    img: "/Assets/images/customerApp.png",
    titleFor: "صاحب بار",
    title: "اعلام کنی، بردیم",
    subtitle: "دراپ منتظره که بار رو اعلام کنی، نگران دیر رسیدن بار نباش",
    color: "primary",
    bgColor: "bg-primary-900",
    borderColor: "border-primary-dark",
    bgColorDark: "bg-primary-dark",
  },
  {
    img: "/Assets/images/driverApp.png",
    titleFor: "رانـنـده",
    subtitle: "دراپ بار رو برات پیدا میکنه، نگران خالی رفتن نباش",
    title: "بار از من",
    color: "secondary",
    borderColor: "border-secondary-dark",
    bgColor: "bg-secondary-700",
    bgColorDark: "bg-secondary-dark",
  },
  {
    img: "./drop_logo.svg",
    titleFor: "شرکت حمل",
    subtitle: "دراپ یک صف طولانی از بار داره، نگران تعداد بارنامه نباش",
    title: "بارنامه رو بزن، بار منتظره",
    color: "tertiary",
    borderColor: "border-tertiary-dark",
    bgColor: "bg-tertiary-800",
    bgColorDark: "bg-tertiary-dark",
  },
];

const Home = () => {
  return (
    <>
      <Head>
        <title> دراپ - صفحه اصلی</title>
      </Head>

      <div className="min-h-screen">
        <Banner />

        <AboutApp />

        <AppShowTable />

        <Features />

        <AppMobileScreens />

        <IranMapInfo />

        <FAQList />

        <CostEstimateSec />
      </div>
    </>
  );
};

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className={`relative `}>
      <Swiper
        slidesPerView={1}
        dir="rtl"
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        spaceBetween={0}
        modules={[Autoplay]}
        onSlideChange={(e) => setActiveSlide(e.realIndex)}
        onSwiper={(e) => setActiveSlide(e.realIndex)}
        className="h-[670px]  "
      >
        {HERO_SLIDES.map((item) => {
          return (
            <SwiperSlide key={item.title}>
              <div
                className={`relative grid grid-cols-12 items-center gap-4 ${item.bgColor} h-full pt-28 text-white ${PADDING_LAYOUT}`}
              >
                <div
                  className={`${item.bgColorDark} absolute right-[170px] top-[33px] w-fit rounded-md px-3 py-1 text-[9px] font-semibold md:right-[64px] md:top-[73px] md:text-base lg:right-[230px] lg:top-[28px] `}
                >
                  {item.titleFor}
                </div>
                <div className="col-span-12 flex flex-col gap-3 text-center md:col-span-6 md:text-start">
                  <h1 className=" font-extrabold leading-[1.25]">
                    {item.title}
                  </h1>
                  <h4 className="text-base md:text-2xl md:text-inherit">
                    {item.subtitle}
                  </h4>

                  <DownloadButton
                    label={`دانلود اپ ${item.titleFor}`}
                    className="mx-auto mt-2 w-fit py-3 md:mx-0 md:mt-5 "
                    color={item.color}
                  />
                </div>
                <div className="relative col-span-12 overflow-hidden md:col-span-6  md:h-full ">
                  <div className={heroStyles.hero_container}>
                    <div className={heroStyles.hero_circle}>
                      <Image
                        fill
                        priority
                        src={item.img}
                        title="Mobile App Screens"
                        alt="mobile app screens"
                        className="!h-auto px-5 pt-4"
                      />

                      <div
                        className={`${heroStyles.hero_rotate} ${item.borderColor}`}
                      >
                        {Array(4)
                          .fill(1)
                          .map((pl, index) => (
                            <div
                              key={index}
                              className={`${heroStyles.planet} ${item.bgColorDark} `}
                            ></div>
                          ))}
                      </div>
                      <div
                        className={`${heroStyles.hero_rotate_reverse} ${item.borderColor}`}
                      >
                        {Array(4)
                          .fill(1)
                          .map((pl, index) => (
                            <div
                              key={index}
                              className={`${heroStyles.planet} ${item.bgColorDark} `}
                            ></div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

const AboutApp = () => {
  const isTablet = useMediaQuery(`(max-width: ${BREAK_POINTS.md})`);
  return (
    <div
      className={`bg-white bg-pattern bg-cover bg-center bg-no-repeat py-10 ${PADDING_LAYOUT}`}
    >
      <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5 ">
        <h2 className="whitespace-nowrap text-3xl font-bold text-primary-900 xs:text-3.2xl">
          دربـاره دراپ
        </h2>

        <div className=" bg-primary-400 md:h-28 md:w-[2px] " />
        <p className="text-justify leading-8 md:leading-7">
          دراپ یک سامانه یکپارچه مدیریت حمل و نقل جادهاي کالا است که نقش یک
          واسطه و تسهیل کننده را در رابطه میان صاحبان کالا، رانندگان و شرکتهاي
          حمل ایفا میکند و در تلاش براي ارائه راهکارهاي نوآورانه جهت هر چه بهتر
          شکل دادن به این روابط است. دراپ در نظر دارد که حمل و نقل جادهاي کالا
          را بهینه نموده تا علاوه بر جلوگیري از اتلاف زمان، هزینه و انرژي از سمت
          صاحبان کالا، رانندگان و شرکتهاي حمل تأثیر متناسبی بر چرخه اقتصادي کشور
          داشته باشد. هدف اصلی دراپ توسعه راهکار یکپارچه در لجستیک و حمل و نقل
          جاده اي کالا بوده و از طریق رعایت منافع و ایجاد تعادل میان کنشگران
          مختلف این حوزه، در راستا گام برمیدارد.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 text-white md:grid-cols-2">
        <div className="rounded-card-border-sm bg-primary-900 bg-cardboard_box bg-auto bg-bottom bg-no-repeat p-6 md:rounded-card-border-lg md:bg-none">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-3">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              {!isTablet && <SvgSPrite icon="cardboard_box" size="large" />}
              <h4 className="font-bold">صــاحـب بــار</h4>
            </div>
            <div className="order-3 flex justify-center md:order-2 md:justify-end">
              <DownloadButton label={"دانلود اپ صاحب بار"} />
            </div>
            <div className="order-2 md:order-3 md:col-span-2">
              <div className=" text-justify font-light leading-8" role="p">
                تجار، بازرگانان ترخیص کاران ،کارخانجات واحدهای صنعتی و تولیدی
                معادن شرکتها، سازمانها و اشخاص میتوانند در سامانه حمل بار کلیه
                محموله های خود را به راحتی با بهترین قیمت و در کوتاه‌ترین زمان
                ممکن در سراسر کشور ارسال و دریافت کنند.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-card-border-sm bg-secondary-700 bg-steering_wheel bg-auto bg-bottom bg-no-repeat p-6 md:rounded-card-border-lg md:bg-none ">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-3">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              {!isTablet && <SvgSPrite icon="steering_wheel" size="large" />}
              <h4 className=" font-bold">رانــنــده</h4>
            </div>
            <div className="order-3 flex justify-center md:order-2 md:justify-end">
              <DownloadButton label={"دانلود اپ راننده"} color="secondary" />
            </div>
            <div className="order-2 md:order-3 md:col-span-2">
              <div className=" text-justify font-light leading-8" role="p">
                رانندگان کامیون تریلی و کلیه ماشینهای سنگین با استفاده از
                اپلیکیشن در هر زمان و هر مکان میتوانند از میان هزاران بار اعلام
                شده در سراسر ایران مسیر دلخواه و محموله مناسب با کامیون خود را
                انتخاب کنند.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-card-border-sm bg-tertiary-800 bg-company bg-auto bg-bottom bg-no-repeat p-6 md:col-span-2 md:rounded-card-border-lg md:bg-none ">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-3">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              {!isTablet && <SvgSPrite icon="company" size="large" />}
              <h4 className=" font-bold">شرکت حمل</h4>
            </div>
            <div className="order-3 flex justify-center md:order-2 md:justify-end">
              <DownloadButton label={"دانلود اپ شرکت حمل"} color="tertiary" />
            </div>
            <div className="order-2 md:order-3 md:col-span-2">
              <div className=" text-justify font-light leading-8" role="p">
                شرکت هاي حمل میتوانند از طریق دراپ برنامهریزي حمل کالا را بر
                اساس نیاز صاحب بار و رانندگان فعال در دراپ صورت دهند. دراپ
                امکانات ویژه اي در اختیار شرکت حمل قرار داده تا نقش واقعی این
                شرکت ها را در فرآیند حمل و نقل جاده اي تقویت کند.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TD_STYLE = "text-center pt-5 pb-2";
const TH_STYLE = "border-b border-b-white pb-3";
const AppShowTable = () => {
  const { data, isLoading, isFetching } = useLatestRequests();

  return (
    <div
      className={`relative bg-white bg-cars_roads bg-cover bg-fixed bg-bottom bg-no-repeat `}
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-primary-900 opacity-80" />
      <div className=" overflow-x-auto py-16">
        <div className=" relative z-10 mx-auto min-w-[650px]  max-w-6xl  px-5 text-white ">
          <h2 className="whitespace-nowrap text-center text-3xl font-bold  xs:text-3.2xl">
            آخرین بارهای اعلامی دراپ
          </h2>

          {isLoading || isFetching ? (
            <div className="flex h-96 w-full items-center justify-center pt-5">
              <SimpleSpinner />
            </div>
          ) : (
            <table className="col-span-8 col-start-3 mt-16 w-full ">
              <thead>
                <tr>
                  {["مبدأ", "مقصد", "تاریخ", "نوع خودرو", "وزن"].map((item) => {
                    return (
                      <th className={TH_STYLE} key={item}>
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data?.items.data?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className={`${TD_STYLE}`}>{item.source_city}</td>
                      <td className={`${TD_STYLE}`}>{item.destination_city}</td>
                      <td className={`${TD_STYLE}`}>
                        {new Date(item.load_time)
                          .toLocaleDateString("fa-IR")
                          .split("/")
                          .slice(1)
                          .join("/")}
                      </td>
                      <td className={`${TD_STYLE}`}>
                        {enToFaNumber(item?.vehicle_type?.title) ?? "-"}
                      </td>
                      <td className={`${TD_STYLE}`}>
                        {renderWeight(item?.weight) ?? "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const AppMobileScreens = () => {
  return (
    <div className={`bg-white py-10 ${PADDING_LAYOUT}`}>
      <h3 className="mb-10 text-center  text-3xl font-bold text-primary-900 xs:text-3.2xl">
        بـخـش‌هـای اپـلـیـکـیـشـن
      </h3>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <div
            className=" relative h-full overflow-hidden rounded-card-border-sm bg-primary-900 px-6
      pt-6 text-white before:absolute before:bottom-[-110px] before:right-[-110px] before:h-[200px] before:w-[200px] before:rounded-full 
      before:border-[40px] before:border-solid before:border-primary-800 md:rounded-card-border-lg md:before:bottom-[-170px] md:before:right-[-125px] md:before:h-[300px] md:before:w-[300px]
       md:before:border-[60px] "
          >
            <div className="relative z-10 flex h-full gap-4 md:block">
              <div className="float-right inline-block flex-col gap-4 md:flex">
                <h5 className=" flex flex-col whitespace-nowrap font-bold xs:text-2xl md:text-start md:text-4xl">
                  <span> ثبت آگهی </span>
                  <span> راحت و سریع! </span>
                </h5>
                <div className="mb-3 mr-auto mt-1 h-fit w-fit self-center rounded bg-primary-dark px-2 py-1 text-[9px] md:mb-0 md:mr-0 md:mt-0 md:self-end md:text-base">
                  صاحب بار
                </div>
              </div>
              <div className="relative float-left mr-auto mt-auto">
                <Image
                  src="/Assets/images/Ad.png"
                  width={250}
                  height={400}
                  alt="Ad"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div
            className=" before:border-27343c0d relative h-full overflow-hidden rounded-card-border-sm bg-gray-50
      px-6 before:absolute before:bottom-0 before:left-[-118px] before:right-auto
      before:top-[-124px] before:h-[200px] before:w-[200px] before:rounded-full before:border-[40px] before:border-solid md:rounded-card-border-lg
      md:before:bottom-0 md:before:left-0 md:before:right-[-162px] md:before:top-0 md:before:h-full md:before:w-[300px]
      md:before:border-[60px] "
          >
            <div className="relative z-10 mr-auto flex h-full w-full flex-col items-center justify-between gap-4 md:w-4/5 md:flex-row ">
              <h5 className="float-none flex flex-wrap justify-center whitespace-nowrap pt-5 text-center text-lg font-bold xs:w-full md:float-right md:w-48 md:pt-3 md:text-start md:text-4xl">
                <span> هـرلـحـظه از </span>
                <span> وضعیت بـار </span>
                <span> بـاخـبـر باش </span>
              </h5>
              <div className="relative float-none h-full md:float-left">
                <Image
                  src="/Assets/images/loan.png"
                  width={400}
                  height={100}
                  className="h-full"
                  alt="loan"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-12 gap-5">
        <div className="order-2 col-span-12 lg:order-1 lg:col-span-7">
          <div
            className=" before:border-27343c0d relative h-full overflow-hidden rounded-card-border-sm bg-gray-50
      px-6 before:absolute before:bottom-auto before:left-[50%] before:top-[50%]
      before:h-full before:w-[230px] before:-translate-x-1/2 before:rounded-full before:border-[60px]
      before:border-solid md:rounded-card-border-lg md:before:bottom-0 md:before:left-[-162px]
      md:before:top-0 md:before:w-[300px] md:before:-translate-x-0"
          >
            <div className="relative z-10 ml-auto flex h-full w-full flex-col-reverse items-center justify-between gap-4 md:w-4/5 md:flex-row ">
              <div className="relative float-none h-full md:float-left">
                <Image
                  src="/Assets/images/screen2.png"
                  width={400}
                  height={100}
                  className="h-full"
                  alt="screen2"
                />
              </div>
              <h5 className="float-none flex flex-wrap justify-center gap-1 whitespace-nowrap pt-3 text-center text-lg font-bold xs:w-full md:float-right md:w-48 md:text-start md:text-4xl">
                <span> دیگه نگران </span>
                <span> پـیـداشـدن </span>
                <span> بـــار نـبـاش </span>
              </h5>
            </div>
          </div>
        </div>
        <div className="order-1 col-span-12 lg:order-2 lg:col-span-5">
          <div
            className=" relative h-full overflow-hidden rounded-card-border-sm bg-secondary-700 px-6
      pt-6 text-white before:absolute before:right-[-100px] before:top-[-125px] before:h-[200px] before:w-[200px] before:rounded-full 
      before:border-[40px] before:border-solid before:border-secondary-800 md:rounded-card-border-lg md:before:right-[-125px] md:before:top-[-170px] md:before:h-[300px] md:before:w-[300px]
       md:before:border-[60px] "
          >
            <div className="flw relative z-10 flex justify-between gap-7 md:gap-3">
              <div className="float-right mt-auto inline-block flex-col justify-end gap-4 pb-2 md:mt-0 md:flex md:pb-5">
                <div className="mb-3 mr-auto h-fit w-fit self-center rounded bg-secondary-dark px-2 py-1 text-[9px] md:mb-0 md:mr-0 md:self-end md:text-base">
                  رانـنـده
                </div>
                <h5 className="flex flex-col font-bold xs:text-2xl md:text-start md:text-4xl">
                  <span className="whitespace-nowrap"> اطلاعات کامل </span>
                  <span className="whitespace-nowrap"> و بـدون نقـص </span>
                </h5>
              </div>
              <div className="relative float-left mt-auto">
                <Image
                  src="/Assets/images/screen3.png"
                  width={250}
                  height={400}
                  alt="screen3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CostEstimateSec = () => {
  return (
    <div
      className={`
          relative flex items-center overflow-hidden bg-primary-900 py-16 text-white
          before:absolute before:left-[-100px] before:top-[-100px] before:h-[200px] before:w-[200px] before:rounded-full before:border-[40px] before:border-solid before:border-primary-800 before:content-none after:absolute 
          after:bottom-[-175px] after:right-[-70px] after:h-[300px] after:w-[300px] after:rounded-full 
          after:border-[60px] after:border-solid after:border-primary-800 md:before:content-['""'] md:after:bottom-[-125px] 
          md:after:right-[-100px] md:after:h-[200px] md:after:w-[200px] md:after:border-[40px]
          ${PADDING_LAYOUT}
      `}
    >
      <div className="relative z-10 flex w-full flex-col items-center justify-between gap-5  md:flex-row md:text-start">
        <div className="">
          <h4 className="mb-2 gap-2  text-center text-3xl font-bold leading-[3rem] md:text-start md:text-3xl">
            هــنــوز بــرای اسـتـفــاده از دراپ تردید دارید؟
          </h4>
          <h6 className="text-center text-xl font-light">
            شما می‌تـوانید با مشخص کردن مبدا و مقصد و وزن بار خود تخمین هزینه
            دراپ را در لحظه مشاهده کنید.
          </h6>
        </div>

        <Link prefetch={false} href="/cost-estimate">
          <div
            role="button"
            className="h-fit w-40 whitespace-nowrap rounded bg-primary-dark p-3 text-center"
          >
            تخمین هزینه بار
          </div>
        </Link>
      </div>
    </div>
  );
};

Home.PageLayout = PanelLayout;
export default Home;
