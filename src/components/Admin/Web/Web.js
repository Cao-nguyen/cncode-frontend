import React, { useState } from "react";
import "./Web.scss";

const Web = () => {
  const [rows, setRows] = useState([{ displayName: "", link: "" }]);

  const addRow = () => {
    setRows([...rows, { displayName: "", link: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div className="admin setting-ad">
      <h1 className="text-center text-primary">Cài đặt website</h1>
      <h4>Thông tin chung</h4>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Thông tin chung về website*"
          title="Thông tin chung về website"
        ></textarea>
        <h4>Sản phẩm</h4>
        <div className="row">
          {rows.map((row, index) => (
            <div className="col-12" key={index}>
              <div className="row">
                <div className="col-5">
                  <input
                    className="form-control"
                    placeholder="Tên hiển thị"
                    value={row.displayName}
                    onChange={(e) =>
                      handleInputChange(index, "displayName", e.target.value)
                    }
                  />
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    placeholder="Nhập đường link"
                    value={row.link}
                    onChange={(e) =>
                      handleInputChange(index, "link", e.target.value)
                    }
                  />
                </div>
                <div className="col-2 d-flex align-items-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveRow(index)}
                  >
                    <span>&times;</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn btn-success mt-3"
          onClick={addRow}
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <span>+</span> Thêm dòng
        </button>
      </div>
    </div>
  );
};

export default Web;
