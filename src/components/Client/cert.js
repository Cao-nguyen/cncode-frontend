import React, { useState } from "react";
import * as htmlToImage from "html-to-image";
import { QRCodeCanvas } from "qrcode.react";
import cert from "../../assets/toPng.png";
import '@fontsource/imperial-script';
import '@fontsource/markazi-text';

const CertificateGenerator = () => {
    const [studentName, setStudentName] = useState("");
    const [className, setClassName] = useState("");
    const [school, setSchool] = useState("");
    const [event, setEvent] = useState("");
    const [showCertificate, setShowCertificate] = useState(false);

    const generateImage = () => {
        const certificate = document.getElementById("certificate");
        htmlToImage.toPng(certificate)
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "chung-nhan.png";
                link.click();
            })
            .catch((error) => {
                console.error("Lỗi xuất ảnh:", error);
            });
    };

    return (
        <div className="container text-center">
            {/* Form nhập dữ liệu */}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h3 className="mb-3">Nhập thông tin</h3>
                    <input className="form-control mb-2" type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Tên học sinh" />
                    <input className="form-control mb-2" type="text" value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Lớp" />
                    <input className="form-control mb-2" type="text" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Trường" />
                    <input className="form-control mb-3" type="text" value={event} onChange={(e) => setEvent(e.target.value)} placeholder="Sự kiện" />

                    {/* Nút hiện chứng nhận */}
                    <button className="btn btn-primary w-100" onClick={() => setShowCertificate(true)}>Nhận chứng nhận</button>
                </div>
            </div>

            {/* Khu vực chứng nhận */}
            {showCertificate && (
                <div className="mt-4">
                    <div id="certificate" className="position-relative border rounded shadow" style={{ width: "800px", height: "600px", margin: "0 auto" }}>
                        {/* Ảnh nền giấy chứng nhận */}
                        <img src={cert} alt="Chứng nhận" className="img-fluid" style={{ width: "100%", height: "100%" }} />

                        {/* Nội dung chứng nhận */}
                        <div>
                            <p className="position-absolute text-center w-100"
                                style={{
                                    fontFamily: "'Imperial Script', cursive",
                                    top: "225px", left: "50%", transform: "translateX(-50%)",
                                    fontSize: "30px", fontWeight: "bold", color: "#000"
                                }}>Học viên: {studentName}</p>
                            <p className="position-absolute text-center w-100"
                                style={{
                                    fontFamily: "'Markazi Text', serif",
                                    top: "270px", left: "50%", transform: "translateX(-50%)",
                                    fontSize: "25px", fontWeight: "bold", color: "#007bff"
                                }}>Lớp: {className} - Trường: {school}
                            </p>
                            <p className="position-absolute text-center w-100"
                                style={{
                                    fontFamily: "'Markazi Text', serif",
                                    top: "300px", left: "50%", transform: "translateX(-50%)",
                                    fontSize: "25px", fontWeight: "bold", color: "#007bff"
                                }}>Hoàn thành {event}
                            </p>
                        </div>

                        {/* QR Code */}
                        <div className="position-absolute" style={{ bottom: "90px", left: "110px" }}>
                            <QRCodeCanvas value={`${studentName} - ${event}`} size={90} />
                        </div>

                        {/* Chữ ký & Ngày tháng */}
                        <div>
                            <p className="position-absolute w-100"
                                style={{
                                    fontFamily: "'Markazi Text', serif",
                                    bottom: "220px", left: "150px",
                                    fontSize: "20px", fontWeight: "bold", color: "#007bff"
                                }}>Vĩnh Long, ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>

                    {/* Nút Xuất PNG */}
                    <button className="btn btn-success mt-3" onClick={generateImage}>Xuất PNG</button>
                </div>
            )}
        </div>
    );
};

export default CertificateGenerator;
