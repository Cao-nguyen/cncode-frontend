import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { registerUser } from '../services/clientServer';

function useDangkyMiddleware() {
    // Khai báo State
    const [selectedOption, setSelectedOption] = useState('');
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Chuyển trang
    const navigate = useNavigate();

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

        if (!password) {
            toast.error('Vui lòng nhập mật khẩu');
            return false;
        }

        return true;
    };

    // Xử lý gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();

        let check = validate();
        if (check === true) {
            try {
                let response = await registerUser(email, fullName, username, password);
                let serverData = response.data;

                if (+serverData.EC === 0) {
                    toast.success(serverData.EM);
                    navigate('/');
                } else {
                    toast.error(serverData.EM);
                }
            } catch (error) {
                toast.error('Có lỗi xảy ra, vui lòng thử lại.');
            }
        }
    };

    // Trả về các phương thức và state
    return {
        selectedOption,
        fullName,
        email,
        username,
        password,
        showPassword,
        handleShow,
        handleSelectChange,
        handleSubmit,
        setFullname,
        setEmail,
        setUsername,
        setPassword,
    };
}

export default useDangkyMiddleware;
