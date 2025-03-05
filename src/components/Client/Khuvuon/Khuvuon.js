import React from "react";
// import React, { useState, useEffect } from "react";
import xu from "../../../assets/Khac/xu.png";
// import binhnuoc from "../../../assets/Khuvuon/binhnuoc.png";
import nuoc from "../../../assets/Khuvuon/nuoc.png";
// import cay_mam from "../../../assets/Khuvuon/mam_cay.png";
// import cay_cap1 from "../../../assets/Khuvuon/cay_cm.png";
// import cay_cap2 from "../../../assets/Khuvuon/cay_ch.png";
// import cay_cap3 from "../../../assets/Khuvuon/cay_cb.png";
// import cay_cap4 from "../../../assets/Khuvuon/cay_cbo.png";
// import cay_cap5 from "../../../assets/Khuvuon/cay_cn.png";
import "./Khuvuon.scss";

function Khuvuon() {
  return (
    <div className="khuvuon">
      <div className="top-control">
        <div className="control-item">
          <img src={xu} alt=""></img>
          <p>100 xu</p>
        </div>
        <div className="control-item">
          <img src={nuoc} alt=""></img>
          <p>100 nước</p>
        </div>
      </div>
    </div>
  );
}

export default Khuvuon;
