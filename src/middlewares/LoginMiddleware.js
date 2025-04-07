import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginValidate } from "../validates/LoginValidate";
import {
  checkCode,
  forgotCheck,
  LoginUser,
  registerUser,
} from "../services/LoginClientServer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Login } from "../rudex/Actions/userAction";
import { RegisterValidate } from "../validates/RegisterValidate";
import { ForgotValidate } from "../validates/ForgotValidate";

const HandleLogin = (toggleRegister) => {
  // Thư viện
  const nagivate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState("login");

  // Ẩn hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [countdown, setCountdown] = useState(0);

  // Quản lí state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [whereNow, setWhereNow] = useState("");
  const [tinh, setTinh] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState();

  // Check email
  const checkedEmail = (email) => {
    if (!email) {
      toast.error("Vui lòng nhập email");
      return false;
    }

    let reg = /\S+@\S+\.\S+/;
    if (!reg.test(email)) {
      toast.error("Email bạn nhập không đúng định dạng");
      return false;
    }

    return true;
  };

  // Gửi mã xác thực
  const handleSendCode = async () => {
    let checked = checkedEmail(email);

    if (checked === true) {
      setCountdown(30);
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      let data = await checkCode(email);

      if (data.EC === 0) {
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    }
  };

  // Xử lí đăng ký
  const handleRegister = async () => {
    setIsLoading(true);
    let checked = RegisterValidate(
      fullName,
      email,
      username,
      password,
      code,
      whereNow,
      tinh,
      check
    );
    if (checked === true) {
      let data = await registerUser(
        fullName,
        email,
        username,
        password,
        code,
        whereNow,
        tinh
      );
      if (data.EC === 0) {
        dispatch(Login(data));
        toast.success(data.EM);
        toggleRegister();
        nagivate("/");
      } else {
        toast.error(data.EM);
      }
    }
    setIsLoading(false);
  };

  // Xử lí đăng nhập
  const LoginMiddleware = async () => {
    setIsLoading(true);
    let check = LoginValidate(username, password);

    if (check === true) {
      let data = await LoginUser(username, password);
      if (data.EC === 0) {
        dispatch(Login(data));
        nagivate("/");
        toast.success(data.EM);
        toggleRegister();
      } else {
        toast.error(data.EM);
      }
    }
    setIsLoading(false);
  };

  // Quên mật khẩu
  const handleForgot = async () => {
    setIsLoading(true);
    let check = ForgotValidate(email, code, password);
    if (check === true) {
      let data = await forgotCheck(email, code, password);
      if (data.EC === 0) {
        toast.success(data.EM);
        setShow("login");
      } else {
        toast.error(data.EM);
      }
    }
    setIsLoading(false);
  };

  return {
    fullName,
    email,
    whereNow,
    username,
    password,
    code,
    countdown,
    tinh,
    setTinh,
    setFullName,
    setEmail,
    setWhereNow,
    setCode,
    setUsername,
    setPassword,
    showPassword,
    setShowPassword,
    togglePasswordVisibility,
    LoginMiddleware,
    handleRegister,
    handleSendCode,
    isLoading,
    show,
    setShow,
    check,
    setCheck,
    handleForgot,
  };
};

export default HandleLogin;
