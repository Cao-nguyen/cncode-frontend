import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterValidate } from "../validates/RegisterValidate"
import { toast } from "react-toastify";
import { checkCode, registerUser } from "../services/clientServer";
import { Login } from "../rudex/Actions/userAction"

const RegisterMiddleware = () => {
    // Thư viện
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Ẩn/ hiện mật khẩu & Đếm ngược thời gian
    const [showPassword, setShowPassword] = useState(false);
    const [countdown, setCountdown] = useState(0);

    // Quản lí Sate
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [code, setCode] = useState("")

    // Ẩn hiện mật khẩu
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Check email
    const check = (email) => {
        if (!email) {
            toast.error('Vui lòng nhập email');
            return false;
        }

        let reg = /\S+@\S+\.\S+/;
        if (!reg.test(email)) {
            toast.error('Email bạn nhập không đúng định dạng');
            return false;
        }

        return true
    }

    // Gửi mã xác thực
    const handleSendCode = async () => {
        let checked = check(email)

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
        let check = RegisterValidate(fullName, email, username, password, confirmPassword, code)
        if (check === true) {
            let data = await registerUser(fullName, email, username, password, code)
            if (data.EC === 0) {
                dispatch(Login(data))
                toast.success(data.EM);
                navigate("/")
            } else {
                toast.error(data.EM);
            }
        }
    }


    return {
        showPassword,
        countdown,
        fullName,
        email,
        username,
        password,
        confirmPassword,
        code,
        setShowPassword,
        togglePasswordVisibility,
        setFullName,
        setEmail,
        setUsername,
        setPassword,
        setConfirmPassword,
        setCode,
        handleRegister,
        handleSendCode
    }
}

export default RegisterMiddleware