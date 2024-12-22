import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { registerUser } from '../services/clientServer';
import { useDispatch } from 'react-redux'
import { Login } from '../rudex/Actions/userAction';
import { codeMail } from '../services/clientServer';
import { forgotPassword } from '../services/clientServer';
import { login } from '../services/clientServer';

function useDangkyMiddleware() {
    // Khai báo State
    const [selectedOption, setSelectedOption] = useState('');
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [isCountdown, setIsCountdown] = useState(false);
    const [countdown, setCountdown] = useState(120);

    // Chuyển trang
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // Ẩn - Hiện password
    const handleShow = () => {
        setShowPassword(!showPassword);
    };

    // Xử lý thay đổi lựa chọn trong select
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Validate
    const validate = () => {
        if (!fullName) {
            toast.error('Vui lòng nhập họ và tên');
            return false;
        }

        if (!email) {
            toast.error('Vui lòng nhập email');
            return false;
        }

        let reg = /\S+@\S+\.\S+/;
        if (!reg.test(email)) {
            toast.error('Email bạn nhập không đúng định dạng');
            return false;
        }

        if (!username) {
            toast.error('Vui lòng nhập tên người dùng');
            return false;
        }

        if (/\s/.test(username)) {
            toast.error('Tên người dùng không được chứa khoảng trắng');
            return false;
        }

        if (!password) {
            toast.error('Vui lòng nhập mật khẩu');
            return false;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt');
            return false;
        }

        return true;
    };

    // Xử lý gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
        let check = validate();
        if (!code) {
            toast.error('Mã xác thực không được bỏ trống');
            return false;
        }

        if (check === true) {
            try {
                let response = await registerUser(email, fullName, username, password, code);
                let data = response.data;

                if (+data.EC === 0) {
                    dispatch(Login(data));
                    toast.success(data.EM);
                    navigate('/');
                } else {
                    toast.error(data.EM);
                }
            } catch (error) {
                toast.error('Có lỗi xảy ra, vui lòng thử lại.');
            }
        }
    };

    const handlePush = async (e) => {
        e.preventDefault();
        try {
            startCountdown();
            let response = await codeMail(email);

            if (response.data.EC === 0) {
                toast.success(response.data.EM);
            } else {
                toast.error(response.data.EM || 'Có lỗi xảy ra');
            }
        } catch (error) {
            console.error(error);
            toast.error('Không thể gửi mã xác thực, vui lòng thử lại');
        }
    }

    const startCountdown = () => {
        setIsCountdown(true);
        setCountdown(30);

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsCountdown(false);
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleForgotPassword = async () => {
        let check = validate()

        if (check === true) {
            let response = await forgotPassword(fullName, username, email, password)
            let data = response.data;

            if (+data.EC === 0) {
                toast.success(data.EM);
                navigate('/dangnhap');
            } else {
                toast.error(data.EM);
            }
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!fullName && !username && !password) {
            toast.error('Vui lòng nhập đầy đủ thông tin để đăng nhập');
        }

        try {
            let response = await login(fullName, username, password);
            let data = response.data;

            if (+data.EC === 0) {
                toast.success(data.EM);
                navigate('/');
            } else {
                toast.error(data.EM);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại.');
        }
    }

    // Trả về các phương thức và state
    return {
        selectedOption,
        fullName,
        email,
        username,
        password,
        code,
        showPassword,
        isCountdown,
        countdown,
        handleShow,
        handleSelectChange,
        handleSubmit,
        handlePush,
        handleForgotPassword,
        handleLogin,
        setFullname,
        setEmail,
        setUsername,
        setPassword,
        setCode,
        setIsCountdown,
        setCountdown
    };
}

export default useDangkyMiddleware;
