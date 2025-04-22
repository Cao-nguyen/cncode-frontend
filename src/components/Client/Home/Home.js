import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./Home.scss";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  BlogReadHome,
  GrateCreateHome,
  GrateReadHome,
  NewsReadHome,
  UserPointHome,
  UserPointRead,
} from "../../../services/HomeClientServer";
import web1 from "../../../assets/Khac/giftwo.gif";
import web2 from "../../../assets/Khac/gifthree.gif";
import web3 from "../../../assets/Khac/gifone.gif";
import { SettingsAdminBannerRead } from "../../../services/SettingsAdminServer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Slider from "react-slick";
import socket from "../../Service/socket";
import streakImg from "../../../assets/Khac/streak.png";

function Home(props) {
  const [blog, setBlog] = useState();
  const [news, setNews] = useState();
  const [banner, setBanner] = useState();
  const [currentGrate, setCurrentGrate] = useState();
  const [currentPoint, setCurrentPoint] = useState();

  const [countT, setCountT] = useState();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  useEffect(() => {
    const BlogReadData = async () => {
      const data = await BlogReadHome();

      if (data && data.EC === 0) {
        setBlog(data.DT);
      }
    };

    const NewsReadData = async () => {
      const data = await NewsReadHome();

      if (data && data.EC === 0) {
        setNews(data.DT);
      }
    };

    const BannerReadData = async () => {
      const data = await SettingsAdminBannerRead();

      if (data && data.EC === 0) {
        setBanner(data.DT);
      }
    };

    const GrateReadData = async () => {
      const data = await GrateReadHome();

      if (data && data.EC === 0) {
        setCurrentGrate(data.DT);
      }
    };

    const UserPointReadData = async () => {
      const data = await UserPointRead();

      if (data && data.EC === 0) {
        setCurrentPoint(data.DT.data);
        setCountT(data.DT.user);
      }
    };

    GrateReadData();
    BlogReadData();
    NewsReadData();
    BannerReadData();
    UserPointReadData();

    socket.on("pushGrate", () => {
      GrateReadData();
    });

    socket.on("pushUserPoint", () => {
      UserPointReadData();
    });

    return () => {
      socket.off("pushGrate");
      socket.off("pushUserPoint");
    };
  }, []);

  const id = useSelector((state) => state.user.account.id);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState();

  const handlePush = async () => {
    if (!rating || !comment) {
      toast.error("Bạn chưa nhập đầy đủ thông tin!");
    } else {
      const data = await GrateCreateHome(id, rating, comment);

      if (data && data.EC === 0) {
        toast.success(data.EM);
        setComment("");
        setRating(0);
      } else {
        toast.error(data.EM);
      }
    }
  };

  const handleUserPoint = async () => {
    await UserPointHome(id);
  };

  const checkUserId = currentPoint?.some((p) => p?.authorId?._id === id);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Trang chủ </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>

      <div className="container-img">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {banner?.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className="active"
                aria-current="true"
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {banner?.map((item, index) => (
              <div key={index} className="carousel-item active">
                <Link to={item?.link}>
                  <img src={item?.avatar} className="d-block w-100" alt="" />
                </Link>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container" data-aos="zoom-in">
        <div className="HomeEvent">
          <div className="streak">
            <p>Chuỗi học tập</p>
            <div className="content">
              <div className="content-item">
                <p>{countT?.filter((b) => b._id === id)[0]?.streak}</p>
                <img
                  src={streakImg}
                  alt=""
                  style={
                    checkUserId ? undefined : { filter: "grayscale(100%)" }
                  }
                />
              </div>
              <progress
                value={countT?.filter((b) => b._id === id)[0]?.streak}
                max="360"
              ></progress>
              <div className="content-item">
                <p>360</p>
                <img src={streakImg} alt="" />
              </div>
            </div>
            <p style={{ fontWeight: "normal", marginTop: "20px" }}>
              Khi đạt đến cột mốc 360 chuỗi bạn sẽ nhận được 1.000 xu
            </p>
            <p style={{ fontWeight: "normal" }}>
              Chuỗi của bạn sẽ trở về 0 nếu bạn quên điểm danh một ngày
            </p>
          </div>
          <div className="coins">
            <div className="content">
              {currentPoint?.map((item) => (
                <p>{`Chúc mừng ${item?.authorId?.fullName} đã nhận được ${item.coins} xu trong hôm nay`}</p>
              ))}
            </div>
            <div className="action">
              {checkUserId ? (
                <p>Bạn đã điểm danh trong ngày hôm nay rồi!</p>
              ) : (
                <div className="btn btn-primary" onClick={handleUserPoint}>
                  Điểm danh
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="info1">
          <img src={web2} alt="" />
          <div className="content">
            <h5>
              CNcode – Học tập công nghệ thông tin miễn phí, tương tác như trên
              lớp
            </h5>
            <p>
              CNcode là một nền tảng giáo dục công nghệ thông tin miễn phí, phù
              hợp với nhiều đối tượng từ học sinh, sinh viên, giáo viên đến
              người đi làm. Với sứ mệnh mang đến môi trường học tập chất lượng,
              CNcode cung cấp các khoá học phong phú về lập trình, tin học văn
              phòng, và tin học theo chương trình SGK của THCS, THPT – tất cả
              đều miễn phí ngoại trừ các khoá học pro!
            </p>
            <h5>Học chủ động, tương tác cao như trên lớp</h5>
            <p>
              Dù học thông qua video, tài liệu, nhưng bạn sẽ không cảm thấy đơn
              độc nhờ vào hệ thống hỏi đáp với độ tương tác cao. Tại CNcode, bạn
              có thể đặt câu hỏi, thảo luận, nhận giải đáp nhanh chóng như đang
              học trực tiếp với giáo viên. Ngoài ra, hệ thống bài tập đa dạng từ
              trắc nghiệm, điền khuyết đến bài tập thực hành sẽ giúp bạn không
              chỉ hiểu lý thuyết mà còn ứng dụng thành thạo.
            </p>
            <h5>Vừa học vừa chơi - Giữ lửa đam mê</h5>
            <p>
              Học tập không còn khô khan khi bạn tham gia CNcode! Chúng tôi tích
              hợp nhiều tính năng giúp bạn duy trì động lực như: Khu vườn trên
              mây, Giữ chuỗi học tập, thử thách lập trình, cuộc thi tin học giúp
              bạn kiểm tra kiến thức và nhận phần thưởng giá trị.
            </p>
            <h5>Hỗ trợ đặc biệt dành cho Giáo viên</h5>
            <p>
              Không chỉ dành cho học viên, CNcode còn là công cụ đắc lực cho
              giáo viên. Khi đăng ký quyền "Giáo viên", bạn sẽ có một trang quản
              trị riêng, nơi có thể: Tạo khoá học, bài tập cho học sinh. Theo
              dõi tiến độ học tập và quản lý điểm số. Xây dựng lớp học online
              với độ tương tác cao.
            </p>
            <p>
              Hãy tham gia ngay để trải nghiệm một phương pháp học tập mới mẻ,
              hiệu quả và đầy cảm hứng! 🚀
            </p>
          </div>
        </div>

        <div className="info2" data-aos="zoom-in">
          <div className="info2-item">
            <img src={web3} alt=""></img>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div>
                Học tại trung tâm thường có học phí cao, dao động từ vài trăm
                nghìn đến vài triệu đồng mỗi tháng.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div>
                Học tại trung tâm có lịch học cố định, nếu học viên bận hoặc có
                việc đột xuất sẽ dễ bị mất bài.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div>
                Tài liệu học tại trung tâm phụ thuộc vào giáo trình của từng
                giáo viên, có thể không được cập nhật.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div>
                Học tại trung tâm giúp học viên có thể trao đổi trực tiếp với
                giáo viên, nhưng thời gian bị giới hạn.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div>
                Phần lớn bài tập tại trung tâm vẫn theo kiểu truyền thống: làm
                trên giấy, chép bài giảng từ giáo viên.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div>
                Nhiều học viên cảm thấy bị ép buộc khi học tại trung tâm, dẫn
                đến tình trạng chán nản.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div>
                Tại trung tâm, giáo trình được thiết kế chung cho tất cả học
                viên, ít có sự điều chỉnh theo nhu cầu riêng.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div>
                Giáo viên khó có thể biết được điểm yếu của từng người để đưa ra
                phương pháp cải thiện phù hợp.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div>
                Học tại trung tâm thường thiên về lý thuyết, ít có cơ hội thực
                hành thực tế.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div>
                Học tại trung tâm yêu cầu học viên phải di chuyển đến lớp học,
                tốn thời gian và chi phí đi lại.
              </div>
            </div>
          </div>
          <div className="info2-item">
            <img src={web1} alt=""></img>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                CNcode cung cấp khoá học miễn phí hoặc giá rẻ, giúp học viên
                không cần lo lắng về chi phí.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                Học online trên CNcode cho phép học viên tự quyết định thời gian
                học tập.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                CNcode sử dụng giáo trình, đưa ra lộ trình hợp lí để giúp cải
                thiện khả năng tiếp thu kiến thức.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                Học trên CNcode vẫn có độ tương tác giữa học viên và bài giảng,
                giúp hiểu bài và không nhàm chán.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                CNcode cung cấp các bài tập thực hành trực tiếp trên trình
                duyệt, có tính năng chấm điểm tự động.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                CNcode có hệ thống "Khu vườn trên mây" – nơi học viên chăm sóc
                cây bằng cách hoàn thành bài tập.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                CNcode tự đưa ra lộ trình học tập phù hợp cho toàn bộ học viên.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                CNcode có hệ thống báo cáo chi tiết, giúp học viên theo dõi tiến
                độ học tập của mình.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                CNcode tích hợp sẵn môi trường thực hành, học viên chỉ chọn bài
                tập và bắt đầu.
              </div>
            </div>
            <div className="content">
              <div>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                Học online trên CNcode giúp học viên tiết kiệm thời gian và công
                sức.
              </div>
            </div>
          </div>
        </div>

        <div className="HomeNews" data-aos="flip-right">
          <div className="HomeNews-Title">
            <div className="Title-Border"></div>
            <h3 className="text-primary">Tin tức mới nhất</h3>
            <div className="Title-Border"></div>
          </div>
          <div className="HomeNews-Body">
            <div className="news">
              {news?.map((item) => (
                <div className="news-item" key={item._id}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="news-text">
                    <p>{item?.authorId?.fullName}</p>
                    <p>{moment(item.createdAt).format("DD/MM/YYYY")}</p>
                  </div>
                  <div className="btn btn-primary">
                    <Link to={`/tintuc/${item.slug}`}>Xem thêm</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="HomeWhy" data-aos="zoom-in">
          <div className="HomeWhy-Title">
            <div className="Title-Border"></div>
            <h3 className="text-primary">Tại sao chọn CNcode?</h3>
            <div className="Title-Border"></div>
          </div>
          <div className="HomeWhy-Body">
            <div className="homewhy-item">
              <h3>1</h3>
              <p>
                Nền tảng học công nghệ thông tin với nhiều tính năng hiện đại.
              </p>
            </div>
            <div className="homewhy-item">
              <h3>2</h3>
              <p>Học qua video và tài liệu nhưng có tính tương tác cao.</p>
            </div>
            <div className="homewhy-item">
              <h3>3</h3>
              <p>Nhiều bài tập đa dạng, sự kiện hấp dẫn, có diễn đàn hỗ trợ.</p>
            </div>
            <div className="homewhy-item">
              <h3>4</h3>
              <p>
                Vừa học vừa chơi, tiết kiệm thời gian di chuyển ra trung tâm và
                tiền bạc.
              </p>
            </div>
          </div>
        </div>

        <div className="HomeBlog" data-aos="zoom-in">
          <div className="HomeBlog-Title">
            <div className="Title-Border"></div>
            <h3 className="text-primary">Blog mới nhất</h3>
            <div className="Title-Border"></div>
          </div>
          <div className="HomeBlog-Body">
            <div className="blog">
              {blog &&
                blog.map((item, index) => (
                  <div className="blog-item" key={index}>
                    <Link to={`/blog/${item?.slug}`}>
                      <img src={item.img} alt={item.title} />
                      <div className="date">
                        <p className="date-one">
                          {moment(item.createdAt).format("DD - MM")}
                        </p>
                        <p className="date-year">
                          {moment(item.createdAt).format("YYYY")}
                        </p>
                      </div>
                    </Link>
                    <div className="blog-content">
                      <Link to={`/blog/${item?.slug}`}>
                        <p className="blog-title">{item.title}</p>
                        <p className="blog-description">{item.description}</p>
                      </Link>
                    </div>
                    <div className="blog-user">
                      <div className="blogUser-avatar">
                        <img
                          src={item?.authorId?.avatar}
                          alt={item?.authorId?.fullName}
                        ></img>
                      </div>
                      <div className="blogUser-fullName">
                        <p>{item?.authorId?.fullName}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="HomeGrate" data-aos="zoom-in">
          <div className="HomeGrate-Title">
            <div className="Title-Border"></div>
            <h3 className="text-primary">ĐÁNH GIÁ WEBSITE</h3>
            <div className="Title-Border"></div>
          </div>
          <div className="grate">
            <div className="grate-form form-group">
              <div className="grate-star">
                {[1, 2, 3, 4, 5].map((s) => (
                  <i
                    className="fa-solid fa-star"
                    style={{
                      color: s <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                    }}
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                  ></i>
                ))}
              </div>
              <textarea
                disabled={id ? false : true}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-control"
                placeholder="Đánh giá của bạn về website..."
              />
              <div
                className={id ? "btn btn-primary" : "btn btn-secondary"}
                onClick={id ? handlePush : null}
              >
                Gửi đánh giá
              </div>
            </div>
            <Slider {...settings}>
              {currentGrate?.map((item, index) => (
                <div key={index}>
                  <div className="d-flex align-items-start p-4 rounded">
                    <div className="me-4">
                      <img
                        src={item?.authorId?.avatar}
                        alt={item?.authorId?.fullName}
                        className="rounded-circle"
                        style={{ width: 80, height: 80, objectFit: "cover" }}
                      />
                    </div>

                    <div>
                      <h5 className="mb-1">{item?.authorId?.fullName}</h5>
                      <div className="mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <i
                            key={s}
                            className="fa-solid fa-star"
                            style={{
                              color: s <= item?.rating ? "#ffc107" : "#e4e5e9",
                            }}
                          />
                        ))}
                      </div>
                      <p className="comment-text">"{item?.comment}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
