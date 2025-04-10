import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import banner from "../../../assets/Khac/banner.png";
import xu from "../../../assets/Khac/xu.png";
import "./Shop.scss";
import {
  ShopClientCreate,
  ShopClientRead,
  ShopUserClientRead,
} from "../../../services/ShopClientServer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import socket from "../../Service/socket";

function Shop() {
  const id = useSelector((state) => state.user.account.id);
  const navigate = useNavigate();

  const [shop, setShop] = useState();
  const [user, setUser] = useState();

  const getData = async () => {
    const dataShop = await ShopClientRead();

    if (dataShop && dataShop.EC === 0) {
      setShop(dataShop.DT);
    }
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  useEffect(() => {
    getData();

    const getUser = async () => {
      const dataUser = await ShopUserClientRead(id);
      if (dataUser && dataUser.EC === 0) {
        setUser(dataUser.DT);
      }
    };

    getUser();

    socket.on("buyPush", () => {
      getUser();
      setShow(false);
    });

    return () => {
      socket.off("buyPush");
    };
  }, [id]);

  const [show, setShow] = useState(false);
  const [choose, setChoose] = useState();
  const [count, setCount] = useState();
  const [tong, setTong] = useState();

  const handlePay = (id) => {
    setShow(!show);
    setChoose(shop?.find((s) => s._id === id));
    setCount(0);
    setTong(0);
  };

  const handleSubmit = async () => {
    if (count === 0) {
      toast.error("Bạn phải đặt số lượng ít nhất là 1");
      return;
    }

    if (tong > user.coins) {
      toast.error("Bạn không đủ tiền để mua");
      return;
    } else {
      const data = await ShopClientCreate(
        choose._id,
        count,
        tong,
        user._id,
        user.coins
      );

      if (data && data.EC === 0) {
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Bách hoá vật phẩm </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>

      <div className="shop">
        <div
          className="btn-back"
          onClick={() => {
            navigate(-1);
          }}
        >
          Trở về
        </div>
        <header>
          <div className="p">{user?.coins}</div>
          <img src={xu} alt=""></img>
        </header>

        <div className="shop-banner">
          <img src={banner} alt=""></img>
        </div>

        <h3 className="product-text">SẢN PHẨM TRƯNG BÀY</h3>
        <div className="product">
          {shop?.map((item) => (
            <div className="product-item" key={item._id}>
              <img src={item.img} alt="" />
              <h3>{item.name}</h3>
              <div className="action">
                <div className="button">
                  <div className="p">{formatNumber(item.price)}</div>
                  <img src={xu} alt="" />
                </div>
                <div className="button" onClick={() => handlePay(item._id)}>
                  Mua ngay
                </div>
              </div>
            </div>
          ))}
        </div>
        {show === true && (
          <div className="overplay">
            <div className="pay">
              <i className="fa-solid fa-xmark" onClick={handlePay}></i>
              <h4>Mua vật phẩm</h4>
              <div className="info">
                <img src={choose.img} alt="" />
                <div className="info-item">
                  <h5>{choose.name}</h5>
                  <div className="p">
                    <div>{formatNumber(choose.price)}</div>
                    <div>
                      <img src={xu} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <input
                className="form-control"
                placeholder="Số lượng"
                type="number"
                value={count}
                onChange={(e) => {
                  const newCount = Number(e.target.value);
                  setCount(newCount);
                  setTong(newCount * choose.price);
                }}
              ></input>
              <input
                className="form-control mt-3"
                disabled
                value={formatNumber(tong)}
              ></input>
              <div className="btn btn-primary mt-3" onClick={handleSubmit}>
                Thanh toán
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Shop;
