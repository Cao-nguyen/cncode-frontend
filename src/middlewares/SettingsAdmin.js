import { useState, useCallback } from "react";
import { InforApi, getInforApi } from "../services/adminServer";
import { toast } from "react-toastify";

const SettingsAdmin = () => {
    const [Infor, setInfor] = useState("");

    const saveInfor = async () => {
        if (!Infor) {
            toast.error("Thông tin không được để trống.");
            return;
        }
        try {
            let data = await InforApi(Infor);
            if (data.EC === 0) {
                toast.success(data.EM);
            } else {
                toast.error(data.EM || "Không thể lưu thông tin");
            }
        } catch (error) {
            console.error("Error while saving information: ", error);
            toast.error("Có lỗi xảy ra khi lưu thông tin.");
        }
    };


    const getInfor = useCallback(async () => {
        try {
            let data = await getInforApi();
            if (data.EC === 0 && data.DT) {
                setInfor(data.DT);
            } else {
                toast.error("Không thể tải dữ liệu");
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra!");
        }
    }, []);

    return {
        Infor,
        setInfor,
        saveInfor,
        getInfor,
    };
};

export default SettingsAdmin;
