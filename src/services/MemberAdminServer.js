import axios from "axios";

// [GET] Điều khoản sử dụng
export const MemberAdminRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/member/read`
  );
  return response.data;
};

// [PATCH] Điều khoản sử dụng
export const MemberAdminEdit = async (content) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/member/edit`,
    {
      content,
    }
  );
  return response.data;
};
