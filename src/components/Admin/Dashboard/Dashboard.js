import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSelector } from "react-redux";
import logo from "../../../assets/logo.png";
import "./Dashboard.scss";
import { AccessRead } from "../../../services/AccessClientServer";
import { ForumAdminRead } from "../../../services/ForumAdminServer";
import { BlogRead } from "../../../services/BlogAdminServer";
import { ShowNew } from "../../../services/NewsAdminServer";
import { UserRead } from "../../../services/UserAdminServer";
import { GrateReadHome } from "../../../services/HomeClientServer";

function Dashboard() {
  const fullName = useSelector((state) => state.user.account.fullName);

  const [count, setCount] = useState();
  const [f, setF] = useState();
  const [b, setB] = useState();
  const [n, setN] = useState();
  const [t, setT] = useState();
  const [d, setD] = useState();

  const getData = async () => {
    const countData = await AccessRead();
    if (countData && countData.EC === 0) {
      setCount(countData.DT.totalAccess);
    }

    const fData = await ForumAdminRead();
    if (fData && fData.EC === 0) {
      setF(fData.DT.length);
    }

    const bData = await BlogRead();
    if (bData && bData.EC === 0) {
      setB(bData.DT.length);
    }

    const nData = await ShowNew();
    if (nData && nData.EC === 0) {
      setN(nData.DT.length);
    }

    const tData = await UserRead();
    if (tData && tData.EC === 0) {
      setT(tData.DT.length);
    }

    const dData = await GrateReadHome();
    if (dData && dData.EC === 0) {
      setD(dData.DT.length);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Tổng quan </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <div className="admin">
        <h1 className="text-center">Trang quản trị</h1>
        <p className="text-center">
          Chào mừng {fullName} đã quay trở lại với trang quản trị.
        </p>

        <div className="box">
          <div className="box-item">
            <h3>Số lượt truy cập</h3>
            <p>{count}</p>
          </div>
          <div className="box-item">
            <h3>Số lượng khoá học</h3>
            <p>0</p>
          </div>
          <div className="box-item">
            <h3>Số lượng bài tập</h3>
            <p>0</p>
          </div>
          <div className="box-item">
            <h3>Số lượng diễn đàn</h3>
            <p>{f}</p>
          </div>
          <div className="box-item">
            <h3>Số lượng blog</h3>
            <p>{b}</p>
          </div>
          <div className="box-item">
            <h3>Số lượng tin tức</h3>
            <p>{n}</p>
          </div>
          <div className="box-item">
            <h3>Số lượng sự kiện</h3>
            <p>0</p>
          </div>
          <div className="box-item">
            <h3>Số lượng tài khoản</h3>
            <p>{t}</p>
          </div>
          <div className="box-item">
            <h3>Số lượt đánh giá</h3>
            <p>{d}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
