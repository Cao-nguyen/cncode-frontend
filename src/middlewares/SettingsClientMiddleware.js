import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserClientEditAvatar,
  UserClientEditBirthday,
  UserClientEditFacebook,
  UserClientEditFullName,
  UserClientEditGit,
  UserClientEditInfo,
  UserClientEditPassword,
  UserClientEditSchool,
  UserClientEditTiktok,
  UserClientEditTinh,
  UserClientEditUsername,
  UserClientEditWeb,
  UserClientEditYoutube,
  UserClientEditZalo,
  UserClientRead,
} from "../services/SettingsClientServer";
import { useSelector } from "react-redux";
import socket from "../components/Service/socket";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment/moment";
import "moment/locale/vi";

const SettingsClientMiddleware = () => {
  const navigate = useNavigate();
  moment.locale("vi");

  const [active, setActive] = useState("top");

  const id = useSelector((state) => state.user.account.id);

  const handleBack = () => navigate(-1);
  const handleTop = () => setActive("top");
  const handleBot = () => setActive("bot");

  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [info, setInfo] = useState();
  const [birthday, setBirthday] = useState();
  const [tinh, setTinh] = useState();
  const [school, setSchool] = useState();
  const [avatar, setAvatar] = useState();
  const [web, setWeb] = useState();
  const [git, setGit] = useState();
  const [zalo, setZalo] = useState();
  const [facebook, setFacebook] = useState();
  const [tiktok, setTiktok] = useState();
  const [youtube, setYoutube] = useState();

  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const [createdAt, setCreatedAt] = useState();

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const updatedAt = new Date();
  const newCreatedAt = new Date(createdAt);
  const timeShow = updatedAt - newCreatedAt;
  const oneDay = 24 * 60 * 60 * 1000;

  const passwordDate =
    timeShow > oneDay
      ? moment(createdAt).format("DD / MM / YYYY")
      : moment(createdAt).from(updatedAt);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const getUser = async () => {
      const data = await UserClientRead(id);

      if (data && data.EC === 0) {
        setFullName(data?.DT?.fullName);
        setUsername(data?.DT?.username);
        setInfo(data?.DT?.info);
        setBirthday(data?.DT?.birthday);
        setTinh(data?.DT?.tinh);
        setSchool(data?.DT?.school);
        setAvatar(data?.DT?.avatar);
        setWeb(data?.DT?.mxh?.find((item) => item.name === "web")?.link);
        setGit(data?.DT?.mxh?.find((item) => item.name === "git")?.link);
        setZalo(data?.DT?.mxh?.find((item) => item.name === "zalo")?.link);
        setFacebook(
          data?.DT?.mxh?.find((item) => item.name === "facebook")?.link
        );
        setTiktok(data?.DT?.mxh?.find((item) => item.name === "tiktok")?.link);
        setYoutube(
          data?.DT?.mxh?.find((item) => item.name === "youtube")?.link
        );
        setCreatedAt(data?.DT?.createdAt);
      }
    };

    socket.on("changeBirthday", (data) => {
      setBirthday(data.birthday);
    });

    socket.on("changeZalo", (data) => {
      setZalo(data?.mxh?.find((item) => item.name === "zalo")?.link);
    });

    getUser();

    return () => {
      socket.off("changeBirthday");
      socket.off("changeZalo");
    };
  }, [id]);

  // Xử lí ảnh
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.REACT_APP_CLOUD_PRESET;

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "uploads/avatar");

    try {
      if (avatar) {
        const getPublicIdFromUrl = (imageUrl) => {
          try {
            const urlParts = imageUrl.split("/");
            const urlImage = `${urlParts[7]}/${urlParts[8]}/${urlParts[9]}`;
            const idMain = urlImage.split(".");

            return idMain[0];
          } catch (error) {
            console.error("Lỗi khi lấy Public ID:", error);
            return null;
          }
        };

        const publicId = getPublicIdFromUrl(avatar);
        toast.success("Đang tải ảnh, vui lòng đợi...");

        const deleteResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND}/api/v1/client/deletedImg`,
          { publicId }
        );

        if (deleteResponse.data.success) {
          toast.success("Hãy kiên nhẫn, sắp xong rồi!");
        } else {
          console.log("Ảnh không tồn tại hoặc không thể xoá!");
        }
      }

      // Upload ảnh mới
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      if (response.data.secure_url) {
        setAvatar(response.data.secure_url);
        toast.success("Tải ảnh lên thành công!");
      }
    } catch (error) {
      toast.error("Lỗi khi xử lý ảnh!");
      console.error("Lỗi upload ảnh:", error);
    }
  };

  const [show, setShow] = useState();

  // fullName
  const handleShowFullName = () => setShow("fullName");
  const handleFullName = async () => {
    if (!fullName) {
      toast.error("Vui lòng nhập họ và tên");
      return false;
    }

    let fullNameRegex = /^[a-zA-ZÀ-Ỹà-ỹ\s]+$/u;
    if (!fullNameRegex.test(fullName) || !fullName.includes(" ")) {
      toast.error(
        "Họ và tên không được chứa ký tự đặc biệt và phải có khoảng trắng"
      );
      return false;
    }

    const data = await UserClientEditFullName(id, fullName);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  // Username
  const handleShowUsername = () => setShow("username");
  const handleUsername = async () => {
    if (!username) {
      toast.error("Vui lòng nhập tên người dùng");
      return false;
    }

    let usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (
      username.startsWith("/") ||
      !usernameRegex.test(username) ||
      /\s/.test(username) ||
      /[À-ỹà-ỹ]/.test(username)
    ) {
      toast.error(
        "Tên người dùng không hợp lệ: không được bắt đầu bằng '/', không chứa ký tự đặc biệt, khoảng trắng hoặc dấu tiếng Việt"
      );
      return false;
    }

    const data = await UserClientEditUsername(id, username);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  // Giới thiệu
  const handleShowInfo = () => setShow("info");
  const handleInfo = async () => {
    if (!info) {
      toast.error("Không được bỏ trống!");
      return;
    }

    const data = await UserClientEditInfo(id, info);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  // birthday
  const handleShowBirthday = () => setShow("birthday");
  const handleBirthday = async () => {
    if (!day || !month || !year) {
      toast.error("Không được bỏ trống!");
      return;
    }

    const data = await UserClientEditBirthday(id, day, month, year);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  // tinh
  const handleShowTinh = () => setShow("tinh");
  const handleTinh = async () => {
    if (!tinh) {
      toast.error("Không được bỏ trống!");
      return;
    }

    const data = await UserClientEditTinh(id, tinh);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  // school
  const handleShowSchool = () => setShow("school");
  const handleSchool = async () => {
    if (!school) {
      toast.error("Không được bỏ trống!");
      return;
    }

    const data = await UserClientEditSchool(id, school);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  // avatar
  const handleShowAvatar = () => setShow("avatar");
  const handleAvatar = async () => {
    if (!avatar) {
      toast.error("Không được bỏ trống!");
      return;
    }

    const data = await UserClientEditAvatar(id, avatar);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  // web
  const handleShowWeb = () => setShow("web");
  const handleWeb = async () => {
    const data = await UserClientEditWeb(id, web);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  // git
  const handleShowGit = () => setShow("git");
  const handleGit = async () => {
    const data = await UserClientEditGit(id, git);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  // zalo
  const handleShowZalo = () => setShow("zalo");
  const handleZalo = async () => {
    const data = await UserClientEditZalo(id, zalo);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  // facebook
  const handleShowFacebook = () => setShow("facebook");
  const handleFacebook = async () => {
    const data = await UserClientEditFacebook(id, facebook);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  // tiktok
  const handleShowTiktok = () => setShow("tiktok");
  const handleTiktok = async () => {
    const data = await UserClientEditTiktok(id, tiktok);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  // youtube
  const handleShowYoutube = () => setShow("youtube");
  const handleYoutube = async () => {
    const data = await UserClientEditYoutube(id, youtube);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

  const handleShowNewPassword = () => setShow("newPassword");
  const handlePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không chính xác");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\W)[^\s]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Mật khẩu phải có ít nhất 8 ký tự, không chứa khoảng trắng, có ít nhất 1 chữ in hoa và 1 ký tự đặc biệt."
      );
      return;
    }

    const data = await UserClientEditPassword(id, oldPassword, newPassword);
    if (data && data.EC === 0) {
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
  };

  const handleShowResetPassword = () => setShow("resetPassword");

  const handleBackOver = () => {
    setShow("");
  };

  return {
    active,
    handleBack,
    handleTop,
    handleBot,
    fullName,
    setFullName,
    username,
    setUsername,
    info,
    setInfo,
    birthday,
    day,
    setDay,
    month,
    setMonth,
    year,
    setYear,
    tinh,
    setTinh,
    school,
    setSchool,
    avatar,
    setAvatar,
    web,
    setWeb,
    git,
    setGit,
    zalo,
    setZalo,
    facebook,
    setFacebook,
    tiktok,
    setTiktok,
    youtube,
    setYoutube,
    show,
    handleShowFullName,
    handleFullName,
    handleShowUsername,
    handleUsername,
    handleShowInfo,
    handleInfo,
    handleShowBirthday,
    handleBirthday,
    handleShowTinh,
    handleTinh,
    handleShowSchool,
    handleSchool,
    handleShowAvatar,
    handleAvatar,
    handleShowWeb,
    handleWeb,
    handleShowGit,
    handleGit,
    handleShowZalo,
    handleZalo,
    handleShowFacebook,
    handleFacebook,
    handleShowTiktok,
    handleTiktok,
    handleShowYoutube,
    handleYoutube,
    handleBackOver,
    handleImageUpload,
    passwordDate,
    handleShowNewPassword,
    handlePassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    oldPassword,
    setOldPassword,
    showPassword,
    handleShowPassword,
    handleShowResetPassword,
  };
};

export default SettingsClientMiddleware;
