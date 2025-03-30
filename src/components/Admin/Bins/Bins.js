import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import {
  BinsBlog,
  BinsNews,
  DeleteBinsBlog,
  DeleteBinsNews,
  PatchBinsBlog,
  PatchBinsNews,
} from "../../../services/BinsAdminServer";
import moment from "moment/moment";
import "./Bins.scss";
import { toast } from "react-toastify";
import { HelmetProvider, Helmet } from "react-helmet-async";

function Bins(props) {
  const [news, setNews] = useState([]);
  const [blog, setBlog] = useState([]);

  const getData = async () => {
    const data = await BinsNews();

    setNews(data.DT);
  };

  const getBlog = async () => {
    const data = await BinsBlog();

    setBlog(data.DT);
  };

  useEffect(() => {
    getData();
    getBlog();
  }, []);

  const handlePatchNews = async (id) => {
    const data = await PatchBinsNews(id);

    if (data && data.EC === 0) {
      getData();
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
  };

  const handlePatchBlog = async (id) => {
    const data = await PatchBinsBlog(id);

    if (data && data.EC === 0) {
      getBlog();
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
  };

  const handleDeleteNews = async (id) => {
    const check = window.confirm("Bạn có chắc chắn muốn xoá vĩnh viễn");
    if (check === true) {
      const data = await DeleteBinsNews(id);

      if (data && data.EC === 0) {
        getData();
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    }
  };

  const handleDeleteBlog = async (id) => {
    const check = window.confirm("Bạn có chắc chắn muốn xoá vĩnh viễn");
    if (check === true) {
      const data = await DeleteBinsBlog(id);

      if (data && data.EC === 0) {
        getBlog();
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Thùng rác </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <div className="admin">
        {news.length === 0 ? (
          <p className="text-center">Chưa có tin tức bị xoá </p>
        ) : (
          <h2>Tin tức đã bị xoá</h2>
        )}

        {news.map((item) => (
          <div className="bins_news">
            <p>{moment(item.createdAt).format("DD/MM/YYYY - HH:mm:ss")}</p>
            <div className="bins_news_item">
              <h4>{item.title}</h4>
              <div
                className="btn btn-primary"
                onClick={() => handlePatchNews(item._id)}
              >
                Khôi phục
              </div>
              <div
                className="btn btn-danger"
                onClick={() => handleDeleteNews(item._id)}
              >
                Xoá vĩnh viễn
              </div>
            </div>
          </div>
        ))}

        {blog.length === 0 ? (
          <p className="text-center">Chưa có blog bị xoá </p>
        ) : (
          <h2>Blog đã bị xoá</h2>
        )}

        {blog.map((item) => (
          <div className="bins_news">
            <p>{moment(item.createdAt).format("DD/MM/YYYY - HH:mm:ss")}</p>
            <div className="bins_news_item">
              <h4>{item.title}</h4>
              <div
                className="btn btn-primary"
                onClick={() => handlePatchBlog(item._id)}
              >
                Khôi phục
              </div>
              <div
                className="btn btn-danger"
                onClick={() => handleDeleteBlog(item._id)}
              >
                Xoá vĩnh viễn
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Bins;
