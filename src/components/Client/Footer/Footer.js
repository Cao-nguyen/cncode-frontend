import React from 'react';
import './Footer.scss'
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <footer className="mt-5">
            <div className="row">
                {/* Cột 1 */}
                <div className="about col-5">
                    <h4>Về CNcode</h4>
                    <div className="border mb-3"></div>
                    <div className="d-flex">
                        <img src={logo} alt=""></img>
                        <p>CNcode là một website chuyên cung cấp các bài giảng về lập trình với đa ngôn ngữ. Với những bài tập và sự kiện hấp dẫn trên website sẽ giúp học sinh có thể rèn luyện khả năng lập trình của bản thân. Học qua video nhưng có độ tương tác cao.</p>
                    </div>
                </div>

                {/* Cột 2 */}
                <div className="about col-2">
                    <h4>Sản phẩm</h4>
                    <div className="border mb-3"></div>
                    <Link className="links" to="/chinhphucnguvanedu.vercel.app">Chinh phục ngữ văn</Link>
                </div>

                {/* Cột 3 */}
                <div className="about col-2">
                    <h4>Liên kết</h4>
                    <div className="border mb-3"></div>
                    <Link className="links" to="/chinhphucnguvanedu.vercel.app">Bảo mật</Link>
                    <Link className="links" to="/chinhphucnguvanedu.vercel.app">Điều khoản</Link>
                    <Link className="links" to="/chinhphucnguvanedu.vercel.app">Thành viên</Link>
                </div>

                {/* Cột 4 */}
                <div className="about col-3">
                    <h4>Mạng xã hội</h4>
                    <div className="border mb-3"></div>
                    <div className="d-flex">
                        <p>- Leader: </p>
                        <a className="mx-2 links" href="https://zalo.me/0394217863" target="_blank" rel="noopener noreferrer">Lý Cao Nguyên</a>
                    </div>
                    <div className="d-flex">
                        <a className="mx-2 links" href="https://www.facebook.com/cncode.edu.vn">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a className="mx-2 links" href="https://www.facebook.com/cncode.edu.vn" target="_blank" rel="noopener noreferrer">Fanpage: CNcode</a>
                    </div>
                    <div className="d-flex">
                        <a className="mx-2 links" href="cao343451@gmail.com">
                            <i className="fa-solid fa-envelope"></i>
                        </a>
                        <a className="mx-2 links" href="cao343451@gmail.com" target="_blank" rel="noopener noreferrer">Email: CNcode</a>
                    </div>
                    <div className="d-flex">
                        <a className="mx-2 links" href="https://www.youtube.com/@cncode-edu">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                        <a className="mx-2 links" href="https://www.youtube.com/@cncode-edu" target="_blank" rel="noopener noreferrer">Youtube: CNcode</a>
                    </div>
                </div>
            </div>
        </footer >
    );
}

export default Footer;