import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { useRouter } from "next/router";

const AppState = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [marginTopPage, setMarginTopPage] = useState(0);
  const [fromApp, setFromApp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!!router.query?.from_app && router.query?.from_app === "true") {
      setFromApp(true);
      setMarginTopPage(0);
    } else {
      setFromApp(false);
    }
    setTimeout(() => {
      setHasMounted(true);
    }, 150);
  }, [router.query?.from_app]);

  if (!hasMounted) return null;

  return (
    <AppContext.Provider value={{ marginTopPage, setMarginTopPage, fromApp }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
