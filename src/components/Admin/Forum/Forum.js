import React from "react";
import "./Forum.scss";

function Forum() {
  return (
    <div className="admin">
      <h3 className="text-center">Diễn đàn học tập</h3>
      <div className="btn btn-primary">
        <i className="fa-solid fa-arrow-left"></i>
        Trở về
      </div>
      <div className="btn btn-primary">
        <i className="fa-solid fa-plus"></i>
        Thêm diễn đàn
      </div>

      <div className="admin_forum"></div>
    </div>
  );
}

export default Forum;
