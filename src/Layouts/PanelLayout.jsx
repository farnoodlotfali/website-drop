import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BREAK_POINTS } from "../constants/Const";
import { useRouter } from "next/router";
import { SvgSPrite } from "@/Components/SvgSPrite";
import LogoApp from "@/Components/LogoApp";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useScrollPxDetect } from "@/hooks/useScrollPxDetect";
import { AppContext } from "@/Context/AppContext";
import SimpleSpinner from "@/Components/SimpleSpinner";

export const PADDING_LAYOUT = "px-8 md:px-10 lg:px-24";

const PanelLayout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { marginTopPage, fromApp } = useContext(AppContext);

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  return (
    <div className="min-h-screen">
      {!fromApp && <Header toggleDrawer={toggleDrawer} />}
      <div style={{ marginTop: marginTopPage }}>{children}</div>
      <Drawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
      {!fromApp && <Footer />}
    </div>
  );
};

const DRAWER_LINKS = [
  {
    title: "صفحه اصلی",
    link: "/",
  },
  {
    title: "تخمین هزینه بار",
    link: "/cost-estimate",
  },
  {
    title: "سوالات متداول",
    link: "/faq",
  },
  {
    title: "قوانین و مقررات",
    link: "/privacy",
  },
  {
    title: "درباره‌ما",
    link: "/about",
  },
  {
    title: "تماس باما",
    link: "/contact",
  },
];

const Drawer = ({ openDrawer, toggleDrawer }) => {
  return (
    <div
      className={`${
        openDrawer ? "" : "pointer-events-none  opacity-0 "
      }  modal fixed  left-0 top-0 z-50 flex h-full w-full items-center justify-center transition-all`}
    >
      <div
        onClick={() => {
          toggleDrawer();
        }}
        className="modal-overlay fixed h-full w-full bg-gray-900 opacity-50"
      ></div>

      <div
        className={`fixed left-0 top-0 z-20 h-full w-64 -translate-x-full transform 
        bg-white shadow-lg transition-all duration-500 ${
          openDrawer ? "translate-x-0" : ""
        }
      `}
      >
        <div className="h-full px-6 py-10">
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col gap-10 text-end">
              {DRAWER_LINKS.map((item) => {
                return (
                  <Link
                    className="text-xl font-semibold text-primary-900 hover:underline"
                    prefetch={false}
                    href={item.link}
                    key={item.link}
                    onClick={toggleDrawer}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center justify-around">
              <Link href="/" prefetch={false} className="flex ">
                <div className="h-12 w-12">
                  <LogoApp className="text-primary-900" />
                </div>
              </Link>

              <div className=" min-h-[30px] w-[2px] bg-primary-400 " />

              <Link href="/" prefetch={false} className="flex ">
                <h1 className="text-xl font-bold text-primary-900">دراپ</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HEADER_LINKS = [
  {
    title: "درباره دراپ",
    links: [
      {
        name: "خدمات ما",
        link: "/privacy",
      },
      {
        name: "چرا دراپ",
        link: "/about",
      },
      {
        name: "سوالات متداول",
        link: "/faq",
      },
      {
        name: "درباره ما",
        link: "/about",
      },
      {
        name: "تماس با ما",
        link: "/contact",
      },
    ],
  },
  {
    title: "راهنما",
    links: [
      {
        name: "درخواست مشاوره",
        link: "/about",
      },
      {
        name: "درخواست دمو",
        link: "#",
      },
      {
        name: "راهنماي استفاده",
        link: "/privacy",
      },
      {
        name: "قوانین و مقررات",
        link: "/privacy",
      },
    ],
  },
  {
    title: "تخمین هزینه بار",
    link: "/cost-estimate",
  },
  {
    title: "ثبت‌نام",
    links: [
      {
        name: "شرکت حمل",
        link: "/signup/shipping-company",
        icon: "company",
      },
      {
        name: "مشتری حقوقی",
        link: "/signup/legal-owner",
        icon: "popular_man",
      },
    ],
  },
  {
    title: "ورود",
    icon: <SvgSPrite icon="arrow_right_to_arc" size="small" />,
    links: [
      {
        name: "شرکت حمل",
        link: "/",
        icon: "company",
      },
      {
        name: "راننده",
        link: "/",
        icon: "steering_wheel",
      },
      {
        name: "صاحب بار",
        link: "/",
        icon: "cardboard_box",
      },
    ],
  },
];

const TRANSPARENT_HEADER_ROUTES = ["/"];

const Header = ({ toggleDrawer, marginTop }) => {
  const router = useRouter();
  const { setMarginTopPage } = useContext(AppContext);
  const [showActivity, setShowActivity] = useState(
    // JSON.parse(localStorage.getItem("showActivity")) ?? true
    true
  );
  const { windowWidth } = useWindowWidth(1024);
  const contentEl = useRef(null);

  useEffect(() => {
    setMarginTopPage(contentEl?.current?.scrollHeight);
  }, [contentEl?.current?.scrollHeight, windowWidth, showActivity]);

  const handleShowActivity = () => {
    localStorage.setItem("showActivity", false);
    setShowActivity(false);
  };

  const { IsDetect } = useScrollPxDetect(50);

  const isTablet = useMediaQuery(`(max-width: ${BREAK_POINTS.md})`);

  const isTransparent = useMemo(() => {
    return TRANSPARENT_HEADER_ROUTES.includes(router.pathname);
  }, [router.pathname]);

  return (
    <header
      className={` fixed left-0 right-0 top-0 z-30 w-full transition-all ${
        IsDetect ? "bg-white shadow-xl" : "bg-transparent"
      }  ${isTransparent && !IsDetect ? "text-white" : "text-primary-900"}  `}
      style={{
        marginTop: marginTop,
      }}
    >
      {/* activity */}
      <div
        ref={contentEl}
        className={`${
          showActivity ? "flex" : "hidden"
        } z-30 w-full items-center justify-between border-b border-b-white bg-secondary-700 px-5 py-4 text-white`}
      >
        <div className="float-right flex w-full flex-col items-start gap-x-5 gap-y-2 md:flex-row md:items-center">
          <div className="flex w-full justify-between md:w-auto ">
            <div className="flex items-center gap-x-5">
              <SvgSPrite icon="internet" className="" size="large" />
              <strong>محدوده فعالیت</strong>
            </div>
            <SvgSPrite
              icon="close"
              className={`${
                !isTablet ? "hidden" : "block"
              } float-left cursor-pointer`}
              onClick={handleShowActivity}
            />
          </div>
          <p>
            به اطلاع می‌رساند، محدوده فعالیت سامانه دراپ براساس مجوز صادره و در
            استان یزد می‌باشد .
          </p>
        </div>
        <SvgSPrite
          icon="close"
          className={`${
            isTablet ? "hidden" : "block"
          } float-left cursor-pointer`}
          onClick={handleShowActivity}
        />
      </div>
      {/* activity */}

      <div
        className={`flex items-center justify-between py-6 ${PADDING_LAYOUT}`}
      >
        <div className="flex items-center gap-x-4">
          <Link href="/" prefetch={false} style={{ display: "flex" }}>
            <div className="h-10 w-10">
              {isTransparent && !IsDetect ? (
                <LogoApp className="text-white" />
              ) : (
                <LogoApp className="text-primary-900" />
              )}
            </div>
          </Link>
          <div className=" h-4 w-[1px] bg-gray-400 md:h-7 " />
          <Link href="/" prefetch={false}>
            <h1 className="whitespace-nowrap text-xl font-bold ">دراپ</h1>
          </Link>
        </div>
        {isTablet ? (
          <div className="">
            <SvgSPrite
              icon="menu"
              onClick={toggleDrawer}
              className="cursor-pointer"
            />
          </div>
        ) : (
          <div className="flex justify-between gap-x-1 lg:gap-x-5">
            {HEADER_LINKS.map((item, i) => {
              return item.links ? (
                <div className="group relative inline-block" key={i}>
                  <button className="inline-flex items-center gap-2 rounded px-2 py-2 font-semibold hover:bg-[#00000033]">
                    <span className="mr-1 text-sm">{item.title}</span>
                    {item.icon ? (
                      item.icon
                    ) : (
                      <SvgSPrite icon={"arrow_dropdown"} size="3xSmall" />
                    )}
                  </button>

                  <div
                    className={`absolute ${
                      i < HEADER_LINKS.length / 2 ? "right-0" : "left-0"
                    } hidden group-hover:block`}
                  >
                    <div className="pt-2">
                      <ul
                        className={`w-44 divide-y divide-gray-100 rounded-lg bg-white text-gray-700 shadow-[1px_3px_12px_-3px_black]`}
                      >
                        {item.links.map((menuItem, j) => {
                          return (
                            <li key={menuItem.link}>
                              <Link
                                prefetch={false}
                                href={menuItem.link}
                                className={`group/link flex items-center gap-x-2 whitespace-nowrap  px-4 py-[10px] text-sm font-semibold hover:bg-primary-300 hover:text-white ${
                                  j === 0 && "rounded-t-lg "
                                } ${
                                  j === item.links.length - 1 && "rounded-b-lg "
                                } `}
                              >
                                {menuItem.icon && (
                                  <div className="flex items-center justify-center rounded-full bg-primary-extraLight p-2 text-primary-700 group-hover/link:bg-primary-700 group-hover/link:text-white">
                                    <SvgSPrite
                                      icon={menuItem.icon}
                                      size="small"
                                    />
                                  </div>
                                )}
                                {menuItem.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  prefetch={false}
                  href={item.link}
                  className="inline-flex items-center gap-2 rounded px-2 py-2 text-sm font-semibold hover:bg-[#00000033] "
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

const FOOTER_LINK_HOVER =
  "hover:bg-[#00000033] px-3 py-2 rounded-md transition-all md:text-base text-sm";

const Footer = () => {
  const [samanImageLoaded, setSamanImageLoaded] = useState({
    load: true,
    error: false,
  });
  const [enamadImageLoaded, setEnamadImageLoaded] = useState({
    load: true,
    error: false,
  });

  const handleEnamadImageEvents = (name, val) => {
    setEnamadImageLoaded((prev) => ({ ...prev, [name]: val }));
  };
  const handleSamanImageEvents = (name, val) => {
    setSamanImageLoaded((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <footer className={`bg-primary-dark p-10 ${PADDING_LAYOUT}`}>
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between">
        <div className="w-full">
          <Image
            src={"./drop_logo.svg"}
            alt="drop_logo"
            width={250}
            height={250}
            title="drop_logo"
            className="mx-auto md:mx-0"
          />
        </div>

        <div className="flex w-full justify-around whitespace-nowrap text-center">
          <div className=" flex flex-col gap-7 text-white">
            <Link href="/faq" prefetch={false} className={FOOTER_LINK_HOVER}>
              سوالات متداول
            </Link>
            <Link
              href="/privacy"
              prefetch={false}
              className={FOOTER_LINK_HOVER}
            >
              قوانین و مقررات
            </Link>
            <Link href="/policy" prefetch={false} className={FOOTER_LINK_HOVER}>
              محرمانگی و حریم خصوصی
            </Link>
          </div>
          <div className=" flex flex-col gap-7 text-white">
            <Link href="/about" prefetch={false} className={FOOTER_LINK_HOVER}>
              درباره‌ما
            </Link>
            <Link
              href="/contact"
              prefetch={false}
              className={FOOTER_LINK_HOVER}
            >
              تماس با ما
            </Link>
          </div>
        </div>

        <div className="flex w-full justify-center md:justify-end ">
          <div className=" rounded-lg bg-white p-4 ">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex h-[150px] w-[150px] items-center justify-center">
                <a
                  referrerPolicy="origin"
                  target="_blank"
                  href="https://trustseal.enamad.ir/?id=412536&Code=DUJ3PEHujaFu2coUXfbYJ7QmDbQJTXlp"
                >
                  <img
                    referrerPolicy="origin"
                    src={
                      enamadImageLoaded.error
                        ? "./Assets/images/enamad-logo.png"
                        : "https://trustseal.enamad.ir/logo.aspx?id=412536&Code=DUJ3PEHujaFu2coUXfbYJ7QmDbQJTXlp"
                    }
                    alt="logo-enamad"
                    style={{ cursor: "pointer" }}
                    Code="DUJ3PEHujaFu2coUXfbYJ7QmDbQJTXlp"
                    loading="eager"
                    onError={() => {
                      handleEnamadImageEvents("load", false);
                      handleEnamadImageEvents("error", true);
                    }}
                    onLoad={() => handleEnamadImageEvents("load", false)}
                    className={`${enamadImageLoaded.error && "grayscale"}`}
                  />
                </a>
                {enamadImageLoaded.load && <SimpleSpinner showText={false} />}
              </div>

              <div className="flex h-[150px] w-[150px] items-center justify-center ">
                <img
                  referrerPolicy="origin"
                  id="rgvjfukzesgtjzpejxlzsizp"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(
                      "https://logo.samandehi.ir/Verify.aspx?id=360719&p=xlaogvkaobpdjyoerfthpfvl",
                      "Popup",
                      "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30"
                    )
                  }
                  loading="eager"
                  onError={() => {
                    handleSamanImageEvents("load", false);
                    handleSamanImageEvents("error", true);
                  }}
                  onLoad={() => handleSamanImageEvents("load", false)}
                  alt="logo-samandehi"
                  src={
                    samanImageLoaded.error
                      ? "./Assets/images/samandehi-logo.png"
                      : "https://logo.samandehi.ir/logo.aspx?id=360719&p=qftiwlbqlymayndtnbpdbsiy"
                  }
                  className={`${samanImageLoaded.error && "grayscale"}`}
                />

                {samanImageLoaded.load && <SimpleSpinner showText={false} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-5 border-gray-500" />

      <div className="flex flex-col items-center justify-between gap-5 text-center text-white md:flex-row md:text-start">
        <a href="mailto:info@droproad.ir">info@droproad.ir</a>
      </div>
    </footer>
  );
};

export default PanelLayout;
