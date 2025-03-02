import React, { useEffect, useState } from "react";
import ThemeAppMiddleware from "./ThemeAppMiddleware";
// Giao diện
import lixi from "../assets/Themes/Tet/lixi.png";
import banhkem from "../assets/Themes/Sinhnhat/banhkem.png";
import VietNam from "../assets/Themes/Cachmang/VietNam.png";
import xetang from "../assets/Themes/Cachmang/xetang.png";
import trungthu from "../assets/Themes/Trungthu/thongoc.png";
import hoa from "../assets/Themes/Hoa/bohoa.png";
import nguoituyet from "../assets/Themes/Noel/nguoituyet.png";
import hallowen from "../assets/Themes/Hallowen/hallowen.png";

function ThemeClientApp(props) {
  const {
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
  } = ThemeAppMiddleware();

  const [sinhnhatCNcode, setSinhnhatCNcode] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSinhnhatCNcode(false), 5000);

    return () => clearTimeout(timer);
  }, []);

  const handlePopup = () => {
    setSinhnhatCNcode(false);
  };

  return (
    <>
      <img
        className="img-bg"
        src={lixi}
        alt=""
        style={{ display: tet ? "block" : "none" }}
      />
      <img
        className="img-bg"
        src={banhkem}
        alt=""
        style={{ display: sn || hcm ? "block" : "none" }}
      />
      <img
        className="img-bg"
        src={VietNam}
        alt=""
        style={{ display: hv || cs || dbp || qk ? "block" : "none" }}
      />
      <img
        className="img-bg"
        src={xetang}
        alt=""
        style={{ display: mn || cmt8 ? "block" : "none" }}
      />
      <img
        className="img-bg"
        src={trungthu}
        alt=""
        style={{ display: tt ? "block" : "none" }}
      />
      <img
        className="img-bg"
        src={hoa}
        alt=""
        style={{ display: qtpn || ngvn || pnvn ? "block" : "none" }}
      />
      <img
        className="img-bg"
        src={nguoituyet}
        alt=""
        style={{ display: noel ? "block" : "none" }}
      />
      <img
        className="img-bg"
        src={hallowen}
        alt=""
        style={{ display: ht ? "block" : "none" }}
      />

      {/* POPUP */}
      {sinhnhatCNcode && sn && (
        <>
          <div className="over-play">
            <i className="fa-solid fa-x" onClick={handlePopup}></i>
            <h3>Chúc mừng sinh nhật CNcode</h3>
          </div>
        </>
      )}
    </>
  );
}

export default ThemeClientApp;
