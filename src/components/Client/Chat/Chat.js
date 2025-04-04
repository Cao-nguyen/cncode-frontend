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
  const [chat, setChat] = useState();
  const [message, setMessage] = useState();

  const chatRef = useRef(null);

  const handlePushChat = async () => {
    const data = await ChatClientCreate(id, chat);

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
  }, [message]);

  return (
    <div className="chatNguyen">
      <header>
        <div className="back" onClick={() => navigate(-1)}>
          Trở về
        </div>
      </header>
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
                    <p className="sender">{item?.receivedId?.fullName}</p>
                    <p className="content">{item?.chat}</p>
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
    </div>
  );
}

export default Chat;
