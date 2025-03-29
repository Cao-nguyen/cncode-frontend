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
import { CommentsClientNewsCreate } from "../../../services/CommentClientServer";

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
  const inputRef = useRef(null);

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

    socket.on("pushComment", (data) => {
      setCurrentNews(data);
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

  const [content, setContent] = useState();
  const [replyContent, setReplyContent] = useState();

  const [currentId, setCurrentId] = useState();
  const [showReply, setShowReply] = useState(false);

  const handleComment = async () => {
    if (!id) {
      toast.error("Bạn cần đăng nhập để có thể bình luận!");
      setContent("");
      setReplyContent("");
      return;
    }

    if (!currentId) {
      if (!content) {
        toast.error("Bạn chưa nhập bình luận!");
        return;
      }
    } else {
      if (!replyContent) {
        toast.error("Bạn chưa nhập bình luận!");
        return;
      }
    }

    const data = await CommentsClientNewsCreate(
      id,
      currentId,
      idPost,
      content,
      replyContent
    );
    if (data && data.EC === 0) {
      setContent("");
      setShowReply(false);
    } else {
      toast.error(data.EM);
    }
  };

  const handleShowReply = (f, idComment) => {
    if (f) {
      const mention = `@${f}: `;
      setReplyContent(mention);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(mention.length, mention.length);
        }
      }, 0);
    }

    if (idComment) {
      setCurrentId(idComment);
    }

    setShowReply(!showReply);
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
                    {currentNews?.comments.length}
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
                <div className="comment mt-2" ref={divRef}>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Viết bình luận của bạn*"
                      style={{ height: "80px", resize: "none" }}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />

                    <div
                      className="btn btn-primary mt-2"
                      style={{ color: "var(--mau-trang)" }}
                      onClick={handleComment}
                    >
                      <i className="fa-solid fa-paper-plane"></i> Gửi bình luận
                    </div>
                  </div>
                  {currentNews?.comments
                    ?.filter((comment) => comment.parrentId === null)
                    .map((item, index) => (
                      <>
                        <div className="comment-item" key={index}>
                          <div className="info">
                            <img src={item?.userComment?.avatar} alt=""></img>
                            <div className="content">
                              <p>{item?.userComment?.fullName}</p>
                              <span
                                style={{
                                  whiteSpace: "pre-line",
                                  textAlign: "justify",
                                }}
                              >
                                {item?.comment}
                              </span>
                              <div className="action">
                                <span>
                                  {moment(item?.commentedAt).format(
                                    "DD - MM - YYYY"
                                  )}
                                </span>
                                <span
                                  className="action-item"
                                  style={{ fontWeight: "bold" }}
                                  onClick={() =>
                                    handleShowReply(
                                      item?.userComment?.fullName,
                                      item?._id
                                    )
                                  }
                                >
                                  Trả lời
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="comment-reply">
                          {showReply && (
                            <div className="form-group mx-2 mt-2">
                              <textarea
                                className="form-control"
                                placeholder="Viết bình luận của bạn*"
                                style={{ height: "80px", resize: "none" }}
                                value={replyContent}
                                onChange={(e) =>
                                  setReplyContent(e.target.value)
                                }
                                ref={inputRef}
                              />

                              <div
                                className="btn btn-primary mt-2"
                                style={{ color: "var(--mau-trang)" }}
                                onClick={() => handleComment()}
                              >
                                <i className="fa-solid fa-paper-plane"></i> Gửi
                                bình luận
                              </div>
                            </div>
                          )}

                          {currentNews?.comments
                            ?.filter(
                              (comment) => comment.parrentId === item._id
                            )
                            .map((reply) => (
                              <div
                                className="comment-reply-item"
                                key={reply._id}
                              >
                                <div className="info">
                                  <img
                                    src={reply?.userComment?.avatar}
                                    alt=""
                                  ></img>
                                  <div className="content">
                                    <p>{reply?.userComment?.fullName}</p>
                                    <span
                                      style={{
                                        whiteSpace: "pre-line",
                                        textAlign: "justify",
                                      }}
                                    >
                                      {reply?.comment}
                                    </span>
                                    <div className="action">
                                      <span>
                                        {moment(reply?.commentedAt).format(
                                          "DD - MM - YYYY"
                                        )}
                                      </span>
                                      <span
                                        className="action-item"
                                        style={{ fontWeight: "bold" }}
                                        onClick={() =>
                                          handleShowReply(
                                            reply?.userComment?.fullName,
                                            item?._id
                                          )
                                        }
                                      >
                                        Trả lời
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </>
                    ))}
                </div>
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
