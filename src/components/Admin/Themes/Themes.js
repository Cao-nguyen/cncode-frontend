import React, { useEffect, useState } from "react";
import "./Themes.scss";
import {
  ThemeAdminEdit,
  ThemeAdminRead,
} from "../../../services/ThemeAdminServer";
import { toast } from "react-toastify";
import { HelmetProvider, Helmet } from "react-helmet-async";
import logo from "../../../assets/logo.png";

function Themes(props) {
  const [theme, setTheme] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ThemeRead = async () => {
      const data = await ThemeAdminRead();

      if (data) {
        setTheme(data.DT);
      }
    };

    ThemeRead();
  }, []);

  const handleTheme = async (id, currentActive) => {
    const check = window.confirm(
      "Bạn có chắc chắn muốn thay đổi giao diện này?"
    );

    if (check) {
      const data = await ThemeAdminEdit(id);
      if (data && data.EC === 0) {
        toast.success(data.EM);

        setTheme((prevTheme) =>
          prevTheme.map((item) =>
            item._id === id
              ? { ...item, active: !currentActive }
              : { ...item, active: false }
          )
        );
      } else {
        toast.error(data.EM);
      }
    }
  };

  return (
    <div className="admin">
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Giao diện</title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <div className="theme-tabs">
        {theme &&
          theme.map((item, index) => (
            <div
              className={
                item.active === true ? "theme-tab-active" : "theme-tab"
              }
              key={index}
            >
              <h3>{item.name}</h3>
              <p>Thời gian: {item.date}</p>
              <i
                class="fa-solid fa-list-ul"
                onClick={() => handleTheme(item._id, item.active)}
              ></i>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Themes;
