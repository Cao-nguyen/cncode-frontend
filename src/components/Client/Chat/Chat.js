import React, { useEffect, useRef, useState } from "react";
import "./Chat.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ChatClientCreate,
  ChatClientDelete,
  ChatClientRead,
} from "../../../services/ChatClientServer";
import { toast } from "react-toastify";
import moment from "moment/moment";
import socket from "../../Service/socket";
import imgError from "../../../assets/Khac/errorImg.gif";

function Chat() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.account.id);
  const role = useSelector((state) => state.user.account.role);
  const [chat, setChat] = useState();
  const [message, setMessage] = useState();
  const [userActive, setUserActive] = useState();

  const chatRef = useRef(null);

  const handlePushChat = async (receivedId) => {
    if (!chat) {
      toast.error("Bạn chưa nhập tin nhắn!");
      return;
    }

    const data = await ChatClientCreate(id, receivedId, chat);

    if (data && data.EC === 0) {
      setChat("");
    } else {
      toast.error(data.EM);
    }
  };

  const getData = async () => {
    const data = await ChatClientRead();

    if (data && data.EC === 0) {
      setMessage(data.DT);
    }
  };

  const newMessage = message?.filter(
    (item, index, self) =>
      item?.sendId?._id === userActive &&
      self.findIndex((msg) => msg?.sendId?._id === item?.sendId?._id) === index
  );

  const adminMessage = message?.filter(
    (item, index, self) =>
      item?.sendId?._id !== id &&
      self.findIndex((msg) => msg?.sendId?._id === item?.sendId?._id) === index
  );

  const handleWin = async (id) => {
    const data = await ChatClientDelete(id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
  };

  useEffect(() => {
    getData();

    socket.on("pushChat", () => {
      getData();
    });

    socket.on("win", () => {
      getData();
    });

    return () => {
      socket.off("pushChat");
      socket.off("win");
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [message, newMessage, adminMessage]);

  return (
    <>
      {id ? (
        <div className="chatNguyen">
          <header>
            <div className="back" onClick={() => navigate(-1)}>
              Trở về
            </div>
          </header>
          {role === "admin" ? (
            <div className="chat-item">
              <div className="body-admin-chat">
                <div className="body-admin-left">
                  {adminMessage?.map((item) => (
                    <div
                      className={
                        item?.sendId?._id === userActive
                          ? "avatar active"
                          : "avatar"
                      }
                      onClick={() => setUserActive(item?.sendId?._id)}
                    >
                      <img src={item?.sendId?.avatar} alt=""></img>

                      <p>{item?.sendId?.fullName}</p>
                    </div>
                  ))}
                </div>
                <div className="body-admin-right">
                  {newMessage?.map((item) => (
                    <div className="admin-info-right">
                      <header>
                        <img src={item?.sendId?.avatar} alt="" />
                        <p>{item?.sendId?.fullName}</p>
                        <p
                          style={{
                            fontWeight: "normal",
                            color: "green",
                            cursor: "pointer",
                          }}
                          onClick={() => handleWin(item?.sendId?._id)}
                        >
                          Hoàn thành
                        </p>
                      </header>

                      <div className="body-chat">
                        <div className="chat-messages" ref={chatRef}>
                          {message?.map((item) => (
                            <>
                              {item?.receivedId?._id === userActive && (
                                <div className="message sent">
                                  <p className="sender">
                                    {item?.sendId?.fullName}
                                  </p>
                                  <p className="content">{item?.chat}</p>
                                  <p className="time">
                                    {moment(item?.createdAt).format(
                                      "HH:mm DD/MM/YYYY"
                                    )}
                                  </p>
                                </div>
                              )}

                              {item?.sendId?._id === userActive && (
                                <div className="message received">
                                  <p className="sender">
                                    {item?.sendId?.fullName}
                                  </p>
                                  <p className="content">{item?.chat}</p>
                                  <p className="time">
                                    {moment(item?.createdAt).format(
                                      "HH:mm DD/MM/YYYY"
                                    )}
                                  </p>
                                </div>
                              )}
                            </>
                          ))}
                        </div>

                        <div className="form-group">
                          <input
                            className="form-control"
                            placeholder="Nhập tin nhắn của bạn..."
                            value={chat}
                            onChange={(e) => setChat(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handlePushChat(item?.sendId?._id);
                              }
                            }}
                          />
                          <button
                            className="send-btn"
                            onClick={() => handlePushChat(item?.sendId?._id)}
                          >
                            <i class="fa-solid fa-paper-plane"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="chat-item">
              <div className="head-chat">
                <h3>Chat cùng Nguyên</h3>
                <p>
                  Bạn có thắc mắc gì muốn hỏi Nguyên? Hãy nhắn tin cho Nguyên và
                  chờ đợi phản hồi từ Nguyên trong một giờ nhé! Tin nhắn sẽ bị
                  xoá trong vòng 10 ngày hoặc bị xoá khi thắc mắc của bạn đã
                  được giải đáp.
                </p>
              </div>
              <div className="body-chat">
                <div className="chat-messages" ref={chatRef}>
                  {message?.map((item) => (
                    <>
                      {item?.sendId?._id === id && (
                        <div className="message sent">
                          <p className="sender">{item?.sendId?.fullName}</p>
                          <p className="content">{item?.chat}</p>
                          <p className="time">
                            {moment(item?.createdAt).format("HH:mm DD/MM/YYYY")}
                          </p>
                        </div>
                      )}

                      {item?.receivedId?._id === id && (
                        <div className={"message received"}>
                          <p className="sender">Quản trị viên</p>
                          <p className="content">{item?.chat}</p>
                          <p className="time">
                            {moment(item?.createdAt).format("HH:mm DD/MM/YYYY")}
                          </p>
                        </div>
                      )}
                    </>
                  ))}
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Nhập tin nhắn của bạn..."
                    value={chat}
                    onChange={(e) => setChat(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handlePushChat(null);
                      }
                    }}
                  />
                  <button
                    className="send-btn"
                    onClick={() => handlePushChat(null)}
                  >
                    <i class="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <h1 className="text-center">
            Bạn cần đăng nhập để có thể chat với quản trị viên
            <img style={{ width: "80%" }} src={imgError} alt="" />
          </h1>
        </div>
      )}
    </>
  );
}

export default Chat;
