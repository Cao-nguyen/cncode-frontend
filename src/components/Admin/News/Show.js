import React, { useEffect, useState } from "react";
import { marked } from "marked";
import { ShowNew } from "../../../services/NewsAdminServer";
import moment from "moment";
import "./News.scss";
import { useNavigate, useParams } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import logo from "../../../assets/logo.png";

function Show(props) {
  const { id } = useParams();

  const nagivate = useNavigate();

  const [news, setNews] = useState([]);
  const [currentNews, setCurrentNews] = useState({});

  useEffect(() => {
    const newsData = async () => {
      const data = await ShowNew();
      setNews(data.DT);
    };

    newsData();
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      const selectedNews = news.find((item) => item._id === id);
      setCurrentNews(selectedNews || null);
    }
  }, [id, news]);

  const handleBack = () => {
    nagivate(-1);
  };

  return (
    <div className="admin">
      <HelmetProvider>
        <Helmet>
          <title>CNcode | {`${currentNews.title}`}</title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <div className="header-create">
        <i className="fa-solid fa-arrow-left" onClick={handleBack}></i>
      </div>
      <div className="admin-show mt-3">
        {currentNews ? (
          <>
            <h3 className="text-center text-primary">{currentNews.title}</h3>
            <div className="gird-text mt-2">
              <p>Tác giả: {currentNews?.authorId?.fullName}</p>
              <p>
                Hiển thị: {currentNews.show ? "Công khai" : "Không công khai"}
              </p>
              <p>
                Trạng thái: {currentNews.isChecked ? "Phát hành" : "Bản nháp"}
              </p>
              <p>
                Đăng ngày: {moment(currentNews.createdAt).format("DD/MM/YYYY")}
              </p>
            </div>
            <div
              className="preview mt-2"
              dangerouslySetInnerHTML={{
                __html: marked(
                  (currentNews.content || "").replace(/\n/g, "  \n")
                ),
              }}
            ></div>
          </>
        ) : (
          <p className="text-center">Bài viết không tồn tại!</p>
        )}
      </div>
    </div>
  );
}

export default Show;
