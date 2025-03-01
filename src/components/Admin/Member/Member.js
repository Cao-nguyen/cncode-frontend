import React, { useEffect, useState } from "react";
import Editor from "../../Service/Editor";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import {
  MemberAdminEdit,
  MemberAdminRead,
} from "../../../services/MemberAdminServer";
import logo from "../../../assets/logo.png";
import { toast } from "react-toastify";

function Member(props) {
  const nagivate = useNavigate();

  const back = () => {
    nagivate(-1);
  };

  const [content, setContent] = useState();

  const handleEdit = async () => {
    if (!content) {
      toast.error("Nội dung không được bỏ trống");
    } else {
      const data = await MemberAdminEdit(content);

      if (data && data.EC === 0) {
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    }
  };

  useEffect(() => {
    const dataMember = async () => {
      const dataGetMember = await MemberAdminRead();

      if (dataGetMember && dataGetMember.EC === 0) {
        setContent(dataGetMember.DT.content);
      }
    };
    dataMember();
  }, []);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Chính sách thành viên </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <div className="admin">
        <h1 className="text-center">Chính sách thành viên</h1>
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

export default Member;
