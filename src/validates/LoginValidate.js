import { toast } from "react-toastify";

export const LoginValidate = (username, password) => {
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

  return true;
};
