import { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("Adsbygoogle error:", e);
    }
  }, []);

  return (
    <>
      {/* Tải script Google AdSense */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5575086789438757"
        crossOrigin="anonymous"
      ></script>

      {/* Hiển thị quảng cáo */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5575086789438757"
        data-ad-slot="8838378159"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default GoogleAd;
