import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import logo from "../../../assets/logo.png";
import xu from "../../../assets/Khac/xu.png";
import chuoi from "../../../assets/Khac/streak.png";
import "./Profile.scss";
import { Link, useParams } from "react-router-dom";
import {
  ChangeItemClientEdit,
  PostClientRead,
  ProfileClientRead,
} from "../../../services/ProfileClientServer";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import socket from "../../Service/socket";

function Profile() {
  const { username } = useParams();
  const userId = useSelector((state) => state.user.account.id);

  const [user, setUser] = useState();
  const [blog, setBlog] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await ProfileClientRead(username);

      if (data && data.EC === 0) {
        setUser(data.DT.user);
      }
    };

    const getPost = async () => {
      const data = await PostClientRead(username);

      if (data && data.EC === 0) {
        setBlog(data.DT);
      }
    };

    getData();
    getPost();

    socket.on("changeItem", () => {
      getData();
    });

    return () => {
      socket.off("changeItem");
    };
  }, [username]);

  const [showTab, setShowTab] = useState("");

  const handleChangeCoins = (idItem) => {
    setShowTab(idItem);
  };

  const [countChange, setCountChange] = useState();

  const dataItem = user?.gift?.find((d) => d?.giftId?._id === showTab);
  const countItem = user?.gift?.filter(
    (d) => d?.giftId?._id === showTab
  )?.length;

  const handleChangeMain = async (idItemChange, price) => {
    if (countChange > countItem) {
      toast.error("Bạn đã chọn vượt quá số lượng vật phẩm hiện có!");
      return;
    } else {
      const money = countChange * price;

      const data = await ChangeItemClientEdit(
        userId,
        idItemChange,
        countChange,
        money
      );

      if (data && data.EC === 0) {
        toast.success(data.EM);
        setShowTab("");
      } else {
        toast.error(data.EM);
      }
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | {username} </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
          <link rel="icon" href={logo}></link>
        </Helmet>
      </HelmetProvider>

      <div className="profile">
        <div className="profile-left">
          <div className="avatar">
            <img src={user?.avatar} alt=""></img>
            <h3>{user?.fullName}</h3>
          </div>
          <div className="thongtin">
            <div className="streak">
              <p>{user?.streak}</p>
              <img src={chuoi} alt=""></img>
            </div>
            <div className="coins">
              <p>{user?.coins}</p>
              <img src={xu} alt=""></img>
            </div>
          </div>
          <div className="border"></div>
          <div className="infor">
            <h5>Thông tin</h5>
            <div className="infor-item">
              <i className="fa-solid fa-feather-pointed"></i>
              <p>{user?.memberPoints}</p>
            </div>
            <div className="infor-item">
              <i className="fa-solid fa-user"></i>
              <p>@{user?.username}</p>
            </div>
            <div className="infor-item">
              <i className="fa-solid fa-envelope"></i>
              <p>{user?.email}</p>
            </div>
            <div className="infor-item">
              <i className="fa-solid fa-location-dot"></i>
              <p>{user?.tinh}</p>
            </div>
            <div className="infor-item">
              <i className="fa-solid fa-calendar-days"></i>
              <p>{user?.birthday}</p>
            </div>
            <div className="infor-item">
              <i className="fa-solid fa-school"></i>
              <p>{user?.school}</p>
            </div>
          </div>
          <div className="border"></div>
          <div className="infor">
            <h5>Giới thiệu</h5>
            <p style={{ textAlign: "justify" }}>{user?.info}</p>
          </div>
          <div className="border"></div>
          <div className="infor">
            <h5>Mạng xã hội</h5>
            {user?.mxh?.map((item) => (
              <div className="infor-item">
                <Link to={item?.link} key={item?.link}>
                  {item?.link}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="profile-right">
          <div className="item">
            {(() => {
              const countMap = {};

              user?.gift?.forEach((item) => {
                const id = item?.giftId?._id;
                if (id) {
                  countMap[id] = (countMap[id] || 0) + 1;
                }
              });

              const uniqueGifts = [
                ...new Map(
                  user?.gift?.map((item) => [item?.giftId?._id, item])
                ).values(),
              ];

              if (uniqueGifts.length === 0) {
                return <p>Bạn chưa có vật phẩm nào cả...</p>;
              } else {
                return uniqueGifts.map((item) => (
                  <div className="item-main" key={item?.giftId?._id}>
                    <img src={item?.giftId?.img} alt="" />
                    <p>số lượng: {countMap[item?.giftId?._id]}</p>
                    {user?._id === userId && (
                      <div
                        className="btn btn-primary"
                        onClick={() => handleChangeCoins(item?.giftId?._id)}
                      >
                        Đổi sang xu
                      </div>
                    )}
                  </div>
                ));
              }
            })()}
          </div>
          <div className="pBlog">
            {blog?.length > 0 ? (
              blog?.map((item) => (
                <div className="pBlog-item">
                  <Link to={`/blog/${item?.slug}`}>
                    <img src={item?.img} alt="" />
                    <h3>{item?.title}</h3>
                    <p>{item?.description}</p>
                  </Link>
                  <span>{moment(item?.createdAt).format("DD/MM/YYYY")}</span>
                </div>
              ))
            ) : (
              <p style={{ padding: "20px" }}>
                Bạn chưa xuất bản blog nào cả...
              </p>
            )}
          </div>
        </div>
      </div>

      {showTab !== "" && (
        <div className="over-change">
          <i className="fa-solid fa-xmark" onClick={() => setShowTab("")}></i>
          <div className="change-item">
            <h3>Đổi vật phẩm</h3>
            <p>Bạn đang muốn đổi: {dataItem?.giftId?.name}</p>
            <input
              type="number"
              value={countChange}
              onChange={(e) => setCountChange(e.target.value)}
              className="form-control"
              placeholder="Số lượng muốn đổi"
            ></input>
            <div
              className="btn btn-primary mt-3"
              onClick={() =>
                handleChangeMain(dataItem?.giftId?._id, dataItem?.giftId?.price)
              }
            >
              Đổi ngay
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
