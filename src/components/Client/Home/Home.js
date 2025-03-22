import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { AccessRead } from "../../../services/AccessClientServer";
import socket from "../../Service/socket";
import "./Home.scss";
import { Link } from "react-router-dom";
import moment from "moment";
import { BlogReadHome, NewsReadHome } from "../../../services/HomeClientServer";

function Home(props) {
  const [totalAccess, setTotalAccess] = useState(0);
  const [online, setOnline] = useState(0);

  useEffect(() => {
    const data = async () => {
      const getData = await AccessRead();

      if (getData) {
        setTotalAccess(getData.DT.totalAccess);
        setOnline(getData.DT.online);
      }

      socket.on("updateData", (data) => {
        console.log(data);
        setOnline(data.online);
      });

      return () => {
        socket.off("updateData");
      };
    };

    data();
  }, []);

  const [blog, setBlog] = useState();
  const [news, setNews] = useState();

  useEffect(() => {
    const BlogReadData = async () => {
      const data = await BlogReadHome();

      if (data) {
        setBlog(data.DT);
      }
    };

    const NewsReadData = async () => {
      const data = await NewsReadHome();

      if (data) {
        setNews(data.DT);
      }
    };

    BlogReadData();
    NewsReadData();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Trang chủ </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>

      <div className="container">
        <div className="HomeBlog">
          <div className="HomeBlog-Title">
            <div className="Title-Border"></div>
            <h3 className="text-primary">Blog mới nhất</h3>
            <div className="Title-Border"></div>
          </div>
          <div className="HomeBlog-Body">
            <div className="blog">
              {blog &&
                blog.map((item, index) => (
                  <div className="blog-item" key={index}>
                    <Link to={item.slug}>
                      <img src={item.img} alt={item.title} />
                      <div className="date">
                        <p className="date-one">
                          {moment(item.createdAt).format("DD - MM")}
                        </p>
                        <p className="date-year">
                          {moment(item.createdAt).format("YYYY")}
                        </p>
                      </div>
                    </Link>
                    <div className="blog-content">
                      <Link to={item.slug}>
                        <p className="blog-title">{item.title}</p>
                        <p className="blog-description">{item.description}</p>
                      </Link>
                    </div>
                    <div className="blog-user">
                      <div className="blogUser-avatar">
                        <img
                          src={item?.authorId?.avatar}
                          alt={item?.authorId?.fullName}
                        ></img>
                      </div>
                      <div className="blogUser-fullName">
                        <p>{item?.authorId?.fullName}</p>
                        {item?.authorId?.role === "admin" && (
                          <p className="blogUser-role">Quản trị viên</p>
                        )}
                        {item?.authorId?.role === "user" && (
                          <p className="blogUser-role">Người dùng</p>
                        )}
                        {item?.authorId?.role === "teacher" && (
                          <p className="blogUser-role">Giáo viên</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="HomeWhy">
          <div className="HomeWhy-Title">
            <div className="Title-Border"></div>
            <h3 className="text-primary">Tại sao chọn CNcode?</h3>
            <div className="Title-Border"></div>
          </div>
          <div className="HomeWhy-Body">
            <div className="homewhy-item">
              <h3>1</h3>
              <p>
                Nền tảng học công nghệ thông tin với nhiều tính năng hiện đại.
              </p>
            </div>
            <div className="homewhy-item">
              <h3>2</h3>
              <p>Học qua video và tài liệu nhưng có tính tương tác cao.</p>
            </div>
            <div className="homewhy-item">
              <h3>3</h3>
              <p>Nhiều bài tập đa dạng, sự kiện hấp dẫn, có diễn đàn hỗ trợ.</p>
            </div>
            <div className="homewhy-item">
              <h3>4</h3>
              <p>
                Vừa học vừa chơi, tiết kiệm thời gian di chuyển ra trung tâm và
                tiền bạc.
              </p>
            </div>
          </div>
        </div>

        <div className="HomeNews">
          <div className="HomeNews-Title">
            <div className="Title-Border"></div>
            <h3 className="text-primary">Tin tức mới nhất</h3>
            <div className="Title-Border"></div>
          </div>
          <div className="HomeNews-Body">
            <div className="news">
              {news?.map((item) => (
                <div className="news-item" key={item._id}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="news-text">
                    <p>{item?.authorId?.fullName}</p>
                    <p>{moment(item.createdAt).format("DD/MM/YYYY")}</p>
                  </div>
                  <div className="btn btn-primary">
                    <Link to={`/tintuc/${item.slug}`}>Xem thêm</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h1 className="text-center mt-5 text-primary">
          Số lượt truy cập website là: {totalAccess}
        </h1>
        <h1 className="text-center mt-5 text-primary">
          Hiện tại có người đang dùng website là: {online}
        </h1>
      </div>
    </>
  );
}

export default Home;
