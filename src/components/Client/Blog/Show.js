import React, { useEffect, useRef, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { BlogClientRead } from "../../../services/BlogClientServer";
import "./Blog.scss";
import moment from "moment/moment";
import { toast } from "react-toastify";

function Show() {
  const { slug } = useParams();

  const [blog, setBlog] = useState();

  const blogData = async () => {
    const data = await BlogClientRead();
    if (data && data.EC === 0) {
      setBlog(data.DT);
    }
  };

  useEffect(() => {
    blogData();
  }, []);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleClick = () => setShow(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleShareFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/blog/${slug}`;
    window.open(facebookShareUrl, "_blank");
  };

  const handleCoppy = () => {
    const url = `${window.location.origin}/blog/${slug}`;
    const check = navigator.clipboard.writeText(url);
    if (check) {
      toast.success("Sao chép link bài viết thành công!");
    }
  };

  return (
    <>
      {blog
        ?.filter((blog) => blog.slug === slug)
        .map((item) => (
          <>
            <HelmetProvider>
              <Helmet>
                <title>{`CNcode | ${item?.title}`}</title>
                <meta property="og:title" content={item?.title} />
                <meta property="og:description" content={item?.description} />
                <meta property="og:image" content={item?.img} />
                <meta
                  property="og:url"
                  content={`https://cncode.vercel.app/blog/${slug}`}
                />
                <meta property="og:type" content="article" />
                <link rel="canonical" href="https://cncode.vercel.app" />
              </Helmet>
            </HelmetProvider>

            <div className="container">
              <div className="showblog">
                <div className="showblog-left">
                  <h3>{item?.authorId?.fullName}</h3>
                  <p>{item?.authorId?.info}</p>
                  <div className="border"></div>
                  <div className="action">
                    <div className="action-item">
                      <i className="fa-regular fa-heart"></i>
                      <p>0</p>
                    </div>
                    <div className="action-item">
                      <i className="fa-regular fa-comment"></i>
                      <p>0</p>
                    </div>
                  </div>
                </div>
                <div className="showblog-right">
                  <h3>{item?.title}</h3>
                  <div className="info">
                    <div className="info-item">
                      <img src={item?.authorId?.avatar} alt=""></img>
                      <div className="info-item-bot">
                        <h3>{item?.authorId?.fullName}</h3>
                        <p>
                          {moment(item?.createdAt).format("DD/MM/YYY - HH:mm")}
                        </p>
                      </div>
                    </div>
                    <div className="info-item">
                      <i className="fa-regular fa-bookmark"></i>
                      <i
                        class="fa-solid fa-ellipsis"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShow(!show);
                        }}
                      ></i>
                    </div>
                  </div>

                  {show && (
                    <div className="menu">
                      <span onClick={handleShareFacebook}>
                        <i className="fa-brands fa-facebook"></i>
                        Chia sẻ lên facebook
                      </span>
                      <span onClick={handleCoppy}>
                        <i className="fa-solid fa-link"></i>
                        Sao chép liên kết
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ))}
    </>
  );
}

export default Show;
