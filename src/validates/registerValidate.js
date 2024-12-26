import { toast } from 'react-toastify';

export const registerValidate = (fullName, email, username, password, code) => {
    if (!fullName) {
        toast.warning('Vui lòng nhập họ và tên');
        return false;
    }

    if (!email) {
        toast.warning('Vui lòng nhập email');
        return false;
    }

    let reg = /\S+@\S+\.\S+/;
    if (!reg.test(email)) {
        toast.warning('Email bạn nhập không đúng định dạng');
        return false;
    }

    if (!username) {
        toast.warning('Vui lòng nhập tên người dùng');
        return false;
    }

    if (/\s/.test(username)) {
        toast.warning('Tên người dùng không được chứa khoảng trắng');
        return false;
    }

    if (!password) {
        toast.warning('Vui lòng nhập mật khẩu');
        return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        toast.warning('Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt');
        return false;
    }

    if (!code) {
        toast.warning('Mã xác thực không được bỏ trống');
        return false;
    }

    return true;
};