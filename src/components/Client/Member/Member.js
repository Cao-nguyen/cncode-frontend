import React, { useEffect, useState } from "react";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism-twilight.css";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-cshtml.min.js";
import "prismjs/components/prism-css.min.js";
import { useQuery } from "@tanstack/react-query";
import { MemberAdminRead } from "../../../services/MemberAdminServer";
import { HelmetProvider, Helmet } from "react-helmet-async";

function Member() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: content } = useQuery({
    queryKey: ["content"],
    queryFn: MemberAdminRead,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (content) {
      Prism.highlightAll();
      setIsVisible(true);
    }
  }, [content]);

  let dataMember = content?.DT?.content;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Chính sách thành viên </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>
      <div className="container pt-lg-5">
        <div className="pt-5">
          <div
            className={`preview fade-in ${isVisible ? "visible" : ""}`}
            dangerouslySetInnerHTML={{
              __html: marked(dataMember?.replace(/\n/g, "  \n") || ""),
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Member;
