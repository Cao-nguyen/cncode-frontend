import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginValidate } from '../validates/LoginValidate'
import { LoginUser } from '../services/clientServer'
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Login } from '../rudex/Actions/userAction'

const HandleLogin = () => {
    // Thư viện
    const nagivate = useNavigate()
    const dispatch = useDispatch()

    // Ẩn hiện mật khẩu
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Quản lí state
    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const LoginMiddleware = async () => {
        let check = LoginValidate(fullName, username, password)

        if (check === true) {
            let data = await LoginUser(fullName, username, password)
            if (data.EC === 0) {
                dispatch(Login(data))
                nagivate('/')
                toast.success(data.EM)
            } else {
                toast.error(data.EM)
            }
        }
    }

    return {
        fullName,
        username,
        password,
        setFullName,
        setUsername,
        setPassword,
        showPassword,
        setShowPassword,
        togglePasswordVisibility,
        LoginMiddleware
    }
}

export default HandleLogin