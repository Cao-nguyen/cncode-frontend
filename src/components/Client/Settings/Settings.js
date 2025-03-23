import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import "./Settings.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  UserClientEdit,
  UserClientRead,
} from "../../../services/SettingsClientServer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import moment from "moment/moment";
import { toast } from "react-toastify";
require("moment/locale/vi");

function Settings() {
  const navigate = useNavigate();
  moment.locale("vi");

  const [active, setActive] = useState("top");

  const handleTop = () => {
    setActive("top");
  };

  const handleBot = () => {
    setActive("bot");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const id = useSelector((state) => state.user.account.id);

  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    info: "",
    birthday: "",
    tinh: "",
    school: "",
    avatar: "",
    web: "",
    git: "",
    zalo: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const data = await UserClientRead(id);
      if (data) {
        setUserData({
          fullName: data.DT.fullName || "",
          username: data.DT.username || "",
          info: data.DT.info || "",
          birthday: data.DT.birthday || "",
          tinh: data.DT.tinh || "",
          school: data.DT.school || "",
          avatar: data.DT.avatar || "",
          web: data.DT.web || "",
          git: data.DT.git || "",
          zalo: data.DT.zalo || "",
          facebook: data.DT.facebook || "",
          tiktok: data.DT.tiktok || "",
          youtube: data.DT.youtube || "",
          createdAt: moment(data.DT.createdAt),
          updatedAt: moment(data.DT.updatedAt),
        });
      }
    };

    getUser();
  }, [id]);

  const [show, setShow] = useState();

  const handleShow = (key) => {
    setShow(key);
  };

  const handlePush = async () => {
    const data = await UserClientEdit(
      id,
      userData.fullName,
      userData.username,
      userData.info,
      userData.birthday,
      userData.tinh,
      userData.school,
      userData.avatar,
      userData.web,
      userData.git,
      userData.zalo,
      userData.facebook,
      userData.tiktok,
      userData.youtube
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Cài đặt </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
          <link rel="icon" href={logo}></link>
        </Helmet>
      </HelmetProvider>
      <div className="settings">
        <div className="settings-left">
          <div className="left-head">
            <img src={logo} alt=""></img>
            <h3>Cài đặt tài khoản</h3>
            <p>
              Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt
              bảo mật, quản lý thông báo, v.v.
            </p>
          </div>
          <div className="left-body">
            <div
              className={active === "top" ? "item active" : "item"}
              onClick={handleTop}
            >
              <i className="fa-solid fa-user"></i>
              <p>Thông tin cá nhân</p>
            </div>
            <div
              className={active === "bot" ? "item active" : "item"}
              onClick={handleBot}
            >
              <i className="fa-solid fa-lock"></i>
              <p>Mật khẩu và bảo mật</p>
            </div>
          </div>
        </div>
        <div className="settings-right">
          <div className="button-back" onClick={handleBack}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          {active === "top" ? (
            <div className="infor">
              <h3>Thông tin cá nhân</h3>
              <p>Quản lí thông tin cá nhân của bạn.</p>

              <h4>Thông tin cơ bản</h4>
              <p>Quản lí tên hiển thị, tên đăng nhập, bio và avatar của bạn.</p>
              <div className="table">
                {[
                  { key: "fullName", label: "Họ và tên" },
                  { key: "username", label: "Tên người dùng" },
                  { key: "info", label: "Giới thiệu" },
                  { key: "birthday", label: "Ngày tháng năm sinh" },
                  { key: "tinh", label: "Tỉnh thành" },
                  { key: "school", label: "Đơn vị học tập & làm việc" },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="table-item"
                    onClick={() => handleShow(key, label)}
                  >
                    <div className="table-item-left">
                      <h5>{label}</h5>
                      <p>{userData[key] || "Chưa cập nhật"}</p>
                    </div>
                    <div className="table-item-right">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </div>
                ))}

                <div className="table-item">
                  <div className="table-item-left">
                    <h5>Ảnh đại diện</h5>
                    <img src={userData.avatar} alt="Avatar" />
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>
              </div>

              <h4>Thông tin mạng xã hội</h4>
              <p>
                Quản lí các liên kết liên quan đến trang mạng xã hội của bạn.
              </p>

              <div className="table">
                {[
                  { key: "web", label: "Trang web cá nhân" },
                  { key: "git", label: "Gihub" },
                  { key: "zalo", label: "Zalo" },
                  { key: "facebook", label: "Facebook" },
                  { key: "tiktok", label: "Tiktok" },
                  { key: "youtube", label: "Youtube" },
                ].map(({ key, label }) => (
                  <div key={key} className="table-item">
                    <div className="table-item-left">
                      <h5>{label}</h5>
                      <p>{userData[key] || "Chưa cập nhật"}</p>
                    </div>
                    <div className="table-item-right">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="settings-right">
              <div className="infor">
                <h3>Mật khẩu và bảo mật</h3>
                <p>Quản lí mật khẩu và cài đặt bảo mật.</p>

                <h4>Bảo mật & khôi phục</h4>
                <p>Thay đổi mật khẩu và khôi phục mật khẩu của bạn.</p>

                <div className="table">
                  <div className="table-item">
                    <div className="table-item-left">
                      <h5>Thay đổi mật khẩu</h5>
                      <p>
                        Lần đổi gần nhất:
                        {`${" "} ${userData?.createdAt.from(
                          userData?.updatedAt
                        )}`}
                      </p>
                    </div>
                    <div className="table-item-right">
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </div>

                  <div className="table-item">
                    <div className="table-item-left">
                      <h5>Lấy lại mật khẩu</h5>
                      <p>Bạn quên mật khẩu đúng không?</p>
                    </div>
                    <div className="table-item-right">
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {show === "fullName" && (
          <div className="overplay">
            <div className="form-group overplay-item">
              <div className="button-back" onClick={() => handleShow("")}>
                <i className="fa-solid fa-xmark"></i>
              </div>
              <h3>Cập nhật tên của bạn</h3>
              <p>
                Tên của bạn sẽ được hiển thị trên trang cá nhân, trong các bình
                luận hoặc sự kiện bạn tham gia.
              </p>
              <input
                className="form-control"
                placeholder="Nhập họ và tên của bạn"
                value={userData.fullName}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, fullName: e.target.value }))
                }
              />
              <div className="btn" onClick={handlePush}>
                Lưu lại
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Settings;
