import axios from "axios";

// [POST] Mã xác thực
export const checkCode = async (email) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/xacthuc`,
    { email }
  );
  return response.data;
};

// [PATCH] Đổi mật khẩu
export const forgotCheck = async (email, code, password) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/forgot`,
    { email, code, password }
  );
  return response.data;
};

// [POST] Đăng ký
export const registerUser = async (
  fullName,
  email,
  username,
  password,
  code,
  whereNow
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/dangky`,
    {
      fullName,
      email,
      username,
      password,
      code,
      whereNow,
    }
  );
  return response.data;
};

// [POST] Đăng nhập
export const LoginUser = async (username, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/dangnhap`,
    {
      username,
      password,
    }
  );
  return response.data;
};
