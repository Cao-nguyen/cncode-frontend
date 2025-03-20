import { toast } from "react-toastify";

export const RegisterValidate = (
  fullName,
  email,
  username,
  password,
  confirmPassword,
  code,
  whereNow
) => {
  if (!fullName) {
    toast.error("Vui lòng nhập họ và tên");
    return false;
  }

  if (!email) {
    toast.error("Vui lòng nhập email");
    return false;
  }

  let reg = /\S+@\S+\.\S+/;
  if (!reg.test(email)) {
    toast.error("Email bạn nhập không đúng định dạng");
    return false;
  }

  if (!username) {
    toast.error("Vui lòng nhập tên người dùng");
    return false;
  }

  if (/\s/.test(username)) {
    toast.error("Tên người dùng không được chứa khoảng trắng");
    return false;
  }

  if (!password) {
    toast.error("Vui lòng nhập mật khẩu");
    return false;
  }

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    toast.error(
      "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
    );
    return false;
  }

  if (confirmPassword !== password) {
    toast.error("Mật khẩu xác nhận không chính xác");
    return false;
  }

  if (!code) {
    toast.error("Mã xác thực không được bỏ trống");
    return false;
  }

  if (!whereNow) {
    toast.error("Vui lòng cho chúng tôi biết bạn biết chúng tôi qua đâu?");
    return false;
  }

  return true;
};
