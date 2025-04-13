import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./Diendan.scss";
import logo from "../../../assets/logo.png";

function Diendan(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [chat, setChat] = useState();

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
              <div className="user active">
                <div className="user-avatar">
                  <img src={logo} alt="" />
                </div>
                <div className="user-info">
                  <p className="user-info-name">Lý Cao Nguyên</p>
                  <span className="user-info-chat">
                    Quốc Bảo: Bài này làm sao vậy mấy bạn?
                  </span>
                </div>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              <div className="user">
                <div className="user-avatar">
                  <img src={logo} alt="" />
                </div>
                <div className="user-info">
                  <p className="user-info-name">Lý Cao Nguyên</p>
                  <span className="user-info-chat">
                    Quốc Bảo: Bài này làm sao vậy mấy bạn?
                  </span>
                </div>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </div>
            <div className="forum-right">
              <header>
                <div className="user">
                  <div className="user-avatar">
                    <img src={logo} alt="" />
                  </div>
                  <div className="user-info">
                    <p className="user-info-name">Giải đáp thắc mắc</p>
                    <span className="user-info-chat">
                      <div className="user-info-chat-icon">
                        <i className="fa-solid fa-user"></i>
                      </div>
                      <div className="user-info-chat-content">
                        <span>22 thành viên đã tham gia</span>
                      </div>
                    </span>
                  </div>
                </div>
              </header>
              <div className="forum-body"></div>
              <div className="forum-bottom">
                <div className="tool">
                  <i className="fa-solid fa-icons"></i>
                  <i className="fa-solid fa-square-poll-vertical"></i>
                </div>
                <div className="editor">
                  <textarea placeholder="Nhập tin nhắn của bạn..."></textarea>
                  <i class="fa-solid fa-paper-plane"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="phone">
          <div className="forum">
            <div className="forum-left">
              <h3>Diễn đàn hỗ trợ học tập</h3>
              <div className="user active">
                <div className="user-avatar">
                  <img src={logo} alt="" />
                </div>
                <div className="user-info">
                  <p className="user-info-name">Lý Cao Nguyên</p>
                  <span className="user-info-chat">
                    Quốc Bảo: Bài này làm sao vậy mấy bạn?
                  </span>
                </div>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              <div className="user">
                <div className="user-avatar">
                  <img src={logo} alt="" />
                </div>
                <div className="user-info">
                  <p className="user-info-name">Lý Cao Nguyên</p>
                  <span className="user-info-chat">
                    Quốc Bảo: Bài này làm sao vậy mấy bạn?
                  </span>
                </div>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </div>

            <div className="forum-right">
              <header>
                <div className="user">
                  <div className="user-avatar">
                    <img src={logo} alt="" />
                  </div>
                  <div className="user-info">
                    <p className="user-info-name">Giải đáp thắc mắc</p>
                    <span className="user-info-chat">
                      <div className="user-info-chat-icon">
                        <i className="fa-solid fa-user"></i>
                      </div>
                      <div className="user-info-chat-content">
                        <span>22 thành viên đã tham gia</span>
                      </div>
                    </span>
                  </div>
                </div>
              </header>
              <div className="forum-body"></div>
              <div className="forum-bottom">
                <div className="tool">
                  <i className="fa-solid fa-icons"></i>
                  <i className="fa-solid fa-square-poll-vertical"></i>
                </div>
                <div className="editor">
                  <textarea
                    placeholder="Nhập tin nhắn của bạn..."
                    value={chat}
                    onChange={(e) => setChat(e.target.value)}
                  ></textarea>
                  <i class="fa-solid fa-paper-plane"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Diendan;
