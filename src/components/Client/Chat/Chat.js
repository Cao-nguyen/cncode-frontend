import React from "react";
import "./Chat.scss";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();

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
          <div className="chat-messages">
            {/* Tin nhắn người gửi */}
            <div className="message sent">
              <p className="sender">Bạn:</p>
              <p className="content">
                Chào bạn, có thể giúp tôi được không? Chào bạn, có thể giúp tôi
                được không? Chào bạn, có thể giúp tôi được không? Chào bạn, có
                thể giúp tôi được không? Chào bạn, có thể giúp tôi được không?
                Chào bạn, có thể giúp tôi được không? Chào bạn, có thể giúp tôi
                được không? Chào bạn, có thể giúp tôi được không? Chào bạn, có
                thể giúp tôi được không?
              </p>
            </div>
            {/* Tin nhắn người nhận */}
            <div className="message received">
              <p className="sender">Người nhận:</p>
              <p className="content">
                Chào bạn, có thể giúp tôi được không?Chào bạn, có thể giúp tôi
                được không? Chào bạn, có thể giúp tôi được không? Chào bạn, có
                thể giúp tôi được không? Chào bạn, có thể giúp tôi được không?
                Chào bạn, có thể giúp tôi được không? Chào bạn, có thể giúp tôi
                được không? Chào bạn, có thể giúp tôi được không? Chào bạn, có
                thể giúp tôi được không? Chào bạn, có thể giúp tôi được không?
              </p>
            </div>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Nhập tin nhắn của bạn..."
            />
            <button className="send-btn">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
