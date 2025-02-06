import React, { useEffect, useState } from "react";
import {
  BinsNews,
  DeleteBinsNews,
  PatchBinsNews,
} from "../../../services/adminServer";
import moment from "moment/moment";
import "./Bins.scss";
import { toast } from "react-toastify";

function Bins(props) {
  const [news, setNews] = useState([]);

  const getData = async () => {
    const data = await BinsNews();

    setNews(data.DT);
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePatch = async (id) => {
    const data = await PatchBinsNews(id);

    if (data && data.EC === 0) {
      getData();
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
  };

  const handleDelete = async (id) => {
    const check = window.confirm("Bạn có chắc chắn muốn xoá vĩnh viễn");
    if (check === true) {
      const data = await DeleteBinsNews(id);

      if (data && data.EC === 0) {
        getData();
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    }
  };

  return (
    <div className="admin">
      {news.length > 0 && <h2>Tin tức đã bị xoá</h2>}
      {news.map((item) => (
        <div className="bins_news" key={item._id}>
          <p>{moment(item.updatedAt).format("DD/MM/YYYY - HH:mm:ss")}</p>
          <div className="bins_news_item">
            <h4>{item.title}</h4>
            <div
              className="btn btn-primary"
              onClick={() => handlePatch(item._id)}
            >
              Khôi phục
            </div>
            <div
              className="btn btn-danger"
              onClick={() => handleDelete(item._id)}
            >
              Xoá vĩnh viễn
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bins;
