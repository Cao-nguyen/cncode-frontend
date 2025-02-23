import React, { useEffect, useState } from "react";
import { marked } from "marked";
import { ShowNew } from "../../../services/NewsAdminServer";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

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
      <div className="header-create">
        <i className="fa-solid fa-arrow-left" onClick={handleBack}></i>
      </div>
      <div className="admin-show mt-3">
        {currentNews ? (
          <>
            <h3 className="text-center text-primary">{currentNews.title}</h3>
            <div className="gird-text mt-2">
              <p>Tác giả: {currentNews.fullName}</p>
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
