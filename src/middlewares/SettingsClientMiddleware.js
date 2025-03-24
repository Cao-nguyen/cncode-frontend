import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserClientEditFullName,
  UserClientEditUsername,
  UserClientRead,
} from "../services/SettingsClientServer";
import { useSelector } from "react-redux";
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

    getUser();
  }, [id]);

  const [show, setShow] = useState();

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
    setBirthday,
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
    handleBackOver,
  };
};

export default SettingsClientMiddleware;
