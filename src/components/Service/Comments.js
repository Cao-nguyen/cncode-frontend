import React, { useState } from "react";
import logo from "../../assets/logo.png";
import like from "../../assets/emotion/like.png";
import love from "../../assets/emotion/love.png";
import lovelove from "../../assets/emotion/thuongthuong.png";
import haha from "../../assets/emotion/haha.png";
import wow from "../../assets/emotion/wow.png";
import sad from "../../assets/emotion/sad.png";
import aggry from "../../assets/emotion/aggry.png";
import EditorComments from "./EditorComments";
import "./Comments.scss";

function Comments(props) {
  const [show, setShow] = useState();
  const [shows, setShows] = useState();
  const handleReply = () => {
    setShow(!show);
    setShows(!shows);
  };

  const [content, setContent] = useState();

  return (
    <div className="comment-main">
      <div className="comment-infor">
        <img className="avt" src={logo} alt=""></img>
        <p className="name">Lý Cao Nguyên</p>
        <p className="time">Vài giây trước</p>
      </div>
      <div className="comment-content">Hay quá ạ</div>
      <div className="comment-emotion">
        <div className="emotion-item">
          <p>
            Thích
            <div className="emotion-bg">
              <img className="emotion-icon" src={like} alt=""></img>
              <img className="emotion-icon" src={love} alt=""></img>
              <img className="emotion-icon" src={lovelove} alt=""></img>
              <img className="emotion-icon" src={haha} alt=""></img>
              <img className="emotion-icon" src={wow} alt=""></img>
              <img className="emotion-icon" src={sad} alt=""></img>
              <img className="emotion-icon" src={aggry} alt=""></img>
            </div>
            <div className="classFake"></div>
          </p>
          <p className="reply" onClick={handleReply}>
            Trả lời
          </p>
        </div>
        {shows && (
          <div className="form-group">
            <EditorComments value={content} onChange={setContent} />
          </div>
        )}
      </div>

      {/* Reply */}
      <div className="comment-reply">
        <div className="comment-infor-reply">
          <img className="avt" src={logo} alt=""></img>
          <p className="name">Lý Cao Nguyên</p>
          <p className="time">Vài giây trước</p>
        </div>
        <div className="comment-content-reply">
          <p>@Lý Cao Nguyên</p>
          <p>Hay quá ạ em cam</p>
        </div>
        <div className="comment-emotion-reply">
          <div className="emotion-item">
            <p>
              Thích
              <div className="emotion-bg">
                <img className="emotion-icon" src={like} alt=""></img>
                <img className="emotion-icon" src={love} alt=""></img>
                <img className="emotion-icon" src={lovelove} alt=""></img>
                <img className="emotion-icon" src={haha} alt=""></img>
                <img className="emotion-icon" src={wow} alt=""></img>
                <img className="emotion-icon" src={sad} alt=""></img>
                <img className="emotion-icon" src={aggry} alt=""></img>
              </div>
              <div className="classFake"></div>
            </p>
            <p className="reply" onClick={handleReply}>
              Trả lời
            </p>
          </div>
          {show && (
            <div className="form-group">
              <EditorComments value={content} onChange={setContent} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comments;
