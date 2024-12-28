import { useState } from "react"
import { RegisterValidate } from "../validates/RegisterValidate";
import { toast } from "react-toastify";
import { checkCode } from "../services/clientServer";

const RegisterMiddleware = () => {
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

    // Gửi mã xác thực
    const handleSendCode = async () => {
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

        let data = await checkCode(email)
        if (data.EC === 0) {
            toast.success(data.EM)
        } else {
            toast.error(data.EM)
        }
    };

    // Xử lí đăng ký
    const handleRegister = () => {
        let check = RegisterValidate(fullName, email, username, password, confirmPassword, code)
        if (check) {
            toast.success('Thành công')
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