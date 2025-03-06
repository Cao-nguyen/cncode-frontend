import axios from "axios";

// [GET] Thông tin website
export const WebAdminRead = async () => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/web/read`
  );
  return response.data;
};

// [POST] Thông tin website
export const WebAdminCreate = async (products, quickLinks, info) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/web/edit`,
    {
      products,
      quickLinks,
      info,
    }
  );
  return response.data;
};
