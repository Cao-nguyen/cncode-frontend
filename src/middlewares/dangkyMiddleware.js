import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { registerUser } from '../services/clientServer';
import { useDispatch } from 'react-redux'
import { Login } from '../rudex/Actions/userAction';
import { codeMail } from '../services/clientServer';

function useDangkyMiddleware() {
    // Khai báo State
    const [selectedOption, setSelectedOption] = useState('');
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('')
    const [showPassword, setShowPassword] = useState(false);

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
                let data = response.data;

                if (+data.EC === 0) {
                    dispatch(Login(data));
                    toast.success(data.EM);
                    navigate('/xacthuc');
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

    // Trả về các phương thức và state
    return {
        selectedOption,
        fullName,
        email,
        username,
        password,
        code,
        showPassword,
        handleShow,
        handleSelectChange,
        handleSubmit,
        handlePush,
        setFullname,
        setEmail,
        setUsername,
        setPassword,
        setCode,
    };
}

export default useDangkyMiddleware;
