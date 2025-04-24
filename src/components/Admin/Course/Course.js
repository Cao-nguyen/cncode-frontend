import React, { useState } from "react";
import "./Course.scss";

function Course() {
  const [showAdd, setShowAdd] = useState("");

  return (
    <div className="admin">
      <div className="action">
        <div className="btn btn-primary" onClick={() => setShowAdd("create")}>
          <i className="fa-solid fa-plus"></i> Thêm khoá học
        </div>
      </div>

      {showAdd === "create" && (
        <div className="form-choose">
          <h3>Tạo khoá học</h3>
        </div>
      )}
    </div>
  );
}

export default Course;
