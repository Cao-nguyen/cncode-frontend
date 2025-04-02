import React, { useEffect, useState } from "react";
import BootstrapPagination from "../../Service/Pagination";
import "./Ask.scss";
import { useSelector } from "react-redux";
import errorImg from "../../../assets/Khac/errorImg.gif";
import {
  AskCreate,
  AskRead,
  AskReplyCreate,
} from "../../../services/AskClientServer";
import { toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AskEditor from "../../Service/AskEditor";
import { marked } from "marked";
import Prism from "prismjs";
import socket from "../../Service/socket";

function Ask(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const id = useSelector((state) => state.user.account.id);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [question, setQuestion] = useState();
  const [reply, setReply] = useState();
  const [answer, setAnswer] = useState([]);

  const handleSubmit = async () => {
    if (!question) {
      toast.error("Vui lòng nhập câu hỏi");
      return;
    }

    const data = await AskCreate(id, question);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setQuestion("");
    } else {
      toast.error(data.EM);
    }
  };

  useEffect(() => {
    const ans = async () => {
      const data = await AskRead();

      if (data && data.EC === 0) {
        setAnswer(data.DT);
        setTotalItems(data?.DT?.length);
      }
    };

    socket.on("pushQuestion", (data) => {
      setAnswer(data);
      setTotalItems(data.length);
    });

    ans();

    return () => {
      socket.off("pushQuestion");
    };
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAnswer = answer.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [currentAnswer]);

  const [send, setSend] = useState();

  const handleSend = (id) => {
    setSend((prev) => (prev === id ? null : id));
  };

  const handlePush = async (idPush) => {
    if (!reply) {
      toast.error("Vui lòng nhập phản hồi cho câu hỏi");
      return;
    }

    const data = await AskReplyCreate(idPush, id, reply);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setReply("");
      setSend(null);
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Hỏi đáp</title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>
      <div className="container">
        {id ? (
          <>
            <div className="ask">
              <h1 className="text-center text-primary">Hỏi đáp cùng CNcode</h1>
              <p>
                Nhập câu hỏi bạn muốn hỏi vào bên dưới, bấm gửi và đợi phản hồi
                từ CNcode nhé!
              </p>
              <div className="btn btn-primary mb-2" onClick={handleSubmit}>
                <i class="fa-solid fa-paper-plane"></i> Gửi câu hỏi
              </div>
              <div className="form-group">
                <AskEditor value={question} onChange={setQuestion} />
              </div>
            </div>
            <div className="answer">
              {currentAnswer.map((item, index) => (
                <div className="answer-item" key={index}>
                  <div className="item-info">
                    <div>
                      <img src={item?.authorId?.avatar} alt=""></img>
                    </div>
                    <div>
                      <p>{item?.authorId?.fullName}</p>
                    </div>
                    <div>
                      {item?.authorId?.role === "admin" && (
                        <p className="role">Quản trị viên</p>
                      )}
                      {item?.authorId?.role === "user" && (
                        <p className="role">Người dùng</p>
                      )}
                      {item?.authorId?.role === "teacher" && (
                        <p className="role">Giáo viên</p>
                      )}
                    </div>
                  </div>
                  <div
                    className="preview"
                    dangerouslySetInnerHTML={{
                      __html: marked(
                        item.question?.replace(/\n/g, "  \n") || ""
                      ),
                    }}
                  ></div>
                  {item?.answer?.map((item, index) => (
                    <div className="reply" key={index}>
                      <div className="item-info">
                        <div>
                          <img src={item?.authorId?.avatar} alt=""></img>
                        </div>
                        <div>
                          <p>{item?.authorId?.fullName}</p>
                        </div>
                        <div>
                          {item?.authorId?.role === "admin" && (
                            <p className="role">Quản trị viên</p>
                          )}
                          {item?.authorId?.role === "user" && (
                            <p className="role">Người dùng</p>
                          )}
                          {item?.authorId?.role === "teacher" && (
                            <p className="role">Giáo viên</p>
                          )}
                        </div>
                      </div>
                      <div
                        className="preview"
                        dangerouslySetInnerHTML={{
                          __html: marked(
                            item.answer?.replace(/\n/g, "  \n") || ""
                          ),
                        }}
                      ></div>
                    </div>
                  ))}

                  <div className="action">
                    {id !== item?.authorId?._id && (
                      <div
                        className="btn btn-primary"
                        onClick={() => handleSend(item._id)}
                      >
                        <i class="fa-solid fa-paper-plane"></i> Trả lời
                      </div>
                    )}
                    {id === item?.authorId?._id && (
                      <div className="btn btn-danger">
                        <i class="fa-solid fa-trash"></i> Xoá câu hỏi
                      </div>
                    )}
                  </div>
                  {send === item._id && (
                    <>
                      <div
                        className="btn btn-primary mb-2"
                        onClick={() => handlePush(item._id)}
                      >
                        <i class="fa-solid fa-paper-plane"></i> Gửi phản hồi
                      </div>
                      <div className="form-group">
                        <AskEditor value={reply} onChange={setReply} />
                      </div>
                    </>
                  )}
                </div>
              ))}
              <div className="paginate mt-3">
                <BootstrapPagination
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-center mt-5">
            Bạn cần đăng nhập để có thể hỏi đáp
            <img src={errorImg} alt="" style={{ width: "100%" }} />
          </h1>
        )}
      </div>
    </>
  );
}

export default Ask;
