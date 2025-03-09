import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import bg from "../../../assets/bg.png";
import logo from "../../../assets/logo.png";
import xu from "../../../assets/Khac/xu.png";
import chuoi from "../../../assets/Khac/streak.png";
import "./Profile.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  PostClientRead,
  ProfileClientRead,
} from "../../../services/ProfileClientServer";
import moment from "moment/moment";

function Profile() {
  const { username } = useParams();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [user, setUser] = useState();
  const [course, setCourse] = useState();
  const [follow, setFollow] = useState([]);
  const [huyhieu, setHuyhieu] = useState();
  const [item, setItem] = useState();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await ProfileClientRead(username);

      if (data && data.EC === 0) {
        setUser(data.DT.user);
        setCourse(data.DT.courses);
        setFollow(data.DT.follows.follow);
        setHuyhieu(data.DT.huyhieu);
        setItem(data.DT.items);
      }
    };

    getData();
  }, [username]);

  useEffect(() => {
    const getPost = async () => {
      const data = await PostClientRead(user?.username);

      if (data && data.EC === 0) {
        setNews(data.DT);
      }
    };

    getPost();
  }, [user]);

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
        </Helmet>
      </HelmetProvider>
      {user ? (
        <div className="html-profile">
          <div className="background-profile">
            <p onClick={handleBack}>
              <i class="fa-solid fa-arrow-left"></i>
              Trở về
            </p>
            <img src={bg} alt=""></img>
          </div>
          <div className="profile">
            <div className="profile-main">
              <div className="infor-profile">
                <img src={user?.avatar} alt=""></img>
                <div className="infor-item">
                  <h4>
                    {user?.fullName} ({`@${user?.username}`})
                  </h4>
                  <div className="infor-item-action">
                    <p>
                      {Array.isArray(follow) && follow.length > 0
                        ? `${follow.length} người theo dõi`
                        : "Chưa có người theo dõi"}
                    </p>
                    <div className="btn btn-primary">
                      <p>
                        <i className="fa-solid fa-plus"></i>
                        Theo dõi trang cá nhân
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body-profile">
            <div className="body-profile-right">
              <h4>Giới thiệu</h4>
              <p className="mota">Học tập làm cốt</p>

              <h4>Mạng xã hội</h4>
              <p className="mota">Học tập làm cốt</p>

              <h4>Chuỗi học tập</h4>
              <p>
                Bạn đã giữ được: 100
                <img src={chuoi} alt="" />
              </p>

              <h4>Điểm thành viên</h4>
              <p>Bạn hiện có: 100 điểm - Cấp: 1</p>

              <h4>Ngân sách cá nhân</h4>
              <p>
                Bạn hiện có: {user?.coins}
                <img src={xu} alt="" />
              </p>

              <h4>Kho vật phẩm</h4>
              <p>
                Bạn hiện có: 100
                <img src={xu} alt="" />
              </p>

              <h4>Các khoá học đã tham gia</h4>
              <p>
                Bạn hiện có: 100
                <img src={xu} alt="" />
              </p>
            </div>
            <div className="body-profile-left">
              <div className="body-profile-left-top">
                <h4>Ngân hà thành tựu</h4>
                <div className="post">
                  {Array.isArray(huyhieu) && huyhieu.length > 0 ? (
                    huyhieu.map((item, index) => (
                      <div key={index} className="post-item">
                        <img src={logo} alt="" />
                      </div>
                    ))
                  ) : (
                    <p>Không có huy hiệu nào</p>
                  )}
                </div>
              </div>
              <div className="body-profile-left-bot">
                <h4>Bài viết</h4>
                {news &&
                  news.map((item, index) => (
                    <div className="newspost" key={index}>
                      <p className="time">
                        {moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                      </p>
                      <Link to={`/tintuc/${item.slug}`}>
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="html-profile">
          <div className="background-profile">
            <p onClick={handleBack}>
              <i class="fa-solid fa-arrow-left"></i>
              Trở về
            </p>
            <img src={bg} alt=""></img>
          </div>
          <div className="profile">
            <div className="profile-main">
              <div className="infor-profile">
                <img src={user?.avatar} alt=""></img>
                <div className="infor-item">
                  <h4>Đang tải dữ liệu...</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="body-profile">
            <div className="body-profile-right"></div>
            <div className="body-profile-left">
              <div className="body-profile-left-top"></div>
              <div className="body-profile-left-bot"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
