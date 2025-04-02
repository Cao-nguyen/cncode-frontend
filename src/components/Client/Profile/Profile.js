import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import bg from "../../../assets/bg.png";
import logo from "../../../assets/logo.png";
import xu from "../../../assets/Khac/xu.png";
import chuoi from "../../../assets/Khac/streak.png";
import "./Profile.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  PostClientRead,
  ProfileClientRead,
} from "../../../services/ProfileClientServer";
import moment from "moment/moment";

function Profile() {
  const { username } = useParams();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [user, setUser] = useState();
  // const [course, setCourse] = useState();
  // const [follow, setFollow] = useState([]);
  // const [huyhieu, setHuyhieu] = useState();
  // const [item, setItem] = useState();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await ProfileClientRead(username);

      if (data && data.EC === 0) {
        setUser(data.DT.user);
        // setCourse(data.DT.courses);
        // setFollow(data.DT.follows.follow);
        // setHuyhieu(data.DT.huyhieu);
        // setItem(data.DT.items);
      }
    };

    getData();
  }, [username]);

  useEffect(() => {
    const getPost = async () => {
      const data = await PostClientRead(user?.username);

      if (data && data.EC === 0) {
        setNews(data.DT);
      }
    };

    getPost();
  }, [user]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | {username} </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>
    </>
  );
}

export default Profile;
