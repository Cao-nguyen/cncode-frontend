import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import {
  BlogClientF,
  BlogClientLike,
  BlogClientRead,
  BlogClientUnf,
  BlogClientUnlike,
} from "../../../services/BlogClientServer";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { marked } from "marked";
import Prism from "prismjs";
import { useSelector } from "react-redux";
import socket from "../../Service/socket";
import {
  CommentsClientBlogCreate,
  CommentsClientBlogDelete,
} from "../../../services/CommentClientServer";
import "./Blog.scss";

function Show() {
  const divRef = useRef(null);
  const inputRef = useRef(null);

  const { slug } = useParams();
  const id = useSelector((state) => state.user.account.id);

  const [blog, setBlog] = useState();
  const [show, setShow] = useState(false);
  const [liked, setLiked] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState();
  const [replyContent, setReplyContent] = useState();
  const [currentId, setCurrentId] = useState();
  const [showReply, setShowReply] = useState();

  // Gọi api
  const blogData = async () => {
    const data = await BlogClientRead();
    if (data && data.EC === 0) {
      setBlog(data.DT);
    }
  };

  useEffect(() => {
    blogData();

    const isBlog = blog?.filter((b) => b?.slug === slug)[0];
    const isLike = isBlog?.like.some((like) => like?.userLike === id);
    setLiked(isLike);

    const isF = isBlog?.favorites?.some((f) => f?.userFavorite === id);
    setFavorite(isF);
  }, [blog, setLiked, id, slug, setFavorite]);

  // Xử lí update lên Facebook
  const handleShareFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/blog/${slug}`;
    window.open(facebookShareUrl, "_blank");
  };

  // Coppy link
  const handleCoppy = () => {
    const url = `${window.location.origin}/blog/${slug}`;
    const check = navigator.clipboard.writeText(url);
    if (check) {
      toast.success("Sao chép link bài viết thành công!");
    }
  };

  // Lấy content bằng marked
  const currentBlog = blog?.filter((blog) => blog.slug === slug)[0]?.content;
  const idPost = blog?.filter((blog) => blog.slug === slug)[0]?._id;
  const rawBlog = blog?.filter((blog) => blog?.slug === slug)[0];

  const inforHtml = useMemo(() => {
    if (!currentBlog) return "";

    let imgIndex = 0;
    const renderer = new marked.Renderer();

    renderer.image = (href, text) => {
      imgIndex++;

      let imageUrl = typeof href === "string" ? href : href?.href || "";

      return `<div class="img-wrapper" onClick="window.openImage('${imageUrl}')">
          <img src="${imageUrl}" alt="${text}" class="img${imgIndex}" />
        </div>`;
    };

    const html = marked(currentBlog, { renderer });

    return html;
  }, [currentBlog]);

  // Xử lí khác
  useEffect(() => {
    if (inforHtml) {
      Prism.highlightAll();
    }

    window.openImage = (src) => setSelectedImage(src);

    const handleClick = () => setShow(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [inforHtml]);

  // Bỏ like
  const handleUnlike = async () => {
    await BlogClientUnlike(id, idPost);
  };

  // Thả like
  const handleLike = async () => {
    await BlogClientLike(id, idPost);
  };

  // Yêu thích
  const handleF = async () => {
    await BlogClientF(id, idPost);
  };

  // Bỏ yêu thích
  const handleUnf = async () => {
    await BlogClientUnf(id, idPost);
  };

  const handleComment = () =>
    divRef.current?.scrollIntoView({ behavior: "smooth" });

  const handlePushComment = async () => {
    if (!id) {
      toast.error("Bạn cần đăng nhập để có thể bình luận!");
      setContent("");
      setReplyContent("");
      return;
    }

    if (currentId) {
      if (!replyContent) {
        toast.error("Bạn chưa nhập bình luận");
        return;
      }
    } else {
      if (!content) {
        toast.error("Bạn chưa nhập bình luận");
        return;
      }
    }

    const data = await CommentsClientBlogCreate(
      id,
      currentId,
      idPost,
      content,
      replyContent
    );

    if (data && data.EC === 0) {
      setContent("");
      setReplyContent("");
      setShowReply(false);
    }
  };

  const handleDelete = async (idPostDelete, parrentId) => {
    const check = window.confirm("Bạn có chắc chắn muốn xoá bình luận");

    if (check) {
      await CommentsClientBlogDelete(idPost, idPostDelete, parrentId);
    } else {
      return;
    }
  };

  const handleShowReply = (f, idComment) => {
    if (f) {
      const mention = `@${f}: `;
      setReplyContent(mention);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(mention.length, mention.length);
        }
      }, 0);
    }

    if (idComment) {
      setCurrentId(idComment);
    }

    setShowReply(!showReply);
  };

  // Sử lí socket
  useEffect(() => {
    socket.on("pushLike", () => {
      blogData();
    });

    socket.on("pushUnlike", () => {
      blogData();
    });

    socket.on("pushF", () => {
      blogData();
    });

    socket.on("pushUnf", () => {
      blogData();
    });

    socket.on("pushComment", () => {
      blogData();
    });

    socket.on("deleteComment", () => {
      blogData();
    });

    return () => {
      socket.off("pushLike");
      socket.off("pushUnlike");
      socket.off("pushF");
      socket.off("pushUnf");
      socket.off("pushComment");
      socket.off("deleteComment");
    };
  }, []);

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
                <meta property="og:image" content={`${item?.img}?v=2`} />
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
                    <div
                      className="action-item"
                      onClick={liked ? handleUnlike : handleLike}
                    >
                      <i
                        className={`${
                          liked ? "fa-solid" : "fa-regular"
                        } fa-heart`}
                        style={{ color: liked ? "var(--mau-do)" : "" }}
                      ></i>
                      <p>{item?.like?.length}</p>
                    </div>
                    <div className="action-item" onClick={handleComment}>
                      <i className="fa-regular fa-comment"></i>
                      <p>{rawBlog?.comments?.length || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="showblog-right">
                  <h3>{item?.title}</h3>
                  <div className="action">
                    <div
                      className="action-item"
                      onClick={liked ? handleUnlike : handleLike}
                    >
                      <i
                        className={`${
                          liked ? "fa-solid" : "fa-regular"
                        } fa-heart`}
                        style={{ color: liked ? "var(--mau-do)" : "" }}
                      ></i>
                      <p>{item?.like?.length}</p>
                    </div>
                    <div className="action-item" onClick={handleComment}>
                      <i className="fa-regular fa-comment"></i>
                      <p>{rawBlog?.comments?.length || 0}</p>
                    </div>
                  </div>
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
                      <i
                        className={`${
                          favorite ? "fa-solid" : "fa-regular"
                        } fa-bookmark`}
                        onClick={favorite ? handleUnf : handleF}
                        style={{ color: favorite ? "var(--mau-bookmark)" : "" }}
                      ></i>
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

                  <div
                    className="preview"
                    dangerouslySetInnerHTML={{ __html: inforHtml }}
                  ></div>

                  <h3>Bình luận</h3>
                  <div className="comment mt-2" ref={divRef}>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Viết bình luận của bạn*"
                        style={{ height: "80px", resize: "none" }}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />

                      <div
                        className="btn btn-primary mt-2"
                        style={{ color: "var(--mau-trang)" }}
                        onClick={handlePushComment}
                      >
                        <i className="fa-solid fa-paper-plane"></i> Gửi bình
                        luận
                      </div>
                    </div>
                    {rawBlog?.comments
                      ?.filter((comment) => comment.parrentId === null)
                      .map((item, index) => (
                        <>
                          <div className="comment-item" key={index}>
                            <div className="comment-info">
                              <img src={item?.userComment?.avatar} alt=""></img>
                              <div className="content">
                                <div className="d-flex">
                                  <p>{item?.userComment?.fullName}</p>
                                  {id === item?.userComment?._id && (
                                    <i
                                      className="fa-solid fa-ellipsis"
                                      style={{
                                        marginLeft: "30px",
                                        marginTop: "7px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        handleDelete(item?._id, item?.parrentId)
                                      }
                                      title="Xoá bình luận"
                                    ></i>
                                  )}
                                </div>
                                <span
                                  style={{
                                    whiteSpace: "pre-line",
                                    textAlign: "justify",
                                  }}
                                >
                                  {item?.comment}
                                </span>
                                <div className="action">
                                  <span>
                                    {moment(item?.commentedAt).format(
                                      "HH:mm | DD - MM - YYYY"
                                    )}
                                  </span>
                                  <span
                                    className="action-item"
                                    style={{ fontWeight: "bold" }}
                                    onClick={() =>
                                      handleShowReply(
                                        item?.userComment?.fullName,
                                        item?._id
                                      )
                                    }
                                  >
                                    Trả lời
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="comment-reply">
                            {showReply && (
                              <div className="form-group mx-2 mt-2">
                                <textarea
                                  className="form-control"
                                  placeholder="Viết bình luận của bạn*"
                                  style={{ height: "80px", resize: "none" }}
                                  value={replyContent}
                                  onChange={(e) =>
                                    setReplyContent(e.target.value)
                                  }
                                  ref={inputRef}
                                />

                                <div
                                  className="btn btn-primary mt-2"
                                  style={{ color: "var(--mau-trang)" }}
                                  onClick={() => handlePushComment()}
                                >
                                  <i className="fa-solid fa-paper-plane"></i>{" "}
                                  Gửi bình luận
                                </div>
                              </div>
                            )}

                            {rawBlog?.comments
                              ?.filter(
                                (comment) => comment.parrentId === item._id
                              )
                              .map((reply) => (
                                <div
                                  className="comment-reply-item"
                                  key={reply._id}
                                >
                                  <div className="comment-reply-info">
                                    <img
                                      src={reply?.userComment?.avatar}
                                      alt=""
                                    ></img>
                                    <div className="content">
                                      <div className="d-flex">
                                        <p>{reply?.userComment?.fullName}</p>
                                        {id === reply?.userComment?._id && (
                                          <i
                                            className="fa-solid fa-ellipsis"
                                            style={{
                                              marginLeft: "30px",
                                              marginTop: "7px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              handleDelete(
                                                reply?._id,
                                                reply?.parrentId
                                              )
                                            }
                                            title="Xoá bình luận"
                                          ></i>
                                        )}
                                      </div>
                                      <span
                                        style={{
                                          whiteSpace: "pre-line",
                                          textAlign: "justify",
                                        }}
                                      >
                                        {reply?.comment}
                                      </span>
                                      <div className="action">
                                        <span>
                                          {moment(reply?.commentedAt).format(
                                            "HH:mm | DD - MM - YYYY"
                                          )}
                                        </span>
                                        <span
                                          className="action-item"
                                          style={{ fontWeight: "bold" }}
                                          onClick={() =>
                                            handleShowReply(
                                              reply?.userComment?.fullName,
                                              item?._id
                                            )
                                          }
                                        >
                                          Trả lời
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </>
                      ))}
                  </div>

                  {selectedImage && (
                    <div
                      className="image-viewer"
                      onClick={() => setSelectedImage(null)}
                    >
                      <div className="image-content">
                        <img src={selectedImage} alt="Preview" />
                      </div>
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
