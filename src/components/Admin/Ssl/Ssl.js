import React, { useEffect, useState } from "react";
import Editor from "../../Service/Editor";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { SslAdminEdit, SslAdminRead } from "../../../services/SslAdminServer";
import logo from "../../../assets/logo.png";
import "./Ssl.scss";
import { toast } from "react-toastify";

function Ssl(props) {
  const nagivate = useNavigate();

  const back = () => {
    nagivate(-1);
  };

  const [content, setContent] = useState();

  const handleEdit = async () => {
    if (!content) {
      toast.error("Nội dung không được bỏ trống");
    } else {
      const data = await SslAdminEdit(content);

      if (data && data.EC === 0) {
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    }
  };

  useEffect(() => {
    const dataSll = async () => {
      const dataGetSll = await SslAdminRead();

      if (dataGetSll && dataGetSll.EC === 0) {
        setContent(dataGetSll.DT.content);
      }
    };
    dataSll();
  }, []);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Chính sách bảo mật </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <div className="admin">
        <h1 className="text-center">Chính sách bảo mật</h1>
        <button className="btn btn-dark mb-2" onClick={back}>
          <i className="fa-solid fa-arrow-left"></i>
          Trở về
        </button>
        <button className="btn btn-primary mb-2" onClick={handleEdit}>
          <i className="fa-solid fa-floppy-disk"></i>
          Cập nhật
        </button>
        <Editor value={content} onChange={setContent} />
      </div>
    </div>
  );
}

export default Ssl;
