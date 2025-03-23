import React, { useEffect, useState } from "react";
import "./Ask.scss";
import Prism from "prismjs";
import "prismjs/themes/prism-twilight.css";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-css.min.js";
import { useSelector } from "react-redux";
import errorImg from "../../../assets/Khac/errorImg.avif";
import Editor from "../../Service/Editor";
import { AskCreate, AskRead } from "../../../services/AskClientServer";
import { toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { marked } from "marked";

function Ask(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const id = useSelector((state) => state.user.account.id);

  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState([]);

  const handleSubmit = async () => {
    if (!question) {
      toast.error("Vui lòng nhập câu hỏi");
    }

    const data = await AskCreate(id, question);

    if (data && data.EC === 0) {
      toast.success("Đã gửi câu hỏi thành công!");
      setQuestion("");
    } else {
      toast.error("Gửi câu hỏi thất bại!");
    }
  };

  useEffect(() => {
    const ans = async () => {
      const data = await AskRead();

      if (data && data.EC === 0) {
        setAnswer(data.DT);
      }
    };

    ans();
  }, []);

  useEffect(() => {
    if (answer) {
      Prism.highlightAll();
    }
  }, [answer]);

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
                Gửi câu hỏi
              </div>
              <Editor value={question} onChange={setQuestion} />
            </div>
            <div className="answer">
              {answer.map((item, index) => (
                <div className="answer-item" key={index}>
                  <div
                    className={`preview `}
                    dangerouslySetInnerHTML={{
                      __html: marked(
                        item?.question?.replace(/\n/g, "  \n") || ""
                      ),
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h1 className="text-center mt-5">
            Bạn cần đăng nhập để có thể hỏi đáp
            <img src={errorImg} alt="" />
          </h1>
        )}
      </div>
    </>
  );
}

export default Ask;
