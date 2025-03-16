import React, { useEffect, useState, useRef, useMemo } from "react";
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
import {
  CommentsClientCreate,
  CommentsClientDelete,
  CommentsClientDeleteReply,
  CommentsClientLove,
  CommentsClientRead,
  CommentsClientUnlove,
} from "../../../services/CommentClientServer";
import socket from "../../Service/socket";
import { toast } from "react-toastify";

function TintucRead(props) {
  const { slug } = useParams();
  const [currentNews, setCurrentNews] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fullName = useSelector((state) => state.user.account.fullName);
  const userId = useSelector((state) => state.user.account.id);

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

      console.log(imageUrl);

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

  const handleLove = async () => {
    if (fullName === "") {
      window.alert("Vui lòng đăng nhập để thả tim cho tin tức");
      return;
    }

    setCurrentNews((prev) => ({
      ...prev,
      emotion: [...prev.emotion, { name: fullName }],
    }));

    const data = await NewsLike(fullName, slug);
    if (data && data.EC === 0) {
      refetch();
    }
  };

  const handleUnlove = async () => {
    setCurrentNews((prev) => ({
      ...prev,
      emotion: prev.emotion.filter((e) => e.name !== fullName),
    }));

    const data = await NewsUnlike(fullName, slug);
    if (data && data.EC === 0) {
      refetch();
    }
  };

  const [chat, setChat] = useState();
  const [report, setReport] = useState(false);
  const [comment, setComment] = useState([]);
  const [tagName, setTagName] = useState(null);
  const [idChat, setIdChat] = useState();
  const inputRef = useRef(null);

  const handleToggle = (id) => {
    setReport((prev) => (prev === id ? null : id));
  };

  const handleTagName = (name, id) => {
    setTagName(name);
    setChat(`@${name}: `);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIdChat(id);
  };

  const handlePushComment = async () => {
    await CommentsClientCreate(userId, chat, slug, tagName, idChat);
    setChat("");
  };

  const handleUnLogin = async () => {
    window.alert("Bạn cần đăng nhập để bình luận");
    setChat("");
  };

  const handleUnLoginLove = async () => {
    window.alert("Bạn cần đăng nhập để thả tim bình luận");
  };

  useEffect(() => {
    const getdata = async () => {
      const data = await CommentsClientRead(slug);

      if (data && data.EC === 0) {
        setComment(data.DT);
      }
    };

    getdata();

    socket.on("pushComment", () => {
      getdata();
    });

    socket.on("pushCommentReply", () => {
      getdata();
    });

    socket.on("chatDelete", () => {
      getdata();
    });

    socket.on("chatDeleteReply", () => {
      getdata();
    });

    socket.on("like", () => {
      getdata();
    });

    socket.on("unlike", () => {
      getdata();
    });

    return () => {
      socket.off("pushComment");
      socket.off("pushCommentReply");
      socket.off("chatDelete");
      socket.off("chatDeleteReply");
      socket.off("like");
      socket.off("unlike");
    };
  }, [slug]);

  useEffect(() => {
    const closeMenu = () => setReport(!report);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [report]);

  const handleDelete = async (id) => {
    const data = await CommentsClientDelete(id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
  };

  const handleDeleteReply = async (idMain, id) => {
    const data = await CommentsClientDeleteReply(idMain, id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
  };

  const handleLoveComment = async (idMain, id) => {
    await CommentsClientLove(idMain, id, fullName);
  };

  const handleUnloveComment = async (idMain, id) => {
    await CommentsClientUnlove(idMain, id, fullName);
  };

  const countTotalComments = () => {
    let totalComments = comment.length;

    // Đếm tổng số trả lời trong mỗi bình luận
    comment.forEach((comment) => {
      totalComments += comment.replies ? comment.replies.length : 0;
    });

    return totalComments;
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
                  {currentNews.emotion.some(
                    (emotion) => emotion.name === fullName
                  ) ? (
                    <p onClick={handleUnlove}>
                      <i className="fa-solid fa-heart"></i>
                      {currentNews.emotion.length}
                    </p>
                  ) : (
                    <p onClick={handleLove}>
                      <i className="fa-regular fa-heart"></i>
                      {currentNews.emotion.length}
                    </p>
                  )}
                  <p
                    data-bs-toggle="offcanvas"
                    data-bs-target="#commentOffcanvas"
                  >
                    <i className="fa-regular fa-comment comments"></i>
                    {countTotalComments()}
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

      <div
        className="offcanvas offcanvas-end"
        id="commentOffcanvas"
        tabIndex="-1"
        aria-labelledby="offcanvasRightLabel"
        style={{ width: "500px" }}
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Bình luận</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="commentMain">
            {comment &&
              comment.map((item, index) => (
                <>
                  <div className="chat-main" key={index}>
                    <img src={logo} alt=""></img>
                    <div className="comment-info">
                      <div className="info">
                        <p>{item.userId.fullName}</p>
                        <i
                          className="fa-solid fa-ellipsis"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggle(item._id);
                          }}
                        ></i>
                        {report === item._id && (
                          <div className="report">
                            {(currentNews.authorId.fullName === fullName ||
                              item.userId?.fullName === fullName) && (
                              <div
                                className="report-item"
                                onClick={() => handleDelete(item._id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                                <p className="delete">Xoá bình luận</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="info-chat">{item.comment}</p>
                      <div className="action">
                        <p className="time">
                          {moment(item.createdAt).format("DD - MM - YYYY")}
                        </p>
                        <div className="action-likes">
                          {item.likes.some(
                            (like) => like.userId.fullName === fullName
                          ) ? (
                            <i
                              className="fa-solid fa-heart"
                              onClick={() => handleUnloveComment(item._id)}
                            ></i>
                          ) : (
                            <i
                              className="fa-regular fa-heart"
                              onClick={
                                !fullName
                                  ? handleUnLoginLove
                                  : () => handleLoveComment(item._id)
                              }
                            ></i>
                          )}
                          <p>{item.likes.length}</p>
                        </div>
                        <p
                          className="reply"
                          onClick={() =>
                            handleTagName(item.userId.fullName, item._id)
                          }
                        >
                          Trả lời
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="commentMainReply">
                    {item.replies &&
                      item.replies.map((item_child, index_child) => (
                        <div className="chat-main" key={index_child}>
                          <img src={logo} alt=""></img>
                          <div className="comment-info">
                            <div className="info">
                              <p>{item_child.userId.fullName}</p>
                              <i
                                className="fa-solid fa-ellipsis"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggle(item_child._id);
                                }}
                              ></i>
                              {report === item_child._id && (
                                <div className="report">
                                  {(currentNews.authorId.fullName ===
                                    fullName ||
                                    item_child.userId.fullName ===
                                      fullName) && (
                                    <div
                                      className="report-item"
                                      onClick={() =>
                                        handleDeleteReply(
                                          item._id,
                                          item_child._id
                                        )
                                      }
                                    >
                                      <i className="fa-solid fa-trash"></i>
                                      <p className="delete">Xoá bình luận</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            <p className="info-chat">{item_child.comment}</p>
                            <div className="action">
                              <p className="time">
                                {moment(item_child.createdAt).format(
                                  "DD - MM - YYYY"
                                )}
                              </p>
                              <div className="action-likes">
                                {item_child.likes.some(
                                  (like) => like.userId.fullName === fullName
                                ) ? (
                                  <i
                                    className="fa-solid fa-heart"
                                    onClick={() =>
                                      handleUnloveComment(
                                        item._id,
                                        item_child._id
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    className="fa-regular fa-heart"
                                    onClick={
                                      !fullName
                                        ? handleUnLoginLove
                                        : () =>
                                            handleLoveComment(
                                              item._id,
                                              item_child._id
                                            )
                                    }
                                  ></i>
                                )}
                                <p>{item_child.likes.length}</p>
                              </div>
                              <p
                                className="reply"
                                onClick={() =>
                                  handleTagName(
                                    item_child.userId.fullName,
                                    item._id
                                  )
                                }
                              >
                                Trả lời
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              ))}
          </div>
          <div className="commentBot">
            <div className="grid2 form-group">
              <input
                ref={inputRef}
                className="form-control"
                placeholder="Thêm bình luận..."
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePushComment();
                  }
                }}
              ></input>
              {chat ? (
                <h6
                  className="active"
                  onClick={!fullName ? handleUnLogin : handlePushComment}
                >
                  Đăng
                </h6>
              ) : (
                <h6 className="">Đăng</h6>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TintucRead;
