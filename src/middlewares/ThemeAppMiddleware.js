import { useEffect, useState } from "react";
import { ThemeAdminRead } from "../services/ThemeAdminServer";
import socket from "../components/Service/socket";

const ThemeAppMiddleware = () => {
  const [themeData, setThemeData] = useState([]);

  useEffect(() => {
    const getDataTheme = async () => {
      const dataTheme = await ThemeAdminRead();
      if (dataTheme) {
        setThemeData(dataTheme.DT);
      }
    };
    getDataTheme();

    socket.on("changeTheme", (newTheme) => {
      setThemeData((prevThemes) =>
        prevThemes.map((theme) =>
          theme._id === newTheme._id
            ? { ...theme, active: true }
            : { ...theme, active: false }
        )
      );
    });

    return () => {
      socket.off("changeTheme");
    };
  }, []);

  const [tet, setTet] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "TET");
    if (tetTheme?.active) {
      setTet(true);
    } else {
      setTet(false);
    }
  }, [themeData]);

  return {
    tet,
  };
};

export default ThemeAppMiddleware;
