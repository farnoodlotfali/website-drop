export const BREAK_POINTS = {
  xs: "480px",
  sm: "640px",
  // => @media (min-width: 640px) { ... }

  md: "768px",
  // => @media (min-width: 768px) { ... }

  lg: "1024px",
  // => @media (min-width: 1024px) { ... }

  xl: "1280px",
  // => @media (min-width: 1280px) { ... }

  "2xl": "1536px",
};

export const CedarmapToken = "2e2dfe4dc320a34c99736b8693cd6c99d7f6f985";
export const defaultCenter = [35.75734729205658, 51.40998601913453];

export const VEHICLE_CATEGORIES = [
  {
    id: 7,
    title: "وانت",
  },
  {
    id: 6,
    title: "تک",
  },
  {
    id: 5,
    title: "خاور",
  },
  {
    id: 4,
    title: "جفتی",
  },
  {
    id: 3,
    title: "تریلی",
  },
];

export const SIGN_UP_TYPES_KEYS = {
  company: "company",
  legalOwner: "legal-owner",
};

export const SIGN_UP_TYPES = {
  [SIGN_UP_TYPES_KEYS.company]: "شرکت حمل",
  [SIGN_UP_TYPES_KEYS.legalOwner]: "مشتری حقوقی",
};

export const GENDER = [
  { name: "مرد", value: "male" },
  { name: "زن", value: "female" },
];
