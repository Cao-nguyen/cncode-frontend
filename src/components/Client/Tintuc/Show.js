import React, { useEffect, useState, useRef } from "react";
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
  CommentsClientRead,
} from "../../../services/CommentClientServer";
import socket from "../../Service/socket";

function TintucRead(props) {
  const { slug } = useParams();
  const [currentNews, setCurrentNews] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const fullName = useSelector((state) => state.user.account.fullName);

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
    await CommentsClientCreate(fullName, chat, slug, tagName, idChat);
    setChat("");
  };

  useEffect(() => {
    const getdata = async () => {
      const data = await CommentsClientRead(slug);

      if (data && data.EC === 0) {
        setComment(data.DT);
      }
    };

    getdata();

    socket.on("pushComment", (newComment) => {
      setComment((prev) => [...prev, newComment]);
    });

    socket.on("pushCommentReply", () => {
      const getdata = async () => {
        const data = await CommentsClientRead(slug);

        if (data && data.EC === 0) {
          setComment(data.DT);
        }
      };

      getdata();
    });

    return () => {
      socket.off("pushComment");
      socket.off("pushCommentReply");
    };
  }, [slug]);

  useEffect(() => {
    const closeMenu = () => setReport(!report);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [report]);

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
                    {(comment?.length || 0) +
                      (comment[0]?.comments?.reply?.length || 0)}
                  </p>
                </div>
                <p>Người đăng: {currentNews.fullName}</p>
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
              <div
                className="preview show_content_item mt-2"
                dangerouslySetInnerHTML={{
                  __html: marked(
                    (currentNews.content || "").replace(/\n/g, "  \n")
                  ),
                }}
              ></div>
            </div>
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
                        <p>{item.comments.name}</p>
                        <i
                          className="fa-solid fa-ellipsis"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggle(item._id);
                          }}
                        ></i>
                        {report === item._id && (
                          <div className="report">
                            <div className="report-item">
                              <i className="fa-solid fa-flag"></i>
                              <p>Báo cáo</p>
                            </div>
                            {(currentNews.fullName === fullName ||
                              item.comments?.name === fullName) && (
                              <div className="report-item">
                                <i className="fa-solid fa-trash"></i>
                                <p className="delete">Xoá bình luận</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="info-chat">{item.comments.comment}</p>
                      <div className="action">
                        <p className="time">
                          {moment(item.comments.time).format("DD - MM - YYYY")}
                        </p>
                        <div className="action-likes">
                          <i className="fa-regular fa-heart"></i>
                          <p>0</p>
                        </div>
                        <p
                          className="reply"
                          onClick={() =>
                            handleTagName(item.comments.name, item._id)
                          }
                        >
                          Trả lời
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="commentMainReply">
                    {item.comments.reply &&
                      item.comments.reply.map((item_child, index_child) => (
                        <div className="chat-main" key={index_child}>
                          <img src={logo} alt=""></img>
                          <div className="comment-info">
                            <div className="info">
                              <p>{item_child.name}</p>
                              <i
                                className="fa-solid fa-ellipsis"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggle(item_child._id);
                                }}
                              ></i>
                              {report === item_child._id && (
                                <div className="report">
                                  <div className="report-item">
                                    <i className="fa-solid fa-flag"></i>
                                    <p>Báo cáo</p>
                                  </div>
                                  {(currentNews.fullName === fullName ||
                                    item_child.name === fullName) && (
                                    <div className="report-item">
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
                                {moment(item_child.time).format(
                                  "DD - MM - YYYY"
                                )}
                              </p>
                              <div className="action-likes">
                                <i className="fa-regular fa-heart"></i>
                                <p>0</p>
                              </div>
                              <p
                                className="reply"
                                onClick={() =>
                                  handleTagName(item_child.name, item._id)
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
                <h6 className="active" onClick={handlePushComment}>
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
