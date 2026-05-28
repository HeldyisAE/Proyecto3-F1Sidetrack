import {
    FaXTwitter,
    FaInstagram,
    FaFacebook,
    FaTiktok,
    FaYoutube
} from "react-icons/fa6";

import { SiF1 } from "react-icons/si";

import '../styles/Footer.css';

function Footer() {

    return (

        <footer className="footer">

            <div className="footer-left">

                <div className="footer-links">

                    <span>Contact</span>
                    <span>Partners</span>
                    <span>Terms</span>
                    <span>Privacy</span>

                </div>

            </div>

            <div className="footer-center">

                <div className="social-media">

                    <FaXTwitter className="social-icon"/>

                    <FaInstagram className="social-icon"/>

                    <FaFacebook className="social-icon"/>

                    <FaTiktok className="social-icon"/>

                    <FaYoutube className="social-icon"/>

                </div>

            </div>

            <div className="footer-right">

                <div className="footer-meta">

                    <span>F1: Sidetrack</span>

                    <span>v0.1.0</span>

                </div>

            </div>

        </footer>
    );
}

export default Footer;