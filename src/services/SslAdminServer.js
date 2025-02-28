import axios from "axios";

// [GET] Lấy sll
export const SslAdminRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/ssl/read`
  );
  return response.data;
};

// [PATCH] Chỉnh sửa
export const SslAdminEdit = async (content) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/ssl/edit`,
    {
      content,
    }
  );
  return response.data;
};
