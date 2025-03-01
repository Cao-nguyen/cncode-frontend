import axios from "axios";

// [GET] Điều khoản sử dụng
export const UseAdminRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/use/read`
  );
  return response.data;
};

// [PATCH] Điều khoản sử dụng
export const UseAdminEdit = async (content) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/use/edit`,
    {
      content,
    }
  );
  return response.data;
};
