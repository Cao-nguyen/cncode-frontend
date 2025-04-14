import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./Home.scss";
import { Link } from "react-router-dom";
import moment from "moment";
import { BlogReadHome, NewsReadHome } from "../../../services/HomeClientServer";
import web1 from "../../../assets/Khac/giftwo.gif";
import web2 from "../../../assets/Khac/gifthree.gif";
import web3 from "../../../assets/Khac/gifone.gif";

import banner1 from "../../../assets/Banner/banner1.png";
import banner from "../../../assets/Banner/banner.png";

function Home(props) {
  const [blog, setBlog] = useState();
  const [news, setNews] = useState();

  useEffect(() => {
    const BlogReadData = async () => {
      const data = await BlogReadHome();

      if (data) {
        setBlog(data.DT);
      }
    };

    const NewsReadData = async () => {
      const data = await NewsReadHome();

      if (data) {
        setNews(data.DT);
      }
    };

    BlogReadData();
    NewsReadData();
  }, []);

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
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={banner} className="d-block w-100" alt="" />
            </div>
            <div className="carousel-item">
              <img src={banner1} className="d-block w-100" alt="" />
            </div>
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
      </div>
    </>
  );
}

export default Home;
