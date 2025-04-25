import { toast } from "react-toastify";

export const RegisterValidate = (
  fullName,
  email,
  username,
  password,
  code,
  whereNow,
  tinh,
  check
) => {
  if (!fullName) {
    toast.error("Vui lòng nhập họ và tên");
    return false;
  }

  let fullNameRegex = /^[a-zA-ZÀ-Ỹà-ỹ\s]+$/u;
  if (!fullNameRegex.test(fullName) || !fullName.includes(" ")) {
    toast.error(
      "Họ và tên không được chứa ký tự đặc biệt và phải có khoảng trắng"
    );
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

  let usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (
    username.startsWith("/") ||
    !usernameRegex.test(username) ||
    /\s/.test(username) ||
    /[À-ỹà-ỹ]/.test(username)
  ) {
    toast.error(
      "Tên người dùng không hợp lệ: không được bắt đầu bằng '/', không chứa ký tự đặc biệt, khoảng trắng hoặc dấu tiếng Việt"
    );
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

  if (!code) {
    toast.error("Mã xác thực không được bỏ trống");
    return false;
  }

  if (!whereNow) {
    toast.error("Vui lòng cho chúng tôi biết bạn biết chúng tôi qua đâu?");
    return false;
  }

  if (!tinh) {
    toast.error("Vui lòng nhập tỉnh bạn đang ở");
    return;
  }

  if (!check) {
    toast.error("Bạn vui lòng đồng ý với điều khoản sử dụng");
    return;
  }

  return true;
};
