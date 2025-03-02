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

  const [sn, setSn] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "SN");
    if (tetTheme?.active) {
      setSn(true);
    } else {
      setSn(false);
    }
  }, [themeData]);

  const [hv, setHv] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "HV");
    if (tetTheme?.active) {
      setHv(true);
    } else {
      setHv(false);
    }
  }, [themeData]);

  const [cs, setCs] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "ĐCS");
    if (tetTheme?.active) {
      setCs(true);
    } else {
      setCs(false);
    }
  }, [themeData]);

  const [mn, setMn] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "MN");
    if (tetTheme?.active) {
      setMn(true);
    } else {
      setMn(false);
    }
  }, [themeData]);

  const [dbp, setDbp] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "DBP");
    if (tetTheme?.active) {
      setDbp(true);
    } else {
      setDbp(false);
    }
  }, [themeData]);

  const [cmt8, setCmt8] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "CMT8");
    if (tetTheme?.active) {
      setCmt8(true);
    } else {
      setCmt8(false);
    }
  }, [themeData]);

  const [qk, setQk] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "QK");
    if (tetTheme?.active) {
      setQk(true);
    } else {
      setQk(false);
    }
  }, [themeData]);

  const [tt, setTt] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "TT");
    if (tetTheme?.active) {
      setTt(true);
    } else {
      setTt(false);
    }
  }, [themeData]);

  const [qtpn, setQtpn] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "QTPN");
    if (tetTheme?.active) {
      setQtpn(true);
    } else {
      setQtpn(false);
    }
  }, [themeData]);

  const [pnvn, setPnvn] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "PNVN");
    if (tetTheme?.active) {
      setPnvn(true);
    } else {
      setPnvn(false);
    }
  }, [themeData]);

  const [ngvn, setNgvn] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "NGVN");
    if (tetTheme?.active) {
      setNgvn(true);
    } else {
      setNgvn(false);
    }
  }, [themeData]);

  const [noel, setNoel] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "NOEL");
    if (tetTheme?.active) {
      setNoel(true);
    } else {
      setNoel(false);
    }
  }, [themeData]);

  const [hcm, setHcm] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "HCM");
    if (tetTheme?.active) {
      setHcm(true);
    } else {
      setHcm(false);
    }
  }, [themeData]);

  const [ht, setHt] = useState(false);
  useEffect(() => {
    const tetTheme = themeData?.find((item) => item.key === "HT");
    if (tetTheme?.active) {
      setHt(true);
    } else {
      setHt(false);
    }
  }, [themeData]);

  return {
    tet,
    sn,
    hv,
    cs,
    mn,
    dbp,
    hcm,
    cmt8,
    qk,
    tt,
    qtpn,
    pnvn,
    ngvn,
    noel,
    ht,
  };
};

export default ThemeAppMiddleware;
