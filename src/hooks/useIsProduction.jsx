import { useEffect, useState } from "react";

const useIsProduction = () => {
  const [isProduction, setIsProduction] = useState(
    process.env.NEXT_PUBLIC_APP_ENV === "sarir"
  );

  useEffect(() => {
    setIsProduction(process.env.NEXT_PUBLIC_APP_ENV === "sarir");
  }, [process.env.NEXT_PUBLIC_APP_ENV]);

  return {
    state: process.env.NEXT_PUBLIC_APP_ENV,
    isProduction: isProduction,
    isTest: !isProduction,
  };
};

export default useIsProduction;
