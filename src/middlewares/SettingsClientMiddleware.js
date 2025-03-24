import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserClientEditBirthday,
  UserClientEditFullName,
  UserClientEditInfo,
  UserClientEditSchool,
  UserClientEditTinh,
  UserClientEditUsername,
  UserClientRead,
} from "../services/SettingsClientServer";
import { useSelector } from "react-redux";
import socket from "../components/Service/socket";
import { toast } from "react-toastify";

const SettingsClientMiddleware = () => {
  const navigate = useNavigate();
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
      }
    };

    socket.on("changeBirthday", (data) => {
      setBirthday(data.birthday);
    });

    getUser();

    return () => {
      socket.off("changeBirthday");
    };
  }, [id]);

  const [show, setShow] = useState();

  // fullName
  const handleShowFullName = () => setShow("fullName");
  const handleFullName = async () => {
    if (!fullName) {
      toast.error("Không được bỏ trống!");
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
      toast.error("Không được bỏ trống!");
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
    }

    const data = await UserClientEditSchool(id, avatar);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow("");
    } else {
      toast.error(data.EM);
    }
  };

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
    handleBackOver,
  };
};

export default SettingsClientMiddleware;
