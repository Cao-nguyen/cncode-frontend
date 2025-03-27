import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  ShowNewClient,
  NewsLike,
  NewsUnlike,
} from "../../../services/NewsClientServer";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Tintuc.scss";
import { HelmetProvider, Helmet } from "react-helmet-async";
import logo from "../../../assets/logo.png";
import socket from "../../Service/socket";
import { toast } from "react-toastify";

function TintucRead(props) {
  const { slug } = useParams();
  const [currentNews, setCurrentNews] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const id = useSelector((state) => state.user.account.id);

  const { data: news, refetch } = useQuery({
    queryKey: ["news"],
    queryFn: ShowNewClient,
  });

  useEffect(() => {
    if (news?.DT?.length > 0) {
      const selectedNews = news.DT.find((item) => item.slug === slug);
      setCurrentNews(selectedNews || null);
      setIsVisible(true);
    }
  }, [slug, news]);

  const inforHtml = useMemo(() => {
    if (!currentNews?.content) return "";

    let imgIndex = 0;
    const renderer = new marked.Renderer();

    renderer.image = (href, title, text) => {
      imgIndex++;

      let imageUrl = typeof href === "string" ? href : href?.href || "";

      return `<div class="img-wrapper" onClick="window.openImage('${imageUrl}')">
          <img src="${imageUrl}" alt="${text}" class="img${imgIndex}" />
        </div>`;
    };

    const html = marked(currentNews?.content, { renderer });

    return html;
  }, [currentNews]);

  useEffect(() => {
    window.openImage = (src) => setSelectedImage(src);
  }, []);

  const divRef = useRef(null);
  const handleScroll = () => {
    divRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [liked, setLiked] = useState();

  useEffect(() => {
    socket.on("pushLike", (data) => {
      refetch();
      setLiked(data?.like?.some((like) => like?.userLike?._id === id));
    });

    socket.on("pushUnlike", (data) => {
      refetch();
      setLiked(data?.like?.some((like) => like?.userLike?._id === id));
    });

    return () => {
      socket.off("pushLike");
      socket.off("pushUnlike");
    };
  }, [id, refetch]);

  useEffect(() => {
    setLiked(currentNews?.like?.some((like) => like?.userLike?._id === id));
  }, [currentNews, id]);

  const idPost = currentNews?._id;
  const handleLike = async () => {
    await NewsLike(id, idPost);
  };

  const handleUnLike = async () => {
    await NewsUnlike(id, idPost);
  };

  return (
    <div className="container">
      {currentNews && (
        <>
          <HelmetProvider>
            <Helmet>
              <title>{currentNews.title} </title>
              <meta
                name="description"
                content="Nền tảng học công nghệ thông tin online"
              />
              <link rel="canonical" href="https://cncode.vercel.app" />
              <link rel="icon" href={logo} />
            </Helmet>
          </HelmetProvider>
          <div className={`show_tintuc fade-on ${isVisible ? "visible" : ""}`}>
            <div className="show_tintuc_item">
              <h3>{currentNews.title}</h3>
              <p className="description">{currentNews.description}</p>
              <div className="tintuc_grid">
                <div className="tintuc_grid_2">
                  {!liked ? (
                    <p onClick={handleLike}>
                      <i className="fa-regular fa-heart"></i>
                      {currentNews?.like?.length}
                    </p>
                  ) : (
                    <p onClick={handleUnLike}>
                      <i className="fa-solid fa-heart"></i>
                      {currentNews?.like?.length}
                    </p>
                  )}
                  <p onClick={handleScroll}>
                    <i className="fa-regular fa-comment comments"></i>
                  </p>
                </div>
                <p>Người đăng: {currentNews?.authorId?.fullName}</p>
                <p>
                  <i className="fa-solid fa-calendar-days"></i>
                  Ngày đăng:{" "}
                  {moment(currentNews.createdAt).format(
                    "DD/MM/YYYY - HH:mm:ss"
                  )}
                </p>
              </div>
            </div>
            <div className="show_content">
              <div className="preview show_content_item mt-2">
                <div
                  className={`preview fade-in ${isVisible ? "visible" : ""}`}
                  dangerouslySetInnerHTML={{ __html: inforHtml }}
                ></div>
                <h3>Bình luận</h3>
                <div className="comment" ref={divRef}></div>
              </div>
            </div>

            {selectedImage && (
              <div
                className="image-viewer"
                onClick={() => setSelectedImage(null)}
              >
                <div className="image-content">
                  <img src={selectedImage} alt="Preview" />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TintucRead;
