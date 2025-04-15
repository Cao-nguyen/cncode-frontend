import React, { useEffect, useRef, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./Diendan.scss";
import {
  ForumClientChat,
  ForumClientJoin,
  ForumClientOut,
  ForumClientPullLove,
  ForumClientPushLove,
  ForumClientRead,
} from "../../../services/ForumClientServer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import socket from "../../Service/socket";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

function Diendan(props) {
  const userId = useSelector((state) => state.user.account.id);

  const divRef = useRef(null);

  const [tab, setTab] = useState("");
  const [showOn, setShowOn] = useState("");
  const [newData, setNewData] = useState("");

  const [forum, setForum] = useState();
  const [chat, setChat] = useState();

  const getData = async () => {
    const data = await ForumClientRead();

    if (data && data.EC === 0) {
      setForum(data.DT);
    }
  };

  const handleShow = (id) => {
    const newForum = forum?.filter((f) => f._id === id)[0];
    const members = newForum?.member?.some((m) => m.member_id === userId);

    setNewData(id);

    if (members) {
      setShowOn("");
      setTab(id);
    } else {
      setShowOn(id);
    }
  };

  const handleExit = () => {
    setShowOn("");
  };

  const handleJoin = async () => {
    const data = await ForumClientJoin(showOn, userId);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShowOn("");
      setTab(data.DT._id);
    } else {
      toast.error(data.EM);
    }
  };

  const pushChat = async () => {
    const data = await ForumClientChat(tab, userId, chat);
    if (data && data.EC === 0) {
      setChat("");
    }
  };

  const handleOut = async (idGroup) => {
    const checked = window.confirm("Bạn có chắc chắn muốn thoát khỏi nhóm");

    if (checked) {
      const data = await ForumClientOut(idGroup, userId);
      if (data && data.EC === 0) {
        setTab("");
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    }
  };

  const textareaRef = useRef(null);

  const change = forum?.filter((f) => f._id === tab)[0];
  const newChange = change?.chat;

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [newChange]);

  const handlePushLove = async (idChat) => {
    await ForumClientPushLove(tab, idChat, userId);
  };
  const handlePullLove = async (idChat) => {
    await ForumClientPullLove(tab, idChat, userId);
  };

  useEffect(() => {
    getData();

    socket.on("pushChat", () => {
      getData();
    });

    socket.on("outGroup", () => {
      getData();
    });

    socket.on("addGroup", () => {
      getData();
    });

    socket.on("pushLove", () => {
      getData();
    });

    socket.on("pullLove", () => {
      getData();
    });

    return () => {
      socket.off("pushChat");
      socket.off("outGroup");
      socket.off("addGroup");
      socket.off("pushLove");
      socket.off("pullLove");
    };
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Diễn đàn </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>

      <div className="dien-dan pt-5">
        <div className="laptop">
          <div className="forum">
            <div className="forum-left">
              <h3>Diễn đàn hỗ trợ học tập</h3>
              {forum?.map((item) => (
                <div
                  className={`user ${tab === item._id ? "active" : ""}`}
                  onClick={() => handleShow(item._id)}
                >
                  <div className="user-avatar">
                    <img src={item?.avatar} alt="" />
                  </div>
                  <div className="user-info">
                    <p className="user-info-name">{item?.name}</p>
                    <span className="user-info-chat">{item?.description}</span>
                  </div>
                  <i
                    className="fa-solid fa-ellipsis"
                    onClick={() => handleOut(item._id)}
                  ></i>
                </div>
              ))}
            </div>
            {forum?.map((item) => (
              <div className="forum-right">
                {tab === item?._id && (
                  <>
                    <header>
                      <div className="user">
                        <div className="user-avatar">
                          <img src={item?.avatar} alt="" />
                        </div>
                        <div className="user-info">
                          <p className="user-info-name">{item?.name}</p>
                          <span className="user-info-chat">
                            <div className="user-info-chat-icon">
                              <i className="fa-solid fa-user"></i>
                            </div>
                            <div className="user-info-chat-content">
                              <span>
                                {item?.member?.length} thành viên đã tham gia
                              </span>
                            </div>
                          </span>
                        </div>
                      </div>
                    </header>
                    <div className="forum-body" ref={divRef}>
                      {item?.chat?.map((item) => (
                        <div className="forum-body-item">
                          <div className="forum-body-item-info">
                            <img src={item?.chat_id?.avatar} alt="" />
                          </div>
                          <div className="forum-body-item-content">
                            <div className="message-info">
                              <p>{item?.chat_id?.fullName}</p>
                              <p className="time">
                                {moment(item?.chat_time).fromNow() ===
                                "vài giây trước"
                                  ? "Vừa xong"
                                  : moment(item?.chat_time).fromNow()}
                              </p>
                              <div className="add-action">
                                <i className="fa-solid fa-ellipsis"></i>
                                <div className="action-dropdown">
                                  <div
                                    className="dropdown-item"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        item?.chat_content
                                      );
                                      toast.success(
                                        "Đã sao chép nội dung tin nhắn!"
                                      );
                                    }}
                                  >
                                    <i className="fa-solid fa-copy"></i>
                                    <span>Sao chép văn bản</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="message-chat">
                              <span>{item?.chat_content}</span>
                            </div>
                            <div className="message-action">
                              <p
                                className="action-love"
                                onClick={() => {
                                  !item?.chat_like?.some(
                                    (l) => l.like === userId
                                  )
                                    ? handlePushLove(item._id)
                                    : handlePullLove(item._id);
                                }}
                              >
                                <i
                                  className={
                                    item?.chat_like?.some(
                                      (l) => l.like === userId
                                    )
                                      ? "have fa-solid fa-heart"
                                      : "none fa-solid fa-heart"
                                  }
                                ></i>
                                <span
                                  className={`${
                                    item?.chat_like?.length > 0
                                      ? "have"
                                      : "none"
                                  }`}
                                >
                                  {item?.chat_like?.length}
                                </span>
                              </p>
                              <p
                                className="action-reply"
                                onClick={() => {
                                  setChat(`@${item?.chat_id?.fullName}: `);
                                }}
                              >
                                Trả lời
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="forum-bottom">
                      <div className="tool">
                        <i className="fa-solid fa-icons"></i>
                        <i className="fa-solid fa-square-poll-vertical"></i>
                      </div>
                      <div className="editor">
                        <textarea
                          ref={textareaRef}
                          disabled={!item?.allow_chat}
                          placeholder={
                            item?.allow_chat
                              ? "Nhập tin nhắn của bạn..."
                              : "Bạn chỉ có thể xem thông báo từ quản trị viên"
                          }
                          value={chat}
                          onChange={(e) => setChat(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              pushChat();
                            }
                          }}
                        ></textarea>
                        <i
                          style={{
                            color: chat
                              ? "var(--xanh-login)"
                              : "var(--xam-dam-hai)",
                          }}
                          class="fa-solid fa-paper-plane"
                          onClick={chat ? pushChat : () => setChat("")}
                        ></i>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {showOn && (
          <div className="forum-over">
            {forum
              ?.filter((f) => f._id === newData)
              .map((item) => (
                <>
                  <div className="over-form">
                    <h3>Bạn muốn tham gia nhóm?</h3>
                    <h5>Giới thiệu</h5>
                    <span>{item?.description}</span>
                    <h5>Luật nhóm</h5>
                    <span>{item?.forum_law}</span>
                    <span>
                      <span className="btn btn-danger" onClick={handleExit}>
                        Từ chối
                      </span>
                      <span>hoặc</span>
                      <span className="btn btn-primary" onClick={handleJoin}>
                        Tham gia
                      </span>
                    </span>
                  </div>
                </>
              ))}
          </div>
        )}

        <div className="phone">
          <div className="forum">
            <div className="forum-left">
              <h3>Diễn đàn hỗ trợ học tập</h3>
              {forum?.map((item) => (
                <div
                  className={`user ${tab === item._id ? "active" : ""}`}
                  onClick={() => handleShow(item._id)}
                >
                  <div className="user-avatar">
                    <img src={item?.avatar} alt="" />
                  </div>
                  <div className="user-info">
                    <p className="user-info-name">{item?.name}</p>
                    <span className="user-info-chat">{item?.description}</span>
                  </div>
                  <i
                    className="fa-solid fa-ellipsis"
                    onClick={() => handleOut(item._id)}
                  ></i>
                </div>
              ))}
            </div>

            {forum?.map((item) => (
              <div className="forum-right">
                {tab === item?._id && (
                  <>
                    <header>
                      <div className="user">
                        <div className="user-avatar">
                          <img src={item?.avatar} alt="" />
                        </div>
                        <div className="user-info">
                          <p className="user-info-name">{item?.name}</p>
                          <span className="user-info-chat">
                            <div className="user-info-chat-icon">
                              <i className="fa-solid fa-user"></i>
                            </div>
                            <div className="user-info-chat-content">
                              <span>
                                {item?.member?.length} thành viên đã tham gia
                              </span>
                            </div>
                          </span>
                        </div>
                      </div>
                      <div className="exit" onClick={() => setTab("")}>
                        <i class="fa-solid fa-right-from-bracket"></i> Thoát
                      </div>
                    </header>
                    <div className="forum-body" ref={divRef}>
                      {item?.chat?.map((item) => (
                        <div className="forum-body-item">
                          <div className="forum-body-item-info">
                            <img src={item?.chat_id?.avatar} alt="" />
                          </div>
                          <div className="forum-body-item-content">
                            <div className="message-info">
                              <p>{item?.chat_id?.fullName}</p>
                              <p className="time">
                                {moment(item?.chat_time).fromNow() ===
                                "vài giây trước"
                                  ? "Vừa xong"
                                  : moment(item?.chat_time).fromNow()}
                              </p>
                              <div className="add-action">
                                <i className="fa-solid fa-ellipsis"></i>
                                <div className="action-dropdown">
                                  <div
                                    className="dropdown-item"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        item?.chat_content
                                      );
                                      toast.success(
                                        "Đã sao chép nội dung tin nhắn!"
                                      );
                                    }}
                                  >
                                    <i className="fa-solid fa-copy"></i>
                                    <span>Sao chép văn bản</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="message-chat">
                              <span>{item?.chat_content}</span>
                            </div>
                            <div className="message-action">
                              <p
                                className="action-love"
                                onClick={() => {
                                  !item?.chat_like?.some(
                                    (l) => l.like === userId
                                  )
                                    ? handlePushLove(item._id)
                                    : handlePullLove(item._id);
                                }}
                              >
                                <i
                                  className={
                                    item?.chat_like?.some(
                                      (l) => l.like === userId
                                    )
                                      ? "have fa-solid fa-heart"
                                      : "none fa-solid fa-heart"
                                  }
                                ></i>
                                <span
                                  className={`${
                                    item?.chat_like?.length > 0
                                      ? "have"
                                      : "none"
                                  }`}
                                >
                                  {item?.chat_like?.length}
                                </span>
                              </p>
                              <p
                                className="action-reply"
                                onClick={() => {
                                  setChat(`@${item?.chat_id?.fullName}: `);
                                }}
                              >
                                Trả lời
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="forum-bottom">
                      <div className="tool">
                        <i className="fa-solid fa-icons"></i>
                        <i className="fa-solid fa-square-poll-vertical"></i>
                      </div>
                      <div className="editor">
                        <textarea
                          ref={textareaRef}
                          disabled={!item?.allow_chat}
                          placeholder={
                            item?.allow_chat
                              ? "Nhập tin nhắn của bạn..."
                              : "Bạn chỉ có thể xem thông báo từ quản trị viên"
                          }
                          value={chat}
                          onChange={(e) => setChat(e.target.value)}
                        ></textarea>
                        <i
                          style={{
                            color: chat
                              ? "var(--xanh-login)"
                              : "var(--xam-dam-hai)",
                          }}
                          className="fa-solid fa-paper-plane"
                          onClick={chat ? pushChat : () => setChat("")}
                        ></i>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Diendan;
