import React from "react";
import logo from "../../../assets/logo.png";
import "./Settings.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SettingsClientMiddleware from "../../../middlewares/SettingsClientMiddleware";

function Settings() {
  const {
    active,
    handleBack,
    handleTop,
    handleBot,
    fullName,
    setFullName,
    username,
    setUsername,
    info,
    setInfo,
    birthday,
    day,
    setDay,
    month,
    setMonth,
    year,
    setYear,
    tinh,
    setTinh,
    school,
    setSchool,
    avatar,
    setAvatar,
    web,
    setWeb,
    git,
    setGit,
    zalo,
    setZalo,
    facebook,
    setFacebook,
    tiktok,
    setTiktok,
    youtube,
    setYoutube,
    show,
    handleShowFullName,
    handleFullName,
    handleShowUsername,
    handleUsername,
    handleShowInfo,
    handleInfo,
    handleShowBirthday,
    handleBirthday,
    handleShowTinh,
    handleTinh,
    handleShowSchool,
    handleSchool,
    handleShowAvatar,
    handleAvatar,
    handleBackOver,
  } = SettingsClientMiddleware();

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
                <div className="table-item" onClick={handleShowFullName}>
                  <div className="table-item-left">
                    <h5>Họ và tên</h5>
                    <p>{fullName ? fullName : "Chưa cập nhật"}</p>
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>

                <div className="table-item" onClick={handleShowUsername}>
                  <div className="table-item-left">
                    <h5>Tên đăng nhập</h5>
                    <p>{username ? username : "Chưa cập nhật"}</p>
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>

                <div className="table-item" onClick={handleShowInfo}>
                  <div className="table-item-left">
                    <h5>Giới thiệu</h5>
                    <p>{info ? info : "Chưa cập nhật"}</p>
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>

                <div className="table-item" onClick={handleShowBirthday}>
                  <div className="table-item-left">
                    <h5>Ngày, tháng, năm sinh</h5>
                    <p>{birthday ? birthday : "Chưa cập nhật"}</p>
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>

                <div className="table-item" onClick={handleShowTinh}>
                  <div className="table-item-left">
                    <h5>Tỉnh thành</h5>
                    <p>{tinh ? tinh : "Chưa cập nhật"}</p>
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>

                <div className="table-item" onClick={handleShowSchool}>
                  <div className="table-item-left">
                    <h5>Đơn vị học tập & làm việc</h5>
                    <p>{school ? school : "Chưa cập nhật"}</p>
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>

                <div className="table-item" onClick={handleShowAvatar}>
                  <div className="table-item-left">
                    <h5>Ảnh đại diện</h5>
                    <img src={avatar ? avatar : logo} alt="Avatar" />
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
                <div className="table-item">
                  <div className="table-item-left">
                    <h5>Trang web cá nhân</h5>
                    <p>{web ? web : "Chưa cập nhật"}</p>
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>

                <div className="table-item">
                  <div className="table-item-left">
                    <h5>Github</h5>
                    <p>{git ? git : "Chưa cập nhật"}</p>
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>

                <div className="table-item">
                  <div className="table-item-left">
                    <h5>Zalo</h5>
                    <p>{zalo ? zalo : "Chưa cập nhật"}</p>
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>

                <div className="table-item">
                  <div className="table-item-left">
                    <h5>Facebook</h5>
                    <p>{facebook ? facebook : "Chưa cập nhật"}</p>
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>

                <div className="table-item">
                  <div className="table-item-left">
                    <h5>Tiktok</h5>
                    <p>{tiktok ? tiktok : "Chưa cập nhật"}</p>
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>

                <div className="table-item">
                  <div className="table-item-left">
                    <h5>Youtube</h5>
                    <p>{youtube ? youtube : "Chưa cập nhật"}</p>
                  </div>
                  <div className="table-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>
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
                      <p>Lần đổi gần nhất:</p>
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
              <div className="button-back" onClick={handleBackOver}>
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <div className="btn" onClick={handleFullName}>
                Lưu lại
              </div>
            </div>
          </div>
        )}

        {show === "username" && (
          <div className="overplay">
            <div className="form-group overplay-item">
              <div className="button-back" onClick={handleBackOver}>
                <i className="fa-solid fa-xmark"></i>
              </div>
              <h3>Cập nhật tên đăng nhập của bạn</h3>
              <p>
                Tên đăng nhập dùng để bạn đăng nhập vào hệ thống và xem trang cá
                nhân.
              </p>
              <input
                className="form-control"
                placeholder="Nhập tên đăng nhập của bạn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="btn" onClick={handleUsername}>
                Lưu lại
              </div>
              <p
                className="mt-2"
                style={{ fontSize: "14px", textAlign: "left" }}
              >
                Bạn sẽ không thể truy cập vào link cũ nếu thay đổi tên đăng nhập
                và bạn sẽ truy cập bằng link mới: https://cncode.vercel.app/
                {username}
              </p>
            </div>
          </div>
        )}

        {show === "info" && (
          <div className="overplay">
            <div className="form-group overplay-item">
              <div className="button-back" onClick={handleBackOver}>
                <i className="fa-solid fa-xmark"></i>
              </div>
              <h3>Cập nhật giới thiệu của bạn</h3>
              <p>
                Phần giới thiệu sẽ được hiển thị trên cá nhân, giúp người khác
                hiểu bạn hơn.
              </p>
              <textarea
                className="form-control"
                placeholder="Nhập phần giới thiệu"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
              <div className="btn" onClick={handleInfo}>
                Lưu lại
              </div>
            </div>
          </div>
        )}

        {show === "birthday" && (
          <div className="overplay">
            <div className="form-group overplay-item">
              <div className="button-back" onClick={handleBackOver}>
                <i className="fa-solid fa-xmark"></i>
              </div>
              <h3>Cập nhật ngày tháng năm sinh của bạn</h3>
              <p>
                Vui lòng cập nhật chính sát để chúng tôi có thể thống kê độ tuổi
                và cung cấp khoá học phù hợp nhất.
              </p>
              <div className="row">
                <div className="col-4">
                  <input
                    className="form-control"
                    placeholder="Ngày sinh*"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <input
                    className="form-control"
                    placeholder="Tháng sinh*"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <input
                    className="form-control"
                    placeholder="Năm sinh*"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
              </div>
              <div className="btn" onClick={handleBirthday}>
                Lưu lại
              </div>
            </div>
          </div>
        )}

        {show === "tinh" && (
          <div className="overplay">
            <div className="form-group overplay-item">
              <div className="button-back" onClick={handleBackOver}>
                <i className="fa-solid fa-xmark"></i>
              </div>
              <h3>Cập nhật tỉnh của bạn</h3>
              <p>Chúng ta sẽ biết bạn ở đâu và cung cấp dịch vụ cho bạn.</p>
              <input
                className="form-control"
                placeholder="Tỉnh thành*"
                value={tinh}
                onChange={(e) => setTinh(e.target.value)}
              />
              <div className="btn" onClick={handleTinh}>
                Lưu lại
              </div>
            </div>
          </div>
        )}

        {show === "school" && (
          <div className="overplay">
            <div className="form-group overplay-item">
              <div className="button-back" onClick={handleBackOver}>
                <i className="fa-solid fa-xmark"></i>
              </div>
              <h3>Cập nhật nơi học tập hoặc làm việc của bạn</h3>
              <p>
                Hãy chia sẽ với chúng tôi nơi bạn đang học tập hoặc làm việc
                nhé!.
              </p>
              <input
                className="form-control"
                placeholder="Đơn vị công tác*"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
              <div className="btn" onClick={handleSchool}>
                Lưu lại
              </div>
            </div>
          </div>
        )}

        {show === "avatar" && (
          <div className="overplay">
            <div className="form-group overplay-item">
              <div className="button-back" onClick={handleBackOver}>
                <i className="fa-solid fa-xmark"></i>
              </div>
              <h3>Cập nhật giới thiệu của bạn</h3>
              <p>
                Phần giới thiệu sẽ được hiển thị trên cá nhân, giúp người khác
                hiểu bạn hơn.
              </p>
              <textarea
                className="form-control"
                placeholder="Nhập phần giới thiệu"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
              <div className="btn" onClick={handleInfo}>
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
