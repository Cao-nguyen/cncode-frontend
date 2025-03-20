import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { AccessRead } from "../../../services/AccessClientServer";
import socket from "../../Service/socket";

function Home(props) {
  const [totalAccess, setTotalAccess] = useState(0);
  const [online, setOnline] = useState(0);

  useEffect(() => {
    const data = async () => {
      const getData = await AccessRead();

      if (getData) {
        setTotalAccess(getData.DT.totalAccess);
        setOnline(getData.DT.online);
      }

      socket.on("updateData", (data) => {
        console.log(data);
        setOnline(data.online);
      });

      return () => {
        socket.off("updateData");
      };
    };

    data();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Trang chủ </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>

      <div className="container">
        <h1 className="text-center mt-5 text-primary">
          Số lượt truy cập website là: {totalAccess}
        </h1>
        <h1 className="text-center mt-5 text-primary">
          Hiện tại có người đang dùng website là: {online}
        </h1>
        <h1 className="text-center mt-5 text-primary">
          CNcode - Nền tảng học lập trình miễn phí
        </h1>
        <h3 className="text-center">Dự án được phát triển bởi Lý Cao Nguyên</h3>

        <h1 className="text-center mt-5 text-primary">
          CNcode - Nền tảng học lập trình miễn phí
        </h1>
        <h3 className="text-center">Dự án được phát triển bởi Lý Cao Nguyên</h3>

        <h1 className="text-center mt-5 text-primary">
          CNcode - Nền tảng học lập trình miễn phí
        </h1>
        <h3 className="text-center">Dự án được phát triển bởi Lý Cao Nguyên</h3>

        <h1 className="text-center mt-5 text-primary">
          CNcode - Nền tảng học lập trình miễn phí
        </h1>
        <h3 className="text-center">Dự án được phát triển bởi Lý Cao Nguyên</h3>

        <h1 className="text-center mt-5 text-primary">
          CNcode - Nền tảng học lập trình miễn phí
        </h1>
        <h3 className="text-center">Dự án được phát triển bởi Lý Cao Nguyên</h3>
        <h1 className="text-center mt-5 text-primary">
          CNcode - Nền tảng học lập trình miễn phí
        </h1>
        <h3 className="text-center">Dự án được phát triển bởi Lý Cao Nguyên</h3>
      </div>
    </>
  );
}

export default Home;
