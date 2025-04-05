import React, { useEffect, useRef, useState } from "react";
import "./Chat.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ChatClientCreate,
  ChatClientRead,
} from "../../../services/ChatClientServer";
import { toast } from "react-toastify";
import moment from "moment/moment";
import socket from "../../Service/socket";

function Chat() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.account.id);
  const role = useSelector((state) => state.user.account.role);
  const [chat, setChat] = useState();
  const [message, setMessage] = useState();
  const [userActive, setUserActive] = useState();

  const chatRef = useRef(null);

  const handlePushChat = async (receivedId) => {
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
    (item) => item?.sendId?._id === userActive
  );

  const adminMessage = message?.filter((item) => item?.sendId?._id !== id);

  useEffect(() => {
    getData();

    socket.on("pushChat", () => {
      getData();
    });

    return () => {
      socket.off("pushChat");
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [message, newMessage, adminMessage]);

  return (
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
                  </header>

                  <div className="body-chat">
                    <div className="chat-messages" ref={chatRef}>
                      {message?.map((item) => (
                        <>
                          {item?.receivedId?._id === userActive && (
                            <div className="message sent">
                              <p className="sender">{item?.sendId?.fullName}</p>
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
                              <p className="sender">{item?.sendId?.fullName}</p>
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
              Bạn có thắc mắc gì muốn hỏi Nguyên? Hãy nhắn tin cho Nguyên và chờ
              đợi phản hồi từ Nguyên trong một giờ nhé! Tin nhắn sẽ bị xoá trong
              vòng 10 ngày hoặc bị xoá khi thắc mắc của bạn đã được giải đáp.
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
                    handlePushChat();
                  }
                }}
              />
              <button className="send-btn" onClick={handlePushChat}>
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
