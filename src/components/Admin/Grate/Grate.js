import React, { useEffect, useState } from "react";
import {
  GrateDeleteHome,
  GrateReadHome,
} from "../../../services/HomeClientServer";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./Grate.scss";
import { toast } from "react-toastify";
import socket from "../../Service/socket";

function Grate() {
  const [currentGrate, setCurrentGrate] = useState();

  const getData = async () => {
    const data = await GrateReadHome();

    if (data && data.EC === 0) {
      setCurrentGrate(data.DT);
    }
  };

  useEffect(() => {
    getData();

    socket.on("pushGrate", () => {
      getData();
    });

    return () => {
      socket.off("pushGrate");
    };
  }, []);

  const handleDelete = async (id) => {
    const checked = window.confirm("Bạn có chắc chắn muốn xoá?");

    if (checked) {
      const data = await GrateDeleteHome(id);

      if (data && data.EC === 0) {
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Ý kiến người dùng </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>

      <h3 className="text-grate">Ý kiến của người dùng</h3>
      <div className="admin-grate">
        {currentGrate?.map((item, index) => (
          <div className="admin-grate-item" key={index}>
            <img src={item?.authorId?.avatar} alt="" />
            <div className="rating">
              <div className="info">
                <h5>{item?.authorId?.fullName}</h5>
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => handleDelete(item?._id)}
                ></i>
              </div>
              {[1, 2, 3, 4, 5].map((s) => (
                <i
                  key={s}
                  className="fa-solid fa-star"
                  style={{
                    color: s <= item?.rating ? "#ffc107" : "#e4e5e9",
                  }}
                />
              ))}
              <p>{item?.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Grate;
