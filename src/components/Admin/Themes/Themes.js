import React, { useEffect, useState } from "react";
import "./Themes.scss";
import {
  ThemeAdminEdit,
  ThemeAdminRead,
} from "../../../services/ThemeAdminServer";
import { toast } from "react-toastify";

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

  const handleTheme = async (id) => {
    const check = window.confirm(
      "Bạn có chắc chắn muốn áp dụng giao diện này!"
    );

    if (check) {
      const data = await ThemeAdminEdit(id);
      if (data && data.EC === 0) {
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    }
  };

  return (
    <div className="admin">
      <div className="theme-tabs">
        {theme &&
          theme.map((item, index) => (
            <div className="theme-tab" key={index}>
              <h3>{item.name}</h3>
              <p>Thời gian: {item.date}</p>
              <i
                class="fa-solid fa-list-ul"
                onClick={() => handleTheme(item._id)}
              ></i>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Themes;
