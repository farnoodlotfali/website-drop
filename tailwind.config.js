/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      width: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "10/10": "100%",
      },
      colors: {
        primary: {
          50: "#e9edff",
          100: "#c8d5ee",
          200: "#acb9d6",
          300: "#8e9dbe",
          400: "#7888ab",
          500: "#627499",
          600: "#536688",
          700: "#435371",
          800: "#33405b",
          900: "#202c43",
          dark: "#1C2536",
          light: "#E5EFF2",
          extraLight: "#F5F7F9",
        },
        secondary: {
          50: "#ffddcf",
          100: "#febcb4",
          200: "#df9792",
          300: "#bf736d",
          400: "#a85753",
          500: "#913c39",
          600: "#843333",
          700: "#732729",
          800: "#631a23",
          900: "#510a1a",
          dark: "#5C1F21",
        },
        tertiary: {
          50: "#fafaed",
          100: "#f4f3e7",
          200: "#ebebde",
          300: "#dbdbcf",
          400: "#b8b7ab",
          500: "#98988c",
          600: "#6f6f64",
          700: "#5c5c51",
          800: "#3d3d33",
          900: "#1c1d13",
          dark: "#292929",
        },
      },
      screens: {
        xs: "480px",
      },
      fontFamily: {
        IRANSansXV: ["IRANSansXV", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-radial": `-webkit-radial-gradient(50% 0%, circle closest-corner, transparent 0, transparent 200px, #00617c 201px, #00617c 102px)`,
        pattern: "url('../../public/Assets/images/Pattern.svg')",
        steering_wheel:
          "url('../../public/Assets/images/bg_steering_wheel.svg')",
        cardboard_box: "url('../../public/Assets/images/bg_cardboard_box.svg')",
        company: "url('../../public/Assets/images/bg_company.svg')",
        cars_roads: "url('../../public/Assets/images/cars_roads.png')",
      },
      borderRadius: {
        "card-border-lg": "25px",
        "card-border-sm": "15px",
      },
      fontSize: {
        "3.2xl": "32px",
      },
    },
  },
  plugins: [],
};
