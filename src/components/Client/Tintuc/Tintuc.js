import React, { useEffect, useState } from "react";
import { ShowNewClient } from "../../../services/NewsClientServer";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Tintuc.scss";
import { useQuery } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet";

function Tintuc(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const { data: news } = useQuery({
    queryKey: ["news"],
    queryFn: ShowNewClient,
  });

  useEffect(() => {
    if (news) {
      setIsVisible(true);
    }
  }, [news]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Tin tức </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>
      <div className="container">
        <div className={`news fade-in ${isVisible ? "visible" : ""}`}>
          {news?.DT?.map((item) => (
            <div className="news-item" key={item._id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="news-text">
                <p>{item.fullName}</p>
                <p>{moment(item.createdAt).format("DD/MM/YYYY")}</p>
              </div>
              <div className="btn btn-primary">
                <Link to={`/tintuc/${item.slug}`}>Xem thêm</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Tintuc;
