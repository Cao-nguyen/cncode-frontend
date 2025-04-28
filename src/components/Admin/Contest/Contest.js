import React from "react";
import "./Contest.scss";
import { useNavigate } from "react-router-dom";

function Contest() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/admin/try/create");
  };

  return (
    <div className="contest">
      <div className="btn btn-primary" onClick={handleCreate}>
        <i className="fa-solid fa-plus"></i> Thêm bài tập
      </div>
    </div>
  );
}

export default Contest;
