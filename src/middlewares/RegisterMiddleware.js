import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterValidate } from "../validates/RegisterValidate"
import { ForgotValidate } from "../validates/ForgotValidate"
import { toast } from "react-toastify";
import { checkCode, registerUser, forgotCheck } from "../services/clientServer";
import { Login } from "../rudex/Actions/userAction"

const RegisterMiddleware = (toggleRegister, toggleForgot) => {
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
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true)
        let check = RegisterValidate(fullName, email, username, password, confirmPassword, code)
        if (check === true) {
            let data = await registerUser(fullName, email, username, password, code)
            if (data.EC === 0) {
                dispatch(Login(data))
                toast.success(data.EM);
                toggleRegister()
                navigate("/")
            } else {
                toast.error(data.EM);
            }
        }
        setIsLoading(false)
    }

    // Thay đổi mật khẩu
    const handleForgot = async () => {
        setIsLoading(true)
        let check = ForgotValidate(email, code, password, confirmPassword)
        if (check === true) {
            let data = await forgotCheck(email, code, password)
            if (data.EC === 0) {
                toast.success(data.EM);
                toggleForgot()
            } else {
                toast.error(data.EM);
            }
        }
        setIsLoading(false)
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
        handleForgot,
        handleSendCode,
        isLoading
    }
}

export default RegisterMiddleware