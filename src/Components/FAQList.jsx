import { useMemo, useRef, useState } from "react";
import { SvgSPrite } from "./SvgSPrite";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { BREAK_POINTS } from "../constants/Const";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PADDING_LAYOUT } from "@/Layouts/PanelLayout";

const FAQList = () => {
  const [active, setActive] = useState(null);
  const isTablet = useMediaQuery(`(max-width: ${BREAK_POINTS.md})`);
  const handleToggle = (val) => {
    if (active === val) {
      setActive(null);
    } else {
      setActive(val);
    }
  };

  return (
    <div className={`py-10 ${PADDING_LAYOUT}`}>
      <h3 className="mb-12 text-center text-3xl font-bold text-primary-900 xs:text-3.2xl">
        ســوالات مـتـداول
      </h3>

      <div className="grid grid-cols-6 gap-5">
        <div className="col-span-6 flex flex-col gap-5 md:col-span-5">
          {FAQ_ITEMS.map((item, i) => {
            return (
              <AccordionItem
                key={i}
                active={active}
                handleToggle={handleToggle}
                answer={item.answer}
                question={item.question}
              />
            );
          })}
        </div>
        {!isTablet && (
          <div className="col-span-1 ">
            <div className="h-full rounded-lg bg-secondary-900"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const AccordionItem = ({ active, question, answer, handleToggle }) => {
  const contentEl = useRef(null);

  const { windowWidth } = useWindowWidth(1024);

  const height = useMemo(
    () => contentEl?.current?.scrollHeight,
    [contentEl?.current?.scrollHeight, windowWidth]
  );

  const isOpen = useMemo(() => active === question, [active]);
  return (
    <div className={`rounded-lg border-2 border-solid border-stone-200`}>
      <button
        className={`group  flex w-full cursor-pointer flex-col items-center justify-between rounded-t-lg bg-white px-5 py-4 transition-all sm:flex-row ${
          !isOpen && "rounded-b-lg duration-1000"
        }`}
        onClick={() => handleToggle(question)}
      >
        <h4 className=" m-0 mb-2 text-lg font-medium sm:mb-0 md:text-inherit">
          {question}
        </h4>
        <div
          className={` ${
            isOpen ? " -rotate-180" : ""
          } bg-transparent transition-all duration-500`}
        >
          <span className="m-auto flex">
            <SvgSPrite icon="chevron_down" size="small" />
          </span>
        </div>
      </button>
      <div
        className={` ${
          isOpen ? " h-auto" : "h-0 "
        }  relative overflow-hidden rounded-b-lg bg-white transition-all duration-500`}
        style={{ height: isOpen ? height : 0 }}
      >
        <div ref={contentEl} className="grid gap-2 px-5 pb-5 pt-1">
          {answer.map((item, i) => {
            return (
              <div key={i} className="">
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FAQ_ITEMS = [
  {
    question: "چطور میتونم به عنوان “راننده” در دراپ ثبت‌نام کنم؟",
    answer: [
      "برای ثبت نام در سامانه دراپ به عنوان راننده، شما باید این مراحل را طی کنید:",
      "۱. اپلیکیشن دراپ راننده را از فروشگاه گوگل پلی یا کافه بازار دانلود و نصب کنید.",
      "۲. اپلیکیشن را باز کنید و شماره تلفن همراه خود را وارد کنید.",
      "۳. کد تاییدی که به شماره تلفن شما ارسال می‌شود را در اپلیکیشن وارد کنید.",
      "۴. به قسمت حساب من در اپلیکیشن بروید و اطلاعات کاربری خود را کامل کنید.",
      "این مراحل ساده و سریع هستند و فقط چند دقیقه زمان می‌برند. امیدوارم از خدمات دراپ راننده لذت ببرید.",
    ],
  },
  {
    question: "آیا ثبت نام در سامانه هزینه داره؟",
    answer: [
      "خیر، ثبت نام در سامانه دراپ راننده هزینه‌ای ندارد. شما فقط باید اپلیکیشن را دانلود کنید و اطلاعات خود را وارد کنید. بعد از ثبت نام، شما می‌توانید به عنوان یک راننده دراپ درآمد کسب کنید و از مزایای این سامانه بهره‌مند شوید.",
    ],
  },
  {
    question: "مزیت اصلی سامانه شما چیه؟",
    answer: [
      "مزیت اصلی سامانه دراپ این است که به شما امکان می‌دهد بار خود را با سرعت، امنیت و قیمت مناسب به مقصد برسانید. دراپ با استفاده از فناوری‌های پیشرفته، شبکه‌ای از رانندگان مطمئن و با تجربه را به شما معرفی می‌کند و به شما اجازه می‌دهد با آن‌ها به صورت آنلاین در تماس باشید و جزئیات حمل بار خود را هماهنگ کنید. دراپ همچنین به شما کمک می‌کند تا هزینه حمل بار خود را کاهش دهید. دراپ یک سامانه کاربرپسند است که با توجه به نیازهای شما طراحی شده است.",
    ],
  },
  {
    question:
      "نسخه اندروید گوشی من پایین هست، آیا این اپلیکیشن روی اون نصب میشه؟",
    answer: [
      "برای نصب اپلیکیشن دراپ باید حداقل نسخه اندروید شما ۵ به بالا باشه.",
    ],
  },
  {
    question: "نقش کیف‌پول در اپلیکیشن چیه؟",
    answer: [
      "کیف‌پول در اپلیکیشن دراپ یک قابلیت مالی است که به شما امکان می‌دهد تراکنش‌های خود را با رانندگان به راحتی انجام دهید. شما می‌توانید کیف‌پول خود را با استفاده از کارت بانکی شارژ کنید و از آن برای پرداخت هزینه حمل بار خود استفاده کنید.",
    ],
  },
  {
    question: "چطور میتونم به عنوان “صاحب‌بار” در دراپ ثبت‌نام کنم؟",
    answer: [
      "برای ثبت‌نام در دراپ به عنوان صاحب‌بار، شما باید ابتدا یک حساب کاربری ایجاد کنید و سپس اطلاعات مربوط به بار خود را وارد کنید",
    ],
  },
];

export default FAQList;
