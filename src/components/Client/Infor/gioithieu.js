import React, { useEffect, useState, useMemo } from "react";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism-twilight.css";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-css.min.js";
import { getInforApi } from "../../../services/InforAdminServer";
import { HelmetProvider, Helmet } from "react-helmet-async";

function Gioithieu() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [Infor, setInfor] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await getInforApi();

      if (data && data.EC === 0) {
        setInfor(data.DT);
      }
    };

    getData();
  }, []);

  const inforHtml = useMemo(() => {
    if (!Infor) return "";

    let imgIndex = 0;
    const renderer = new marked.Renderer();

    renderer.image = (href, title, text) => {
      imgIndex++;

      let imageUrl = typeof href === "string" ? href : href?.href || "";

      return `<div class="img-wrapper" onClick="window.openImage('${imageUrl}')">
        <img src="${imageUrl}" alt="${text}" class="img${imgIndex}" />
      </div>`;
    };

    const html = marked(Infor, { renderer });

    return html;
  }, [Infor]);

  useEffect(() => {
    if (inforHtml) {
      Prism.highlightAll();
      setIsVisible(true);
    }
  }, [inforHtml]);

  useEffect(() => {
    window.openImage = (src) => setSelectedImage(src);
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Giới thiệu</title>
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
            dangerouslySetInnerHTML={{ __html: inforHtml }}
          ></div>
        </div>
      </div>

      {/* View ảnh khi click */}
      {selectedImage && (
        <div className="image-viewer" onClick={() => setSelectedImage(null)}>
          <div className="image-content">
            <img src={selectedImage} alt="Preview" />
          </div>
        </div>
      )}
    </>
  );
}

export default Gioithieu;
