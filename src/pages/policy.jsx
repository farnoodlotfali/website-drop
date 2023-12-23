import PanelLayout, { PADDING_LAYOUT } from "@/Layouts/PanelLayout";
import Head from "next/head";

const Policy = () => {
  return (
    <>
      <Head>
        <title> دراپ - محرمانگی و حریم خصوصی </title>
      </Head>

      <div className={`bg-white py-32 ${PADDING_LAYOUT}`}>
        <h3 className="mb-12 text-center text-3.2xl font-bold text-primary-900">
          محرمانگی و حریم خصوصی
        </h3>

        <div className="flex flex-col gap-6 text-justify">
          <div>
            <h4 className="font-bold">مقدمه</h4>
            <p>
              اپلیکیشن دراپ یک پلتفرم جامع حمل بار جاده‌ای است که به شما کمک
              می‌کند تا به راحتی و با قیمت مناسب بار خود را به مقصد برسانید. ما
              در دراپ از حریم خصوصی شما احترام می‌گذاریم و به حفاظت از اطلاعات
              شخصی شما اهمیت می‌دهیم. در این سند، ما به شما توضیح می‌دهیم که
              چگونه اطلاعات شخصی شما را جمع‌آوری، استفاده، ذخیره و افشا می‌کنیم
              و چه حقوق و اختیاراتی برای شما در این زمینه وجود دارد.
            </p>
          </div>
          <div>
            <h4 className="font-bold">تعاریف</h4>
            <p className="mb-3">
              - <strong> جمع‌آوری</strong> به هر نوع فعالیت گفته می‌شود که منجر
              به در اختیار قرار دادن اطلاعات شخصی توسط ما شود. این فعالیت ممکن
              است شامل ثبت نام در اپلیکیشن، پر کردن فرم‌های آنلاین، ارسال پاسخ
              به نظرسنجی‌ها، بارگذاری عکس یا ویدئو، تبادل پیام با سایر کاربران
              یا پشتیبانان، استفاده از خدمات و قابلیت‌های اپلیکیشن، استفاده از
              کوکی‌ها، بازدید از وب‌سایت‌های مرتبط و هر نوع فعالیت دیگر باشد که
              از طریق اپلیکیشن دراپ انجام شود.
            </p>
            <p>
              - <strong>اطلاعات شخصی</strong> به هر نوع داده‌ای گفته می‌شود که
              قابل استفاده برای شناسایی یک فرد حقیقی باشد. این داده‌ها ممکن است
              شامل نام، نام خانوادگی، کد ملی، شماره تلفن همراه، آدرس پست
              الکترونیک، آدرس محل سکونت یا کار، عکس، ویدئو، صدا، مختصات
              جغرافیایی و هر نوع داده‌ای دیگر باشد که به صورت تنها یا با هم
              توانایی تشخیص هویت فرد را داشته باشد.
            </p>
          </div>

          <p>
            استفاده به هر نوع فعالیت گفته می‌شود که منجر به بهره‌برداری از
            اطلاعات شخصی توسط ما شود. این فعالیت ممکن است شامل تحلیل، پردازش،
            ارائه، بهبود، توسعه، تبلیغ، بازاریابی، انطباق با قوانین و مقررات و
            هر نوع هدف دیگر باشد که در این سند ذکر شده است یا با رضایت شما صورت
            گیرد.
          </p>

          <p>
            ذخیره به هر نوع فعالیت گفته می‌شود که منجر به نگهداری اطلاعات شخصی
            توسط ما شود. این فعالیت ممکن است شامل ثبت، ذخیره‌سازی، حفظ،
            نگه‌داری، حفاظت، پشتیبان‌گیری و هر نوع عمل دیگر باشد که برای حفظ
            امنیت و قابل دسترس بودن اطلاعات شخصی لازم باشد.
          </p>
          <p>
            افشا به هر نوع فعالیت گفته می‌شود که منجر به در اختیار قرار دادن
            اطلاعات شخصی توسط ما به سومین طرفان شود. این فعالیت ممکن است شامل
            فروش، انتقال، تبادل، اشتراک‌گذاری، انتشار و هر نوع عمل دیگر باشد که
            برای رسیدن به اهداف ما یا رعایت قوانین و مقررات لازم باشد.
          </p>
          <p>
            سومین طرف به هر نوع شخص گفته می‌شود که جزء ما یا شما نباشد. این شخص
            ممکن است شامل همکاران، پارتنران، تأمین‌کنندگان، خدمات‌دهندگان،
            مقامات قضایی و هر نوع طرف دیگر باشد که با رضایت شما یا براساس قوانین
            و مقررات به اطلاعات شخصی دسترسی داشته باشد.
          </p>
          <p>
            <div>جمع‌آوری و استفاده از اطلاعات شخصی</div>
            <div>جمع‌آوری</div>
            <div>
              ما بسته به نحوه استفاده شما از خدمات دراپ، ممکن است بخش‌های مختلفی
              از اطلاعات شخصی شما را جمع‌آوری کنند
            </div>
          </p>
        </div>
      </div>
    </>
  );
};
Policy.PageLayout = PanelLayout;

export default Policy;
